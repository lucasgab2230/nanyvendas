/**
 * Catálogo de vestuário da Nany.
 * As entradas demonstrativas anteriores não tinham fotos nem preços confirmados;
 * não devem aparecer como ofertas reais. Cadastre itens aqui quando houver dados
 * e imagens aprovados pela loja.
 */
export type ClothingCategorySlug = "camisetas" | "blusas" | "calcas" | "shorts" | "vestidos" | "casacos";

export interface ClothingCategory {
  slug: ClothingCategorySlug;
  name: string;
  tagline: string;
}

export interface ClothingProduct {
  id: number;
  slug: string;
  name: string;
  category: ClothingCategorySlug;
  price: number;
  compareAtPrice?: number;
  summary: string;
  description: string;
  highlights: string[];
  badge?: string;
  featured?: boolean;
  tone: number;
  image: string | null;
}

export const clothingCategories: ClothingCategory[] = [
  { slug: "camisetas", name: "Camisetas", tagline: "Conforto no dia a dia" },
  { slug: "blusas", name: "Blusas", tagline: "Elegantes e versáteis" },
  { slug: "calcas", name: "Calças", tagline: "Caimento perfeito" },
  { slug: "shorts", name: "Shorts", tagline: "Leves para qualquer hora" },
  { slug: "vestidos", name: "Vestidos", tagline: "Charme e feminilidade" },
  { slug: "casacos", name: "Casacos", tagline: "Proteção com estilo" },
];

export const clothingProducts: ClothingProduct[] = [];
