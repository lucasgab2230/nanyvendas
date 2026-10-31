import { useCallback, useEffect, useState } from "react";
import { defaultFilters } from "../lib/catalog";
import type { CatalogFilters, PriceFilter, SortKey } from "../lib/catalog";

const prices: PriceFilter[] = ["todos", "ate50", "50a80", "acima80", "consultar"];
const sorts: SortKey[] = ["sugestoes", "menor", "maior", "nome"];

function readFilters(): CatalogFilters {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("categoria") ?? "todas",
    search: params.get("busca")?.slice(0, 120) ?? "",
    price: prices.find((price) => price === params.get("preco")) ?? "todos",
    sort: sorts.find((sort) => sort === params.get("ordem")) ?? "sugestoes",
  };
}

/** Filtros sobrevivem a recarregamentos, links compartilhados e voltar/avançar. */
export function useCatalogFilters() {
  const [filters, setFilters] = useState(readFilters);
  useEffect(() => {
    const onPopState = () => setFilters(readFilters());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const update = useCallback(
    (patch: Partial<CatalogFilters>) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      const url = new URL(window.location.href);
      const params = {
        categoria: next.category === "todas" ? "" : next.category,
        busca: next.search,
        preco: next.price === "todos" ? "" : next.price,
        ordem: next.sort === "sugestoes" ? "" : next.sort,
      };
      for (const [key, value] of Object.entries(params)) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      window.history.replaceState(window.history.state, "", url);
    },
    [filters],
  );

  return { filters, update, reset: () => update(defaultFilters) };
}
