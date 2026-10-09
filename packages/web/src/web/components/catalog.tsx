import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { Product } from "../../api/catalog/products";
import { useCatalog } from "../queries/catalog";
import { STORE } from "../lib/whatsapp";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

type SortKey = "destaques" | "menor" | "maior";

const sortLabels: Record<SortKey, string> = {
  destaques: "Destaques",
  menor: "Menor preço",
  maior: "Maior preço",
};

/** Vitrine: filtros por categoria, ordenação e o grid das peças. */
export function Catalog({ onOpenProduct }: { onOpenProduct: (product: Product) => void }) {
  const [category, setCategory] = useState("todas");
  const [sort, setSort] = useState<SortKey>("destaques");
  const catalog = useCatalog(category);

  const data = catalog.data;
  const products = catalog.data?.products ?? [];
  const categories = catalog.data?.categories ?? [];

  const sorted = useMemo(() => {
    const list = [...(data?.products ?? [])];
    if (sort === "menor") list.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
    if (sort === "maior") list.sort((a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY));
    if (sort === "destaques") list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [data, sort]);

  const activeCategory = categories.find((c) => c.slug === category);
  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name;

  return (
    <section id="catalogo" className="grain relative scroll-mt-24 border-y border-gold/12 bg-surface py-20 sm:py-28">
      <div className="shell relative">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Vitrine</p>
            <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">
              Escolha a sua peça,
              <br />
              <span className="gold-text italic">detalhes fiéis às fotos</span>
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-foreground">
              Clique na peça para ver os detalhes e pedir pelo WhatsApp. Nas fotos sem preço legível, consulte o valor diretamente com a {STORE.owner}.
            </p>
          </div>

          <label className="flex items-center gap-3 self-start sm:self-auto">
            <span className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Ordenar</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-gold/22 bg-background px-3 py-2 font-sans text-[12px] text-foreground/90 focus:border-gold/60 focus:outline-none"
            >
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </label>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCategory("todas")}
            className={`pill ${category === "todas" ? "pill-active" : ""}`}
          >
            Todas
          </button>
          {catalog.isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="h-9 w-24 animate-pulse border border-gold/10 bg-white/[0.03]" />
            ))}
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.slug)}
              className={`pill ${category === item.slug ? "pill-active" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-sans text-[12px] text-muted-foreground">
            {catalog.isLoading
              ? "Carregando a vitrine..."
              : `${products.length} ${products.length === 1 ? "peça" : "peças"}${
                  activeCategory ? ` em ${activeCategory.name}` : ""
                }`}
          </span>
          <span className="hairline flex-1" />
        </div>

        {catalog.isError && (
          <p className="mt-8 border border-destructive/40 bg-destructive/10 p-5 font-sans text-sm text-foreground/90">
            Não consegui carregar a vitrine agora. Recarregue a página ou fale direto com a Eliane pelo WhatsApp.
          </p>
        )}

        {catalog.isLoading && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-gold/10 bg-white/[0.02]">
                <div className="aspect-square animate-pulse bg-white/[0.03]" />
                <div className="flex flex-col gap-3 p-5">
                  <span className="h-3 w-20 animate-pulse bg-white/[0.05]" />
                  <span className="h-5 w-40 animate-pulse bg-white/[0.05]" />
                  <span className="h-4 w-32 animate-pulse bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!catalog.isLoading && !catalog.isError && sorted.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-4 border border-gold/15 bg-background/40 px-6 py-16 text-center">
            <SearchX className="size-7 text-gold" strokeWidth={1.4} />
            <p className="font-display text-3xl">Nada por aqui ainda</p>
            <p className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
              Essa categoria está sem peças nesta prévia. Veja a vitrine inteira ou pergunte para a Eliane — ela tem
              muito mais na loja.
            </p>
            <button type="button" onClick={() => setCategory("todas")} className="btn-gold">
              Ver todas as peças
            </button>
          </div>
        )}

        {!catalog.isLoading && sorted.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((product, index) => (
              <Reveal
                key={product.id}
                delay={Math.min(index, 5) * 70}
                className={product.featured ? "lg:col-span-2" : ""}
              >
                <ProductCard
                  product={product}
                  categoryName={categoryName(product.category)}
                  variant={product.featured ? "horizontal" : "vertical"}
                  onOpen={onOpenProduct}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
