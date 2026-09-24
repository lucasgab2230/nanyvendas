import type { Product } from "../../api/catalog/products";
import { JewelPlate } from "./jewel-plate";
import { formatPrice } from "../lib/whatsapp";

/**
 * Card da vitrine. Duas formas: vertical (padrão) e horizontal (peças em
 * destaque, que ocupam duas colunas no grid — quebra a grade de propósito).
 */
export function ProductCard({
  product,
  categoryName,
  variant = "vertical",
  onOpen,
}: {
  product: Product;
  categoryName?: string;
  variant?: "vertical" | "horizontal";
  onOpen: (product: Product) => void;
}) {
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;

  const info = (
    <div className="flex flex-1 flex-col gap-3 text-left">
      <div className="flex items-center gap-3">
        {categoryName && <span className="eyebrow text-[10px] text-gold/80">{categoryName}</span>}
        {product.badge && (
          <span className="border border-gold/35 px-2 py-[3px] font-sans text-[9px] tracking-[0.18em] text-gold-soft uppercase">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className={`font-display text-foreground ${variant === "horizontal" ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
        {product.name}
      </h3>

      <p className="font-sans text-[13px] leading-relaxed text-muted-foreground">{product.summary}</p>

      <div className="mt-1 flex items-end justify-between gap-4">
        <div className="flex flex-col">
          {discount > 0 && (
            <span className="font-sans text-[11px] text-muted-foreground/70 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
          <span className="font-display text-2xl text-gold-soft">{formatPrice(product.price)}</span>
        </div>
        <span className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {variant === "horizontal" ? "Ver peça →" : "Detalhes →"}
        </span>
      </div>
    </div>
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      aria-label={`Ver ${product.name} — ${formatPrice(product.price)}`}
      className={`piece-card group w-full ${variant === "horizontal" ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      <JewelPlate
        category={product.category}
        tone={product.tone}
        image={product.image}
        alt={product.name}
        className={
          variant === "horizontal"
            ? "relative h-56 w-full shrink-0 sm:h-full sm:min-h-[300px] sm:w-[46%]"
            : "relative aspect-square w-full"
        }
        artClassName={variant === "horizontal" ? "w-[46%] text-gold-soft/85" : "w-[52%] text-gold-soft/85"}
      />

      {variant === "horizontal" ? (
        <div className="flex flex-1 flex-col p-6 sm:p-8">{info}</div>
      ) : (
        <div className="flex flex-1 flex-col p-5">{info}</div>
      )}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </button>
  );
}
