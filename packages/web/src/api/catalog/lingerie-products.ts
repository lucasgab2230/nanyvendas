/**
 * Catálogo de lingerie da Nany.
 * As entradas demonstrativas anteriores não tinham fotos nem preços confirmados;
 * não devem aparecer como ofertas reais. Cadastre itens aqui quando houver dados
 * e imagens aprovados pela loja.
 */
export type LingerieCategorySlug = "meias" | "cuecas" | "calcinhas";

export interface LingerieCategory {
  slug: LingerieCategorySlug;
  name: string;
  tagline: string;
}

export interface LingerieProduct {
  id: number;
  slug: string;
  name: string;
  category: LingerieCategorySlug;
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

export const lingerieCategories: LingerieCategory[] = [
  { slug: "meias", name: "Meias", tagline: "Conforto e estilo" },
  { slug: "cuecas", name: "Cuecas", tagline: "Conforto no dia a dia" },
  { slug: "calcinhas", name: "Calcinhas", tagline: "Delicadeza e conforto" },
];

export const lingerieProducts: LingerieProduct[] = [];
