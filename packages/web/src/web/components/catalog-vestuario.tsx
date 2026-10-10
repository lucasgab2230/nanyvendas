import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { ClothingProduct } from "../../api/catalog/clothing-products";
import { useVestuario } from "../queries/vestuario";
import { STORE, whatsappLink } from "../lib/whatsapp";
import { SiWhatsapp } from "react-icons/si";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

type SortKey = "destaques" | "menor" | "maior";

const sortLabels: Record<SortKey, string> = {
  destaques: "Destaques",
  menor: "Menor preço",
  maior: "Maior preço",
};

export function CatalogVestuario({ onOpenProduct }: { onOpenProduct: (product: ClothingProduct) => void }) {
  const [category, setCategory] = useState("todas");
  const [sort, setSort] = useState<SortKey>("destaques");
  const catalog = useVestuario(category);

  const data = catalog.data as any;
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const catalogTotal = data?.catalogTotal ?? data?.total ?? 0;

  const sorted = useMemo(() => {
    const list = [...(data?.products ?? [])] as ClothingProduct[];
    if (sort === "menor") list.sort((a, b) => a.price - b.price);
    if (sort === "maior") list.sort((a, b) => b.price - a.price);
    if (sort === "destaques") list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [data, sort]);

  const activeCategory = categories.find((c: any) => c.slug === category);
  const categoryName = (slug: string) => categories.find((c: any) => c.slug === slug)?.name;

  if (!catalog.isLoading && !catalog.isError && catalogTotal === 0) {
    return null;
  }

  return (
    <section id="catalogo" className="grain relative scroll-mt-24 border-y border-gold/12 bg-surface py-20 sm:py-28">
      <div className="shell relative">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Vitrine de Vestuário</p>
            <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">
              Escolha a sua peça,
              <br />
              <span className="gold-text italic">conheça as peças</span>
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-foreground">
              Confira os detalhes e valores cadastrados para cada peça. A {STORE.owner} confirma disponibilidade e esclarece o que não estiver informado pelo WhatsApp.
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
          {categories.map((item: any) => (
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
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-destructive/40 bg-destructive/10 p-5 font-sans text-sm text-foreground/90">
            <p>Não consegui carregar a vitrine agora. Tente novamente ou consulte as opções com a {STORE.owner}.</p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold"><SiWhatsapp className="size-4" />Falar pelo WhatsApp</a>
          </div>
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
              Não há peças cadastradas nesta categoria. Volte à vitrine completa ou consulte a {STORE.owner} sobre as opções disponíveis.
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
                  product={product as any}
                  categoryName={categoryName(product.category)}
                  variant={product.featured ? "horizontal" : "vertical"}
                  onOpen={onOpenProduct as any}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
