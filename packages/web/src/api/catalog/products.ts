/**
 * Catálogo da Nany Semijoias.
 *
 * Fonte única de verdade das peças enquanto o modelo está em apresentação.
 * Quando a Eliane mandar as fotos e os preços definitivos, basta editar este
 * arquivo (ou migrar para a tabela do banco) — a API e a home leem daqui.
 *
 * `image` fica como `null` de propósito: enquanto for null, a vitrine desenha
 * o placeholder vetorial dourado no lugar da foto.
 */

export type CategorySlug = "aneis" | "colares" | "brincos" | "pulseiras" | "conjuntos";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Preço atual em reais. */
  price: number;
  /** Preço "de" (riscado) quando a peça está em condição especial. */
  compareAtPrice?: number;
  /** Frase curta que aparece no card. */
  summary: string;
  /** Descrição longa que aparece no modal da peça. */
  description: string;
  highlights: string[];
  /** Selo opcional: "Mais vendida", "Novidade", "Últimas peças". */
  badge?: string;
  featured?: boolean;
  /** Variação 1..5 do gradiente do placeholder — mantém a vitrine heterogênea. */
  tone: number;
  /** Caminho da foto real quando existir, ex: "/images/produtos/anel-luna.jpg". */
  image: string | null;
}

export const categories: Category[] = [
  { slug: "aneis", name: "Anéis", tagline: "Para marcar o dia" },
  { slug: "colares", name: "Colares", tagline: "O ponto de luz" },
  { slug: "brincos", name: "Brincos", tagline: "Brilho de perto" },
  { slug: "pulseiras", name: "Pulseiras", tagline: "No pulso, todo dia" },
  { slug: "conjuntos", name: "Conjuntos", tagline: "Presente pronto" },
];

const care = "Banho de ouro 18k de alta durabilidade, com orientação de cuidado junto da peça.";

