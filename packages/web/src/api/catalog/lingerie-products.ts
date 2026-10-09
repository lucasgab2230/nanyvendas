/**
 * Catálogo de Lingerie - Nany
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

const careLingerie = "Cuidados especiais: lavar à mão ou ciclo delicado, não alvejante.";

export const lingerieProducts: LingerieProduct[] = [
  {
    id: 200,
    slug: "meias-cano-alto-brancas",
    name: "Meias Cano Alto Brancas",
    category: "meias",
    price: 24.9,
    summary: "Meias cano alto, confortáveis e versáteis.",
    description:
      "Meias cano alto brancas, em algodão com elástico suave. Ideais para looks casuais e esportivos.",
    highlights: ["Algodão macio", "Elástico suave", "Não marca", careLingerie],
    tone: 1,
    image: null,
  },
  {
    id: 201,
    slug: "meias-listradas-preto-branco",
    name: "Meias Listradas Preto/Branco",
    category: "meias",
    price: 29.9,
    summary: "Meias com listras clássicas para um toque retrô.",
    description:
      "Meias curtas com listras horizontais preto e branco, tecido macio e respirável. Perfeitas para compor looks despojados.",
    highlights: ["Tecido respirável", "Design listrado", "Durável", careLingerie],
    badge: "Novidade",
    tone: 2,
    image: null,
  },
  {
    id: 202,
    slug: "cueca-boxer-preta",
    name: "Cueca Boxer Preta",
    category: "cuecas",
    price: 39.9,
    summary: "Cueca boxer em algodão, conforto total.",
    description:
      "Cueca boxer preta em algodão 100%, com elástico reforçado e caimento confortável para uso diário.",
    highlights: ["Algodão 100%", "Elástico reforçado", "Conforto prolongado", careLingerie],
    featured: true,
    tone: 3,
    image: null,
  },
  {
    id: 203,
    slug: "cueca-slim-branca",
    name: "Cueca Slim Branca",
    category: "cuecas",
    price: 34.9,
    summary: "Modelo slim, suave e discreto.",
    description:
      "Cueca modelo slim branca, em malha macia de algodão. Ideal para quem busca conforto e discrição.",
    highlights: ["Malha macia", "Modelo slim", "Respirável", careLingerie],
    tone: 4,
    image: null,
  },
  {
    id: 204,
    slug: "calcinha-lisa-preta",
    name: "Calcinha Lisa Preta",
    category: "calcinhas",
    price: 39.9,
    summary: "Calcinha lisa em algodão, delicada e confortável.",
    description:
      "Calcinha lisa preta em algodão macio, com laterais finas e excelente caimento. Perfeita para o dia a dia.",
    highlights: ["Algodão macio", "Laterais finas", "Conforto diário", careLingerie],
    featured: true,
    badge: "Mais vendida",
    tone: 5,
    image: null,
  },
  {
    id: 205,
    slug: "calcinha-rendada-bege",
    name: "Calcinha Rendada Bege",
    category: "calcinhas",
    price: 44.9,
    summary: "Calcinha rendada, delicada e feminina.",
    description:
      "Calcinha rendada na cor bege, com acabamento delicado e tecido macio ao contato com a pele.",
    highlights: ["Renda delicada", "Tecido macio", "Acabamento refinado", careLingerie],
    tone: 1,
    image: null,
  },
];
