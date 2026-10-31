import type { Product } from "../../api/catalog/products";

export type SortKey = "sugestoes" | "menor" | "maior" | "nome";
export type PriceFilter = "todos" | "ate50" | "50a80" | "acima80" | "consultar";

export interface CatalogFilters {
  category: string;
  search: string;
  sort: SortKey;
  price: PriceFilter;
}

export const defaultFilters: CatalogFilters = {
  category: "todas",
  search: "",
  sort: "sugestoes",
  price: "todos",
};

export { normalizeSearch } from "../../shared/search";
import { normalizeSearch } from "../../shared/search";

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  const words = normalizeSearch(filters.search).split(/\s+/).filter(Boolean);
  const result = products.filter((product) => {
    if (filters.category !== "todas" && product.category !== filters.category) return false;
    const text = normalizeSearch(
      [product.name, product.summary, product.description, ...product.highlights].join(" "),
    );
    if (!words.every((word) => text.includes(word))) return false;
    if (filters.price === "consultar") return product.price === null;
    if (filters.price !== "todos" && product.price === null) return false;
    if (filters.price === "ate50") return product.price! <= 50;
    if (filters.price === "50a80") return product.price! > 50 && product.price! <= 80;
    if (filters.price === "acima80") return product.price! > 80;
    return true;
  });

  return result.sort((a, b) => {
    if (filters.sort === "nome") return a.name.localeCompare(b.name, "pt-BR");
    if (filters.sort === "menor" || filters.sort === "maior") {
      // Preço sob consulta sempre fica ao final, nas duas direções.
      if (a.price === null) return b.price === null ? 0 : 1;
      if (b.price === null) return -1;
      return filters.sort === "menor" ? a.price - b.price : b.price - a.price;
    }
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
}

export function optimizedImage(image: string, width: 480 | 960 | 1600 = 480): string {
  // Somente fotos geradas pelo script usam variantes. Novos URLs continuam válidos.
  if (!/^\/images\/images\/20261004_\d+\.jpg$/.test(image)) return image;
  return `/images/optimized/${image
    .split("/")
    .pop()!
    .replace(/\.jpg$/, "")}-${width}.webp`;
}

export function productUrl(slug: string): string {
  const url = new URL("/", window.location.origin);
  url.searchParams.set("peca", slug);
  return url.toString();
}
