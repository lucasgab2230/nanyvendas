import { useMemo } from "react";
import type { Product } from "../../api/catalog/products";
import { useCatalog } from "../queries/catalog";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

/**
 * Vitrine de Vestuário: grid de peças de roupa e acessórios.
 * Estrutura semelhante ao catálogo de semijoias, mas com paleta azul.
 */
export function VestuarioCatalog({ onOpenProduct }: { onOpenProduct: (product: Product) => void }) {
  const catalog = useCatalog("vestuario");
  const products = catalog.data?.products ?? [];
  const categories = catalog.data?.categories ?? [];

  const sorted = useMemo(() => {
    const list = [...products];
    list.sort((a, b) => a.price - b.price); // ordenação simples por menor preço
    return list;
  }, [products]);

  const activeCategory = categories.find((c) => c.slug === "vestuario");

  return (
    <section
      id="vestuario"
      className="grain relative scroll-mt-24 border-y border-sky-700/20 bg-sky-950 py-20 sm:py-28"
    >
      <div className="shell relative">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-sky-300">Coleção</p>
            <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl text-sky-100">
              Escolha seu estilo,
              <br />
              <span className="italic text-sky-400">o preço já está aqui</span>
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-sky-200">
              Todas as peças de vestuário estão disponíveis com a {STORE.owner} — clique para ver detalhes
              e pedir pelo WhatsApp. Fotos e preços são exemplos nesta prévia.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {catalog.isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-9 w-24 animate-pulse border border-sky-700/30 bg-sky-800/30"
              />
            ))}
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-sans text-[12px] text-sky-300">
            {catalog.isLoading
              ? "Carregando vestuário..."
              : `${products.length} ${products.length === 1 ? "peça" : "peças"}${
                  activeCategory ? ` em ${activeCategory.name}` : ""
                }`}
          </span>
          <span className="hairline flex-1" />
        </div>

        {catalog.isError && (
          <p className="mt-8 border border-red-400/40 bg-red-900/20 p-5 font-sans text-sm text-sky-100">
            Não consegui carregar o vestuário agora. Recarregue a página ou fale direto com a {STORE.owner} pelo WhatsApp.
          </p>
        )}

        {!catalog.isLoading && sorted.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-4 border border-sky-700/30 bg-sky-900/40 px-6 py-16 text-center">
            <p className="font-display text-3xl text-sky-200">Nada por aqui ainda</p>
            <p className="max-w-md font-sans text-sm leading-relaxed text-sky-300">
              Essa categoria está sem peças nesta prévia. Veja a vitrine inteira ou pergunte para a {STORE.owner}.
            </p>
          </div>
        )}

        {!catalog.isLoading && sorted.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 5) * 70}>
                <ProductCard
                  product={product}
                  categoryName="Vestuário"
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
