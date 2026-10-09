/**
 * Tudo que envolve WhatsApp passa por aqui.
 *
 * Regra combinada com a loja: o link é sempre `wa.me` com mensagem padrão já
 * escrita, para a Eliane saber de qual peça a cliente está falando antes mesmo
 * de responder a primeira mensagem.
 */

export const STORE = {
  name: "Nany Semijoias e Vestuàrio",
  owner: "Eliane",
  /** Número no formato internacional, só dígitos — é ele que vai no wa.me. */
  whatsapp: "5542988089633",
  whatsappLabel: "+55 42 98808-9633",
  city: "Guarapuava — PR",
  hours: "Segunda a sábado, das 9h às 12h",
  instagram: "https://www.instagram.com/",
} as const;

/** Mensagem que abre qualquer conversa vinda do site. */
export const DEFAULT_MESSAGE = `Olá, ${STORE.owner}! Vim pelo site da ${STORE.name} e gostaria de saber mais sobre as semijoias.`;

/** Formata o preço do jeito que a cliente lê em voz alta. */
export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Mensagem com a peça identificada — usada no botão do modal. */
export function productMessage(product: { name: string; price: number | null; slug: string }): string {
  return [
    `Olá, ${STORE.owner}! Vi no site a peça *${product.name}*${product.price === null ? "" : ` (${formatPrice(product.price)})`}`,
    product.price === null ? "e gostaria de saber o preço e se ela está disponível." : "e gostaria de saber se ela está disponível.",
    "",
    `Peça: ${product.slug}`,
  ].join("\n");
}

/** Monta o link wa.me com a mensagem já codificada. */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappLink(product: { name: string; price: number | null; slug: string }): string {
  return whatsappLink(productMessage(product));
}
