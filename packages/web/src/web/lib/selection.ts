import type { Product } from "../../api/catalog/products";

export const SELECTION_STORAGE_KEY = "nany:selection:v1";

export function readSelection(raw: string | null): number[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(value)) return [];
    return [
      ...new Set(value.filter((id): id is number => Number.isSafeInteger(id) && id > 0)),
    ].slice(0, 100);
  } catch {
    return [];
  }
}

export function selectionSummary(products: Pick<Product, "price">[]) {
  return {
    subtotal:
      products.reduce((sum, product) => sum + Math.round((product.price ?? 0) * 100), 0) / 100,
    unknownPrices: products.filter((product) => product.price === null).length,
  };
}
