/**
 * Catálogo da Nany Semijoias.
 * Os itens abaixo foram cadastrados com base nas fotos reais de
 * `public/images/images/`. Preços só são preenchidos quando aparecem legíveis
 * nas etiquetas; `null` significa que a pessoa deve consultar a loja.
 */

export type CategorySlug = "aneis" | "colares" | "brincos" | "pulseiras" | "conjuntos" | "tornozeleiras";

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
  /** Preço confirmado pela etiqueta da foto; null quando não está visível. */
  price: number | null;
  compareAtPrice?: number;
  summary: string;
  description: string;
  highlights: string[];
  badge?: string;
  featured?: boolean;
  tone: number;
  image: string | null;
}

export const categories: Category[] = [
  { slug: "aneis", name: "Anéis", tagline: "Para marcar o dia" },
  { slug: "colares", name: "Colares", tagline: "O ponto de luz" },
  { slug: "brincos", name: "Brincos", tagline: "Brilho de perto" },
  { slug: "pulseiras", name: "Pulseiras", tagline: "No pulso, todo dia" },
  { slug: "conjuntos", name: "Conjuntos", tagline: "Presente pronto" },
  { slug: "tornozeleiras", name: "Tornozeleiras", tagline: "Detalhes para o tornozelo" },
];

const imagePath = (filename: string) => `/images/images/${filename}.jpg`;
const noPrice = "Preço não legível na foto; consulte a loja.";

