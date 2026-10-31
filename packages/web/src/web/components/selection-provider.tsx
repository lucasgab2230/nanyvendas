import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../api/catalog/products";
import { useCatalog } from "../queries/catalog";
import { readSelection, SELECTION_STORAGE_KEY } from "../lib/selection";

interface SelectionContextValue {
  ids: number[];
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: (product: Pick<Product, "id">) => void;
  remove: (id: number) => void;
  notify: (message: string) => void;
  retry: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const catalog = useCatalog();
  const [ids, setIds] = useState<number[]>(() => {
    try {
      return readSelection(localStorage.getItem(SELECTION_STORAGE_KEY));
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageKey, setMessageKey] = useState(0);
  const notify = useCallback((text: string) => {
    setMessage(text);
    setMessageKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 4200);
    return () => window.clearTimeout(timer);
  }, [message, messageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* A seleção continua funcionando nesta visita em modo privado. */
    }
  }, [ids]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === SELECTION_STORAGE_KEY || event.key === null) {
        setIds(readSelection(event.newValue));
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (!catalog.data) return;
    const currentIds = new Set(catalog.data.products.map((product) => product.id));
    setIds((previous) =>
      previous.every((id) => currentIds.has(id))
        ? previous
        : previous.filter((id) => currentIds.has(id)),
    );
  }, [catalog.data]);

  // Somente IDs são salvos: fotos, nomes e preços vêm sempre do catálogo atual.
  const products = useMemo(() => {
    const current = catalog.data?.products ?? [];
    return ids.flatMap((id) => {
      const product = current.find((item) => item.id === id);
      return product ? [product] : [];
    });
  }, [catalog.data, ids]);

  const value: SelectionContextValue = {
    ids,
    products,
    isLoading: catalog.isPending,
    isError: catalog.isError,
    isOpen,
    setOpen,
    toggle: (product) => {
      const exists = ids.includes(product.id);
      setIds((previous) =>
        previous.includes(product.id)
          ? previous.filter((id) => id !== product.id)
          : [...previous, product.id],
      );
      notify(
        exists
          ? "Peça removida da sua seleção."
          : "Peça salva! Veja suas escolhas no coração do menu.",
      );
    },
    remove: (id) => {
      setIds((previous) => previous.filter((item) => item !== id));
      notify("Peça removida da sua seleção.");
    },
    notify,
    retry: () => {
      void catalog.refetch();
    },
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
      <output className="toast-region" aria-live="polite" aria-atomic="true">
        {message && (
          <div className="toast" key={messageKey}>
            {message}
          </div>
        )}
      </output>
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const value = useContext(SelectionContext);
  if (!value) throw new Error("useSelection precisa de SelectionProvider.");
  return value;
}
