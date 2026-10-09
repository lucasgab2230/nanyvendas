import { useEffect } from "react";
import { X, ShieldCheck, Sparkles, Package } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Product } from "../../api/catalog/products";
import { JewelPlate } from "./jewel-plate";
import { STORE, formatPrice, productWhatsappLink } from "../lib/whatsapp";

/**
 * Detalhe da peça: nome, preço, descrição e o botão que abre o WhatsApp com a
 * mensagem já preenchida. Fecha com Esc, com o X ou clicando fora do painel.
 */
export function ProductModal({
  product,
  categoryName,
  onClose,
}: {
  product: Product | null;
  categoryName?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [product, onClose]);

  if (!product) return null;

  const discount =
    product.price !== null && product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;

  const icons = [Sparkles, ShieldCheck, Package, Sparkles];

  return (
    <dialog
      open
      aria-label={product.name}
      className="fixed inset-0 z-[90] m-0 h-full max-h-none w-full max-w-none bg-black/80 p-0 backdrop-blur-sm"
    >
      {/* área fora do painel: clicar aqui fecha a peça */}
      <button
        type="button"
        aria-label="Fechar detalhes da peça"
        onClick={onClose}
        className="absolute inset-0 size-full cursor-default"
      />

      <div className="pointer-events-none relative flex h-full items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6">
        <div className="rise pointer-events-auto relative my-auto w-full max-w-4xl border border-gold/20 bg-elevated shadow-[0_40px_120px_-40px_rgba(0,0,0,1)]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 z-20 flex size-9 items-center justify-center border border-gold/25 bg-black/50 text-gold-soft transition-colors hover:bg-gold hover:text-[#14110d]"
          >
            <X className="size-4" strokeWidth={1.6} />
          </button>

          <div className="grid md:grid-cols-2">
            <JewelPlate
              category={product.category}
              tone={product.tone}
              image={product.image}
              alt={product.name}
              className="relative min-h-[280px] w-full md:min-h-full"
              artClassName="w-[46%] text-gold-soft/85"
              showSlotHint={false}
            >
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-gold px-3 py-1 font-sans text-[10px] font-semibold tracking-[0.16em] text-[#14110d] uppercase">
                  -{discount}% hoje
                </span>
              )}
            </JewelPlate>

            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                {categoryName && <span className="eyebrow text-[10px]">{categoryName}</span>}
                {product.badge && (
                  <span className="border border-gold/35 px-2 py-[3px] font-sans text-[9px] tracking-[0.18em] text-gold-soft uppercase">
                    {product.badge}
                  </span>
                )}
              </div>

              <h3 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">{product.name}</h3>

              <div className="flex flex-wrap items-end gap-3">
                <span className="font-display text-3xl text-gold-soft">
                  {product.price === null ? "Consultar preço" : formatPrice(product.price)}
                </span>
                {product.price !== null && product.compareAtPrice && (
                  <span className="font-sans text-sm text-muted-foreground/70 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground">{product.description}</p>

              <ul className="flex flex-col gap-2.5 border-y border-gold/12 py-4">
                {product.highlights.map((item, index) => {
                  const Icon = icons[index % icons.length];
                  return (
                    <li key={item} className="flex items-start gap-3">
                      <Icon className="mt-[2px] size-4 shrink-0 text-gold" strokeWidth={1.5} />
                      <span className="font-sans text-[13px] leading-relaxed text-foreground/85">{item}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col gap-3">
                <a
                  href={productWhatsappLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <SiWhatsapp className="size-4" />
                  Pedir no WhatsApp
                </a>
                <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
                  A mensagem já vai pronta para a {STORE.owner} com o nome desta peça
                  {product.price === null ? " para consultar o valor e a disponibilidade" : ` e o preço de ${formatPrice(product.price)}`}. Pagamento por Pix,
                  dinheiro ou cartão na entrega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
