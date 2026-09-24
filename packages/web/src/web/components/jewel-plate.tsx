import type { CategorySlug } from "../../api/catalog/products";
import { JewelArt } from "./jewel-art";

/**
 * "Prateleira" onde a foto da peça vai morar.
 *
 * Sem foto real, ela mostra a arte dourada da categoria + a moldura tracejada
 * com o tamanho da imagem. Quando `image` existir no catálogo, ela já entrega a
 * foto no lugar da arte.
 */
export function JewelPlate({
  category,
  tone = 1,
  image,
  alt,
  className = "",
  artClassName = "w-[52%] text-gold-soft/85",
  showSlotHint = true,
  slotHint = "foto real • 1200 × 1200",
  children,
}: {
  category: CategorySlug;
  tone?: number;
  image?: string | null;
  alt?: string;
  className?: string;
  artClassName?: string;
  showSlotHint?: boolean;
  slotHint?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`plate plate-${tone} piece-plate relative flex items-center justify-center overflow-hidden ${className}`}>
      {image ? (
        <img src={image} alt={alt ?? ""} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div className="sheen pointer-events-none absolute inset-0 overflow-hidden" />
          <JewelArt category={category} className={`relative ${artClassName}`} />
        </>
      )}

      {children}

      {!image && showSlotHint && (
        <span className="absolute bottom-3 left-3 font-sans text-[9px] tracking-[0.2em] text-gold/60 uppercase">
          {slotHint}
        </span>
      )}
    </div>
  );
}
