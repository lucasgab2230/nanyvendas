/**
 * Catálogo de Vestuário - Nany
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

const careClothing = "Algodão de alta qualidade, com orientação de cuidado junto da peça.";

export const clothingProducts: ClothingProduct[] = [
  {
    id: 100,
    slug: "camiseta-basica-preta",
    name: "Camiseta Básica Preta",
    category: "camisetas",
    price: 89.9,
    summary: "Camiseta básica em algodão, macia e confortável.",
    description:
      "Camiseta básica preta em algodão 100%, ideal para compor looks casuais ou para usar como base. Muito confortável para o dia a dia.",
    highlights: ["Algodão 100%", "Malha macia", "Não desbota com cuidados corretos", careClothing],
    badge: "Mais vendida",
    featured: true,
    tone: 2,
    image: null,
  },
  {
    id: 101,
    slug: "camiseta-manga-longa-cinza",
    name: "Camiseta Manga Longa Cinza",
    category: "camisetas",
    price: 99.9,
    summary: "Manga longa confortável para dias mais frescos.",
    description:
      "Camiseta manga longa em algodão penteado, com caimento solto e confortável. Perfeita para sobrepor ou usar sozinha em dias mais frescos.",
    highlights: ["Algodão penteado", "Manga longa", "Caimento confortável", careClothing],
    tone: 3,
    image: null,
  },
  {
    id: 102,
    slug: "blusa-crop-off-white",
    name: "Blusa Crop Off White",
    category: "blusas",
    price: 129.9,
    summary: "Blusa crop moderna e versátil.",
    description:
      "Blusa crop na cor off white, tecido leve e macio. Combina perfeitamente com calças altas ou shorts.",
    highlights: ["Tecido leve", "Modelo crop", "Versátil", careClothing],
    badge: "Novidade",
    featured: true,
    tone: 1,
    image: null,
  },
  {
    id: 103,
    slug: "blusa-moletom-bege",
    name: "Blusa Moletom Bege",
    category: "blusas",
    price: 179.9,
    summary: "Moletom macio para conforto máximo.",
    description:
      "Moletom bege em fleece macio, perfeito para dias frios. Design minimalista que combina com qualquer estilo.",
    highlights: ["Fleece macio", "Conforto térmico", "Design minimalista", careClothing],
    tone: 4,
    image: null,
  },
  {
    id: 104,
    slug: "calca-jeans-skinny",
    name: "Calça Jeans Skinny",
    category: "calcas",
    price: 229.9,
    compareAtPrice: 269.9,
    summary: "Calça jeans skinny com ótimo caimento.",
    description:
      "Calça jeans skinny com elastano, proporcionando conforto e caimento perfeito ao corpo. Ideal para qualquer ocasião.",
    highlights: ["Com elastano", "Caimento skinny", "Resistente", careClothing],
    featured: true,
    tone: 2,
    image: null,
  },
  {
    id: 105,
    slug: "calca-wide-leg-preta",
    name: "Calça Wide Leg Preta",
    category: "calcas",
    price: 199.9,
    summary: "Calça pantalona moderna e elegante.",
    description:
      "Calça wide leg preta, tecido fluido que dá movimento e elegância ao look. Tendência e super versátil.",
    highlights: ["Tecido fluido", "Modelo wide leg", "Elegante", careClothing],
    tone: 5,
    image: null,
  },
  {
    id: 106,
    slug: "shorts-jeans-alto",
    name: "Shorts Jeans Cintura Alta",
    category: "shorts",
    price: 149.9,
    summary: "Shorts jeans cintura alta, clássico e estiloso.",
    description:
      "Shorts jeans com cintura alta, modelagem confortável e comprimento perfeito para looks despojados e modernos.",
    highlights: ["Cintura alta", "Jeans resistente", "Modelo clássico", careClothing],
    badge: "Mais vendida",
    tone: 3,
    image: null,
  },
  {
    id: 107,
    slug: "shorts-linho-bege",
    name: "Shorts de Linho Bege",
    category: "shorts",
    price: 129.9,
    summary: "Shorts de linho, leves e fresquinhos.",
    description:
      "Shorts de linho bege, super leves e frescos para dias quentes. Conforto e elegância em uma única peça.",
    highlights: ["100% linho", "Leve e fresco", "Ideal para verão", careClothing],
    tone: 1,
    image: null,
  },
  {
    id: 108,
    slug: "vestido-midi-floral",
    name: "Vestido Midi Floral",
    category: "vestidos",
    price: 249.9,
    summary: "Vestido midi com estampa floral romântica.",
    description:
      "Vestido midi de tecido leve com estampa floral. Caimento fluido, perfeito para eventos e looks românticos.",
    highlights: ["Tecido leve e fluido", "Estampa floral", "Modelo midi", careClothing],
    featured: true,
    tone: 4,
    image: null,
  },
  {
    id: 109,
    slug: "vestido-tubinho-preto",
    name: "Vestido Tubinho Preto",
    category: "vestidos",
    price: 199.9,
    summary: "Vestido tubinho clássico e elegante.",
    description:
      "Vestido tubinho preto atemporal, pode ser usado em diversas ocasiões. Simples, elegante e versátil.",
    highlights: ["Clássico atemporal", "Versátil", "Elegante", careClothing],
    tone: 2,
    image: null,
  },
  {
    id: 110,
    slug: "casaco-jaqueta-jeans",
    name: "Jaqueta Jeans Oversized",
    category: "casacos",
    price: 279.9,
    compareAtPrice: 319.9,
    summary: "Jaqueta jeans oversized, tendência e estilosa.",
    description:
      "Jaqueta jeans oversized com lavagem clássica. Peça curinga que combina com qualquer look e nunca sai de moda.",
    highlights: ["Modelo oversized", "Lavagem clássica", "Peça curinga", careClothing],
    badge: "Tendência",
    featured: true,
    tone: 3,
    image: null,
  },
  {
    id: 111,
    slug: "casaco-cardigan-bege",
    name: "Cardigã Bege",
    category: "casacos",
    price: 199.9,
    summary: "Cardigã macio e versátil para sobrepor.",
    description:
      "Cardigã bege em tricô macio, perfeito para sobrepor em qualquer ocasião. Leve e aconchegante.",
    highlights: ["Tricô macio", "Aconchegante", "Versátil para sobrepor", careClothing],
    tone: 5,
    image: null,
  },
];
