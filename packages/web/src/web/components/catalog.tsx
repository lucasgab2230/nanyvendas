import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Heart,
  RotateCcw,
  Search,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import type { Product } from "../../api/catalog/products";
import { useCatalog } from "../queries/catalog";
import { filterProducts } from "../lib/catalog";
import type { PriceFilter, SortKey } from "../lib/catalog";
import { useCatalogFilters } from "../hooks/use-catalog-filters";
import { STORE, whatsappLink } from "../lib/whatsapp";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 12;
const EMPTY_PRODUCTS: Product[] = [];

export function Catalog({ onOpenProduct }: { onOpenProduct: (product: Product) => void }) {
  const catalog = useCatalog();
  const { filters, update, reset } = useCatalogFilters();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const products = catalog.data?.products ?? EMPTY_PRODUCTS;
  const categories = catalog.data?.categories ?? [];
  const sorted = useMemo(() => filterProducts(products, filters), [products, filters]);
  const availableCategories = categories.filter((category) =>
    products.some((product) => product.category === category.slug),
  );
  const hasFilters =
    filters.category !== "todas" || filters.search !== "" || filters.price !== "todos";
  const filter = (patch: Parameters<typeof update>[0]) => {
    update(patch);
    setVisibleCount(PAGE_SIZE);
  };
  const clear = () => {
    reset();
    setVisibleCount(PAGE_SIZE);
  };
  const currentCategory = categories.find((category) => category.slug === filters.category);
  const visible = sorted.slice(0, visibleCount);

  return (
    <section id="catalogo" className="catalog-section" aria-labelledby="catalog-title">
      <div className="shell">
        <div className="section-heading catalog-heading">
          <div>
            <p className="eyebrow">
              <Sparkles size={14} aria-hidden="true" /> ENCONTRE SUA PRÓXIMA FAVORITA
            </p>
            <h2 id="catalog-title">
              Pequenos detalhes, <em>grandes encantos.</em>
            </h2>
            <p>Para você, para presentear, para se sentir ainda mais você.</p>
          </div>
          <span className="catalog-heading-note">
            <Heart size={15} strokeWidth={1.5} aria-hidden="true" /> Gostou? Salve no coração.
          </span>
        </div>
        <div className="catalog-tools">
          <div className="search-field">
            <Search size={19} strokeWidth={1.6} aria-hidden="true" />
            <label htmlFor="catalog-search" className="sr-only">
              Buscar semijoias
            </label>
            <input
              id="catalog-search"
              aria-label="Buscar semijoias"
              type="search"
              placeholder="Busque por uma peça, cor ou detalhe…"
              value={filters.search}
              maxLength={120}
              onChange={(event) => filter({ search: event.target.value })}
            />
            {filters.search && (
              <button
                className="icon-button search-clear"
                type="button"
                onClick={() => {
                  filter({ search: "" });
                  document.getElementById("catalog-search")?.focus();
                }}
                aria-label="Limpar busca"
              >
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </div>
          <label className="select-field">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span className="sr-only">Filtrar por preço</span>
            <select
              value={filters.price}
              onChange={(event) => filter({ price: event.target.value as PriceFilter })}
            >
              <option value="todos">Todos os preços</option>
              <option value="ate50">Até R$ 50</option>
              <option value="50a80">De R$ 50,01 a R$ 80</option>
              <option value="acima80">Acima de R$ 80</option>
              <option value="consultar">Preço sob consulta</option>
            </select>
          </label>
        </div>
        <div className="catalog-filter-row">
          <fieldset className="category-filters">
            <legend className="sr-only">Filtrar por categoria</legend>
            <button
              type="button"
              className={`category-pill ${filters.category === "todas" ? "active" : ""}`}
              aria-pressed={filters.category === "todas"}
              onClick={() => filter({ category: "todas" })}
            >
              Todas as peças{catalog.data && <span>{products.length}</span>}
            </button>
            {availableCategories.map((category) => (
              <button
                type="button"
                key={category.slug}
                className={`category-pill ${filters.category === category.slug ? "active" : ""}`}
                aria-pressed={filters.category === category.slug}
                onClick={() => filter({ category: category.slug })}
              >
                {category.name}
              </button>
            ))}
          </fieldset>
          <label className="catalog-sort">
            <span className="sr-only">Ordenar peças</span>
            <select
              value={filters.sort}
              onChange={(event) => filter({ sort: event.target.value as SortKey })}
            >
              <option value="sugestoes">Sugestões da Nany</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
              <option value="nome">Nome: A–Z</option>
            </select>
          </label>
        </div>
        <div className="catalog-result-row">
          <output aria-live="polite">
            {catalog.isPending
              ? "Preparando a vitrine…"
              : `${sorted.length} ${sorted.length === 1 ? "peça encontrada" : "peças encontradas"}${currentCategory ? ` em ${currentCategory.name}` : ""}`}
          </output>
          {hasFilters ? (
            <button type="button" className="text-button" onClick={clear}>
              <X size={14} aria-hidden="true" /> Limpar filtros
            </button>
          ) : (
            <span>
              Escolha uma peça para ver os detalhes <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          )}
        </div>
        {catalog.isPending && (
          <div className="product-grid" aria-busy="true" aria-label="Carregando as peças">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="product-skeleton" key={index}>
                <div />
                <span />
                <span />
              </div>
            ))}
          </div>
        )}
        {catalog.isError && (
          <div className="catalog-empty" role="alert">
            <span className="empty-icon">
              <RotateCcw size={26} aria-hidden="true" />
            </span>
            <h3>A vitrine não carregou desta vez.</h3>
            <p>
              Suas escolhas continuam guardadas. Tente novamente ou fale com a {STORE.owner} para
              conhecer as peças.
            </p>
            <div className="empty-actions">
              <button
                className="btn-primary"
                type="button"
                onClick={() => {
                  void catalog.refetch();
                }}
              >
                Tentar novamente
              </button>
              <a
                className="btn-secondary"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Eliane <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
        {!catalog.isPending && !catalog.isError && sorted.length === 0 && (
          <div className="catalog-empty">
            <span className="empty-icon">
              <SearchX size={28} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <h3>Ainda não encontramos essa combinação.</h3>
            <p>Tente outro nome, cor ou categoria. Ou peça uma sugestão para a Eliane.</p>
            <div className="empty-actions">
              <button className="btn-primary" type="button" onClick={clear}>
                Ver todas as peças
              </button>
              <a
                className="text-button"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir uma sugestão <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
        {!catalog.isError && !catalog.isPending && sorted.length > 0 && (
          <>
            <div className="product-grid">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={
                    categories.find((category) => category.slug === product.category)?.name
                  }
                  onOpen={onOpenProduct}
                />
              ))}
            </div>
            <div className="catalog-pagination">
              <p>
                Você viu {visible.length} de {sorted.length} peças
              </p>
              <div className="catalog-progress" aria-hidden="true">
                <span style={{ width: `${(visible.length / sorted.length) * 100}%` }} />
              </div>
              {visible.length < sorted.length && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  Ver mais peças <ArrowDown size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        )}
        <p className="catalog-footnote">
          O preço não apareceu? A Eliane te conta. Disponibilidade e condições são confirmadas pelo
          WhatsApp.
        </p>
      </div>
    </section>
  );
}