export const products: Product[] = [
  {
    id: 1,
    slug: "anel-solitario-luna",
    name: "Anel Solitário Luna",
    category: "aneis",
    price: 149.9,
    compareAtPrice: 189.9,
    summary: "Solitário com zircônia brilhante em aro fino.",
    description:
      "O clássico solitário, afinado para o dia a dia. A zircônia lapidada em brilhante traz o brilho do diamante sem o peso do preço — e o aro fino permite usar junto de aliança ou de outros anéis.",
    highlights: ["Zircônia lapidada brilhante", "Aro fino, confortável", "Ajuste sob medida na loja", care],
    badge: "Mais vendida",
    featured: true,
    tone: 1,
    image: null,
  },
  {
    id: 2,
    slug: "anel-duo-aureo",
    name: "Anel Duo Áureo",
    category: "aneis",
    price: 119.9,
    summary: "Dois aros delicados cruzados em um só anel.",
    description:
      "Um anel que já parece dois: os aros se cruzam na frente e criam um volume leve, ótimo para quem gosta de sobrepor anéis sem exagero.",
    highlights: ["Efeito de anéis sobrepostos", "Ø 16 a 19 com ajuste", care],
    tone: 3,
    image: null,
  },
  {
    id: 3,
    slug: "anel-folha-ajustavel",
    name: "Anel Folha Ajustável",
    category: "aneis",
    price: 79.9,
    summary: "Folha vazada com aro ajustável — serve em qualquer dedo.",
    description:
      "Aro ajustável de verdade: abre e fecha para servir em qualquer dedo, de mão em mão. A folha vazada é daquelas peças que a pessoa sai usando do primeiro dia.",
    highlights: ["Aro ajustável", "Ideal para presente", care],
    tone: 5,
    image: null,
  },
  {
    id: 4,
    slug: "colar-choker-venus",
    name: "Colar Choker Vênus",
    category: "colares",
    price: 179.9,
    summary: "Choker de elos com pingente gota central.",
    description:
      "Choker de elos clássicos com gota central de zircônia. Assenta na base do pescoço e valoriza qualquer decote — usa sozinho ou sobreposta com um colar mais longo.",
    highlights: ["40 cm + extensor de 5 cm", "Pingente gota de zircônia", care],
    badge: "Novidade",
    featured: true,
    tone: 2,
    image: null,
  },
  {
    id: 5,
    slug: "colar-ponto-de-luz-estrela",
    name: "Colar Ponto de Luz Estrela",
    category: "colares",
    price: 129.9,
    summary: "Fio fino com uma única pedra brilhante.",
    description:
      "O ponto de luz é o colar que resolve tudo: discreto no trabalho, brilhante à noite. Fio fino com uma zircônia em montagem de garra, bem no meio do colo.",
    highlights: ["42 cm com extensor", "Monte com brinco combinando", care],
    tone: 1,
    image: null,
  },
  {
    id: 6,
    slug: "gargantilha-perola-classica",
    name: "Gargantilha Pérola Clássica",
    category: "colares",
    price: 139.9,
    compareAtPrice: 169.9,
    summary: "Fileira de pérolas românticas em fio resistente.",
    description:
      "Pérola sintética de alto brilho em fio resistente, no comprimento de gargantilha. Aquela peça atemporal que combina com vestido e com camiseta branca.",
    highlights: ["Comprimento 38 cm", "Fecho reforçado", care],
    tone: 4,
    image: null,
  },
  {
    id: 7,
    slug: "brinco-argola-media-roma",
    name: "Brinco Argola Média Roma",
    category: "brincos",
    price: 99.9,
    summary: "Argola de 3 cm, textura lisa e fecho de encaixe.",
    description:
      "Argola média de 3 cm, textura lisa e fecho de encaixe — leve o suficiente para passar o dia inteiro e marcante o suficiente para assumir o look.",
    highlights: ["Ø 3 cm", "Leve, não pesa na orelha", care],
    badge: "Mais vendida",
    tone: 3,
    image: null,
  },
  {
    id: 8,
    slug: "brinco-gota-bianca",
    name: "Brinco Gota Bianca",
    category: "brincos",
    price: 89.9,
    summary: "Gota facetada que pega a luz em qualquer ângulo.",
    description:
      "Gota facetada suspensa, com movimento no balanço da cabeça. Um brinco que faz a luz trabalhar sozinha — perfeito para festa e para o jantar de domingo.",
    highlights: ["2,8 cm de altura", "Pedra facetada", care],
    tone: 5,
    image: null,
  },
  {
    id: 9,
    slug: "brinco-trio-cristal",
    name: "Brinco Trio Cristal",
    category: "brincos",
    price: 69.9,
    summary: "Três pontos de luz alinhados na orelha.",
    description:
      "Três zircônias alinhadas, subindo a orelha. Dá a impressão de múltiplos furos com a praticidade de um brinco só.",
    highlights: ["Efeito de múltiplos furos", "Tamanho único", care],
    tone: 4,
    image: null,
  },
  {
    id: 10,
    slug: "pulseira-riviera-sofia",
    name: "Pulseira Riviera Sofia",
    category: "pulseiras",
    price: 159.9,
    summary: "Fileira contínua de pedras, fecho ajustável.",
    description:
      "Fileira contínua de zircônias em montagem riviera. É a pulseira que transforma um look simples, sozinha — e fica impecável junto de relógio.",
    highlights: ["17 cm + extensor de 3 cm", "Fecho reforçado", care],
    featured: true,
    tone: 2,
    image: null,
  },
  {
    id: 11,
    slug: "pulseira-elos-italianos",
    name: "Pulseira Elos Italianos",
    category: "pulseiras",
    price: 109.9,
    summary: "Elos achatados clássicos, para usar todo dia.",
    description:
      "Clássico dos clássicos: elos italianos achatados, com brilho espelhado. Aguenta uso diário, sol e água da mão com os cuidados de sempre.",
    highlights: ["18 cm", "Brilho espelhado", care],
    tone: 3,
    image: null,
  },
  {
    id: 12,
    slug: "conjunto-aurora",
    name: "Conjunto Aurora",
    category: "conjuntos",
    price: 269.9,
    compareAtPrice: 319.9,
    summary: "Colar + brinco combinando, embalado para presente.",
    description:
      "Colar e brinco combinando, no mesmo desenho. Vem numa caixa da Nany, com laço — é o presente que já sai pronto, sem precisar pensar mais nada.",
    highlights: ["Colar + brinco", "Embalagem para presente inclusa", care],
    badge: "Presente pronto",
    featured: true,
    tone: 1,
    image: null,
  },
  {
    id: 13,
    slug: "conjunto-festa-lumiere",
    name: "Conjunto Festa Lumière",
    category: "conjuntos",
    price: 289.9,
    summary: "Gargantilha + brinco de festa, brilho alto.",
    description:
      "Conjunto de festa: gargantilha de pedras e brinco suspenso combinando. Feito para formatura, casamento e aniversário de 15 anos.",
    highlights: ["Gargantilha + brinco", "Ideal para formatura e casamento", care],
    tone: 5,
    image: null,
  },
  {
    id: 14,
    slug: "anel-alianca-combinada",
    name: "Par de Alianças Combinar",
    category: "aneis",
    price: 199.9,
    summary: "Par de anéis com acabamento fosco e polido.",
    description:
      "Par de anéis em tamanhos diferentes, com acabamento fosco e polido no mesmo aro. Combina para casais que querem uma aliança discreta para o dia a dia.",
    highlights: ["Par com dois tamanhos", "Ajuste de tamanho na loja", care],
    tone: 4,
    image: null,
  },
];