export const products: Product[] = [
  {
    id: 1, slug: "brinco-ponto-de-luz-prateado", name: "Brinco Ponto de Luz Prateado", category: "brincos", price: null,
    summary: "Par de brincos prateados com topo arredondado e superfície brilhante.",
    description: `Par de brincos pequenos, arredondados e prateados, apresentado em cartela D’Lux. ${noPrice}`,
    highlights: ["Formato redondo", "Acabamento prateado", "Par em cartela"], tone: 1, image: imagePath("20261004_192354"),
  },
  {
    id: 2, slug: "brinco-no-prateado", name: "Brinco Nó Prateado", category: "brincos", price: null,
    summary: "Brincos prateados com desenho entrelaçado em relevo.",
    description: `Par de brincos prateados com formas entrelaçadas, fotografado em cartela D’Lux. ${noPrice}`,
    highlights: ["Desenho entrelaçado", "Acabamento prateado", "Par em cartela"], tone: 3, image: imagePath("20261004_192429"),
  },
  {
    id: 3, slug: "brinco-pedra-azul", name: "Brinco Pedra Azul", category: "brincos", price: null,
    summary: "Par de brincos redondos com pedra azul de destaque.",
    description: `Brincos redondos com pedras azuis facetadas, apresentados em cartela D’Lux. ${noPrice}`,
    highlights: ["Pedras azuis", "Formato redondo", "Par em cartela"], tone: 2, image: imagePath("20261004_192734"),
  },
  {
    id: 4, slug: "brinco-losango-vazado", name: "Brinco Losango Vazado", category: "brincos", price: null,
    summary: "Brincos grandes em formato de losango com desenho vazado.",
    description: `Par de brincos geométricos em formato de losango, com áreas vazadas e contorno metálico escuro. ${noPrice}`,
    highlights: ["Formato de losango", "Desenho vazado", "Par em cartela"], tone: 4, image: imagePath("20261004_192809"),
  },
  {
    id: 5, slug: "brinco-coracao-preto", name: "Brinco Coração Preto", category: "brincos", price: null,
    summary: "Brincos redondos escuros com detalhe de coração ao centro.",
    description: `Par de brincos redondos escuros com coração em relevo no centro, em cartela D’Lux. ${noPrice}`,
    highlights: ["Detalhe de coração", "Formato redondo", "Par em cartela"], tone: 5, image: imagePath("20261004_192844"),
  },
  {
    id: 6, slug: "brinco-lua-crescente-cristais", name: "Brinco Lua Crescente com Cristais", category: "brincos", price: null,
    summary: "Par de brincos em formato de lua crescente com pedras claras.",
    description: `Brincos curvos em formato de lua crescente, com pedras claras aplicadas. ${noPrice}`,
    highlights: ["Formato de lua crescente", "Pedras claras", "Par em cartela"], tone: 1, image: imagePath("20261004_192913"),
  },
  {
    id: 7, slug: "brinco-laco-dourado", name: "Brinco Laço Dourado", category: "brincos", price: null,
    summary: "Brincos dourados delicados com desenho de laço.",
    description: `Par de brincos dourados em formato de laço, com pequeno ponto brilhante ao centro. ${noPrice}`,
    highlights: ["Formato de laço", "Acabamento dourado", "Par em cartela"], tone: 2, image: imagePath("20261004_192931"),
  },
  {
    id: 8, slug: "brinco-coracao-canelado", name: "Brinco Coração Canelado", category: "brincos", price: null,
    summary: "Brincos dourados em formato de coração com textura canelada.",
    description: `Par de brincos dourados em formato de coração, com linhas em relevo. ${noPrice}`,
    highlights: ["Formato de coração", "Textura canelada", "Par em cartela"], tone: 3, image: imagePath("20261004_193025"),
  },
  {
    id: 9, slug: "brinco-gota-dourada", name: "Brinco Gota Dourada", category: "brincos", price: null,
    summary: "Brincos dourados alongados em formato de gota.",
    description: `Par de brincos metálicos dourados, com formato curvo e alongado de gota. ${noPrice}`,
    highlights: ["Formato de gota", "Acabamento dourado", "Par em cartela"], tone: 4, image: imagePath("20261004_193038"),
  },
  {
    id: 10, slug: "brinco-estrela-dourada", name: "Brinco Estrela Dourada", category: "brincos", price: null,
    summary: "Brincos pequenos em formato de estrela.",
    description: `Par de brincos dourados em formato de estrela, apresentado em cartela D’Lux. ${noPrice}`,
    highlights: ["Formato de estrela", "Acabamento dourado", "Par em cartela"], tone: 5, image: imagePath("20261004_193102"),
  },
  {
    id: 11, slug: "brinco-redondo-cristais", name: "Brinco Redondo com Cristais", category: "brincos", price: null,
    summary: "Brincos redondos com pedras claras agrupadas.",
    description: `Par de brincos redondos com várias pedras claras aplicadas em composição floral. ${noPrice}`,
    highlights: ["Formato redondo", "Pedras claras", "Par em cartela"], tone: 1, image: imagePath("20261004_193120"),
  },
  {
    id: 12, slug: "brinco-asa-escura", name: "Brinco Asa Escura", category: "brincos", price: null,
    summary: "Brincos alongados com desenho de asa e detalhes brilhantes.",
    description: `Par de brincos assimétricos em formato de asa, com áreas escuras e pontos brilhantes. ${noPrice}`,
    highlights: ["Formato de asa", "Contraste escuro e brilhante", "Par em cartela"], tone: 2, image: imagePath("20261004_193136"),
  },
  {
    id: 13, slug: "brinco-coracao-cristais", name: "Brinco Coração com Cristais", category: "brincos", price: null,
    summary: "Brincos de coração contornado por pedras claras.",
    description: `Par de brincos em formato de coração com contorno de pedras claras e detalhe central. ${noPrice}`,
    highlights: ["Formato de coração", "Pedras claras", "Par em cartela"], tone: 3, image: imagePath("20261004_193159"),
  },
  {
    id: 14, slug: "brinco-coracao-preto-liso", name: "Brinco Coração Preto Liso", category: "brincos", price: null,
    summary: "Brincos grandes em formato de coração escuro.",
    description: `Par de brincos grandes em formato de coração, com superfície escura e lisa. ${noPrice}`,
    highlights: ["Formato de coração", "Acabamento escuro", "Par em cartela"], tone: 4, image: imagePath("20261004_193246"),
  },
  {
    id: 15, slug: "brinco-flor-dourada", name: "Brinco Flor Dourada", category: "brincos", price: null,
    summary: "Brincos grandes em formato de flor com quatro pétalas.",
    description: `Par de brincos dourados em formato de flor de quatro pétalas, com linhas em relevo. ${noPrice}`,
    highlights: ["Formato de flor", "Quatro pétalas", "Par em cartela"], tone: 5, image: imagePath("20261004_193305"),
  },
  {
    id: 16, slug: "anel-dourado-largo", name: "Anel Dourado Largo", category: "aneis", price: 79.9,
    summary: "Anel dourado largo com aro liso e desenho arredondado.",
    description: "Anel de acabamento dourado e aro largo. A etiqueta da foto indica R$ 79,90.",
    highlights: ["Acabamento dourado", "Aro largo", "Preço da etiqueta: R$ 79,90"], tone: 1, image: imagePath("20261004_193857"),
  },
  {
    id: 17, slug: "anel-prateado-largo", name: "Anel Prateado Largo", category: "aneis", price: 89.9,
    summary: "Anel prateado de aro largo e visual marcante.",
    description: "Anel de acabamento prateado e aro largo. A etiqueta da foto indica R$ 89,90.",
    highlights: ["Acabamento prateado", "Aro largo", "Preço da etiqueta: R$ 89,90"], tone: 2, image: imagePath("20261004_193936"),
  },
  {
    id: 18, slug: "anel-dourado-liso", name: "Anel Dourado Liso", category: "aneis", price: 89.9,
    summary: "Anel dourado de superfície lisa e formato arredondado.",
    description: "Anel dourado de linhas simples. A etiqueta da foto indica R$ 89,90.",
    highlights: ["Acabamento dourado", "Superfície lisa", "Preço da etiqueta: R$ 89,90"], tone: 3, image: imagePath("20261004_193959"),
  },
  {
    id: 19, slug: "anel-prateado-com-pedras", name: "Anel Prateado com Pedras", category: "aneis", price: 69.9,
    summary: "Anel prateado com fileira de pedras claras no aro.",
    description: "Anel de acabamento prateado com pedras claras aplicadas ao redor da parte visível do aro. A etiqueta indica R$ 69,90.",
    highlights: ["Acabamento prateado", "Pedras claras", "Preço da etiqueta: R$ 69,90"], tone: 4, image: imagePath("20261004_194050"),
  },
  {
    id: 20, slug: "brinco-coracao-gratidao", name: "Brinco Coração Gratidão", category: "brincos", price: null,
    summary: "Par de brincos dourados em formato de coração com a palavra Gratidão.",
    description: `Brincos dourados em formato de coração com a palavra “Gratidão” em relevo. ${noPrice}`,
    highlights: ["Formato de coração", "Inscrição “Gratidão”", "Par"], tone: 5, image: imagePath("20261004_195659"),
  },
  {
    id: 21, slug: "pulseira-prateada-cruzes", name: "Pulseira Prateada com Cruzes", category: "pulseiras", price: 49.9,
    summary: "Pulseira prateada com pequenos pingentes de cruz.",
    description: "Pulseira de corrente prateada com pingentes de cruz distribuídos ao longo do fio. A etiqueta da foto indica R$ 49,90.",
    highlights: ["Corrente prateada", "Pingentes de cruz", "Preço da etiqueta: R$ 49,90"], tone: 1, image: imagePath("20261004_200109"),
  },
  {
    id: 22, slug: "pulseira-prateada-delicada", name: "Pulseira Prateada Delicada", category: "pulseiras", price: 59.9,
    summary: "Pulseira de corrente prateada com pequenos detalhes pendentes.",
    description: "Pulseira prateada de corrente fina com pequenos detalhes ao longo do fio. A etiqueta indica R$ 59,90.",
    highlights: ["Corrente prateada", "Detalhes delicados", "Preço da etiqueta: R$ 59,90"], tone: 2, image: imagePath("20261004_200148"),
  },
  {
    id: 23, slug: "pulseira-coracoes-prateados", name: "Pulseira de Corações Prateados", category: "pulseiras", price: 79.9,
    summary: "Pulseira prateada com pingentes de coração ao longo da corrente.",
    description: "Pulseira prateada com corações pendentes em diferentes posições. A etiqueta indica R$ 79,90.",
    highlights: ["Corrente prateada", "Pingentes de coração", "Preço da etiqueta: R$ 79,90"], tone: 3, image: imagePath("20261004_200219"),
  },
  {
    id: 24, slug: "colar-pingente-lettering", name: "Colar com Pingente Lettering", category: "colares", price: 59.9,
    summary: "Colar prateado com pingente escrito em letras cursivas.",
    description: "Corrente prateada com pingente de lettering. A etiqueta da foto indica R$ 59,90.",
    highlights: ["Corrente prateada", "Pingente lettering", "Preço da etiqueta: R$ 59,90"], tone: 4, image: imagePath("20261004_200240"),
  },
  {
    id: 25, slug: "colar-coracoes-dourados", name: "Colar com Corações Dourados", category: "colares", price: 69.9,
    summary: "Colar dourado com pequenos pingentes de coração.",
    description: "Corrente dourada decorada com corações e pequenos detalhes brilhantes. A etiqueta indica R$ 69,90.",
    highlights: ["Corrente dourada", "Pingentes de coração", "Preço da etiqueta: R$ 69,90"], tone: 5, image: imagePath("20261004_200345"),
  },
  {
    id: 26, slug: "pulseira-dourada-pedras-facetadas", name: "Pulseira Dourada com Pedras Facetadas", category: "pulseiras", price: 79.9,
    summary: "Pulseira dourada com contas escuras facetadas ao longo do fio.",
    description: "Pulseira dourada com contas escuras facetadas espaçadas ao longo da corrente. A etiqueta indica R$ 79,90.",
    highlights: ["Corrente dourada", "Contas escuras facetadas", "Preço da etiqueta: R$ 79,90"], tone: 1, image: imagePath("20261004_200443"),
  },
  {
    id: 27, slug: "colar-prateado-ponto-de-luz", name: "Colar Prateado com Ponto de Luz", category: "colares", price: 49.9,
    summary: "Colar prateado de corrente fina com pequeno detalhe brilhante.",
    description: "Corrente fina prateada com pequeno detalhe brilhante próximo ao fecho. A etiqueta indica R$ 49,90. A presilha de segurança na foto serve para prender a peça ao fundo.",
    highlights: ["Corrente prateada", "Pequeno detalhe brilhante", "Preço da etiqueta: R$ 49,90"], tone: 2, image: imagePath("20261004_200508"),
  },
  {
    id: 28, slug: "colar-pingente-figura-dourada", name: "Colar com Pingente Figura Dourada", category: "colares", price: 89.9,
    summary: "Colar dourado com pingente de figura colorida.",
    description: "Corrente dourada com pingente de figura decorativa com detalhes coloridos. A etiqueta indica R$ 89,90.",
    highlights: ["Corrente dourada", "Pingente decorativo", "Preço da etiqueta: R$ 89,90"], tone: 3, image: imagePath("20261004_200539"),
  },
  {
    id: 29, slug: "colar-dourado-laco-pedras", name: "Colar Dourado com Laço e Pedras", category: "colares", price: 69.9,
    summary: "Colar dourado com detalhe de laço e pequenas pedras claras.",
    description: "Colar dourado com detalhe de laço junto à corrente e pequenas pedras claras. A etiqueta indica R$ 69,90. A presilha visível prende a peça ao fundo para a foto.",
    highlights: ["Corrente dourada", "Detalhe de laço", "Preço da etiqueta: R$ 69,90"], tone: 4, image: imagePath("20261004_200608"),
  },
  {
    id: 30, slug: "tornozeleira-feminina-flor", name: "Tornozeleira Feminina com Flor", category: "tornozeleiras", price: 59.9,
    summary: "Tornozeleira dourada com detalhe de flor e pequenas pedras claras.",
    description: "Tornozeleira feminina dourada com detalhe floral e pequenas pedras claras. A etiqueta identifica a peça como tornozeleira e indica R$ 59,90.",
    highlights: ["Tornozeleira dourada", "Detalhe de flor", "Preço da etiqueta: R$ 59,90"], tone: 5, image: imagePath("20261004_200632"),
  },
  {
    id: 31, slug: "brinco-longo-preto-e-dourado", name: "Brinco Longo Preto e Dourado", category: "brincos", price: 42.9,
    summary: "Par de brincos grandes e alongados em preto e dourado.",
    description: "Brinco grande alongado com partes escuras e detalhes dourados. A etiqueta informa R$ 42,90.",
    highlights: ["Modelo grande", "Formato alongado", "Preço da etiqueta: R$ 42,90"], tone: 1, image: imagePath("20261004_201253"),
  },
  {
    id: 32, slug: "brinco-coracao-vazado-dourado", name: "Brinco Coração Vazado Dourado", category: "brincos", price: 24.9,
    summary: "Brincos dourados com pingentes de coração vazado e textura rendada.",
    description: "Par de brincos grandes com coração vazado e desenho rendado. A etiqueta informa R$ 24,90.",
    highlights: ["Formato de coração", "Desenho vazado", "Preço da etiqueta: R$ 24,90"], tone: 2, image: imagePath("20261004_201300"),
  },
  {
    id: 33, slug: "brinco-retangular-listrado", name: "Brinco Retangular Listrado", category: "brincos", price: 39.9,
    summary: "Brincos grandes com formato retangular e faixas vazadas.",
    description: "Par de brincos grandes com formato geométrico e faixas paralelas. A etiqueta informa R$ 39,90.",
    highlights: ["Formato geométrico", "Faixas vazadas", "Preço da etiqueta: R$ 39,90"], tone: 3, image: imagePath("20261004_201312"),
  },
  {
    id: 34, slug: "brinco-cone-preto", name: "Brinco Cone Preto", category: "brincos", price: 44.9,
    summary: "Brincos grandes, escuros e alongados em formato de cone.",
    description: "Par de brincos grandes com formato cônico alongado e acabamento escuro. A etiqueta informa R$ 44,90.",
    highlights: ["Formato cônico", "Acabamento escuro", "Preço da etiqueta: R$ 44,90"], tone: 4, image: imagePath("20261004_201318"),
  },
  {
    id: 35, slug: "brinco-argola-coracao-prateado", name: "Brinco Argola Coração Prateado", category: "brincos", price: 49.9,
    summary: "Argolas prateadas em formato de coração, com contorno de pequenas pedras.",
    description: "Par de brincos em formato de coração, com contorno de pequenas pedras. A etiqueta informa R$ 49,90.",
    highlights: ["Formato de coração", "Contorno com pedras", "Preço da etiqueta: R$ 49,90"], tone: 5, image: imagePath("20261004_201506"),
  },
];
