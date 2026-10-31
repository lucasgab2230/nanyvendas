import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Heart, Info, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { CatalogProduct } from "./product-card";
import { Dialog } from "./dialog";
import { JewelPlate } from "./jewel-plate";
import { useSelection } from "./selection-provider";
import { STORE, formatPrice, productWhatsappLink } from "../lib/whatsapp";
import { productUrl } from "../lib/catalog";

export function ProductModal({
  product,
  categoryName,
  onClose,
  selectable = true,
}: {
  product: CatalogProduct | null;
  categoryName?: string;
  onClose: () => void;
  selectable?: boolean;
}) {
  const selection = useSelection();
  const [zoomed, setZoomed] = useState(false);
  const [manualShare, setManualShare] = useState(false);
  useEffect(() => {
    setZoomed(false);
    setManualShare(false);
  }, [product?.slug]);
  const saved = product ? selection.ids.includes(product.id) : false;

  const share = async () => {
    if (!product) return;
    const url = productUrl(product.slug);
    try {
      if (navigator.share) {
        await navigator.share({ title: `${product.name} | Nany`, url });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        selection.notify("Link da peça copiado. É só compartilhar!");
      } else setManualShare(true);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setManualShare(true);
    }
  };

  return (
    <Dialog
      open={Boolean(product)}
      onClose={onClose}
      titleId="product-modal-title"
      className="product-dialog"
    >
      {product && (
        <div className="product-modal-layout">
          <div className={`product-modal-photo ${zoomed ? "photo-zoomed" : ""}`}>
            <JewelPlate image={product.image} alt={product.name} large />
            <button
              type="button"
              className="photo-zoom-button"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? "Diminuir foto" : "Ver de pertinho — ampliar foto"}
              aria-pressed={zoomed}
            >
              {zoomed ? (
                <ZoomOut size={18} aria-hidden="true" />
              ) : (
                <ZoomIn size={18} aria-hidden="true" />
              )}
              <span>{zoomed ? "Diminuir" : "Ver de pertinho"}</span>
            </button>
            <span className="photo-real-caption">Foto real da peça</span>
          </div>
          <div className="product-modal-info">
            <p className="eyebrow">{categoryName ?? "SEMIJOIAS NANY"}</p>
            <h2 id="product-modal-title">{product.name}</h2>
            <p className="product-reference">Referência: {product.slug}</p>
            <p className="modal-price">
              {product.price === null ? "Preço sob consulta" : formatPrice(product.price)}
            </p>
            <p className="modal-description">{product.description}</p>
            <ul className="product-highlights">
              {product.highlights
                .filter((item) => !item.startsWith("Preço da etiqueta"))
                .map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    {item}
                  </li>
                ))}
            </ul>
            <div className="modal-actions">
              <a
                className="btn-whatsapp"
                href={productWhatsappLink(product)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp size={19} aria-hidden="true" />
                {product.price === null ? "Consultar no WhatsApp" : "Quero esta peça"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {selectable && (
                <button
                  type="button"
                  className={`btn-secondary ${saved ? "selection-saved" : ""}`}
                  onClick={() => selection.toggle(product)}
                  aria-pressed={saved}
                >
                  <Heart size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
                  {saved ? "Salva na sua seleção" : "Salvar na minha seleção"}
                </button>
              )}
              {selectable && (
                <button
                  type="button"
                  className="text-button modal-share"
                  onClick={() => {
                    void share();
                  }}
                >
                  <Share2 size={16} aria-hidden="true" /> Compartilhar esta peça
                </button>
              )}
              {manualShare && (
                <label className="manual-share">
                  Copie o link para compartilhar
                  <input
                    type="text"
                    aria-label="Copie o link para compartilhar"
                    readOnly
                    value={productUrl(product.slug)}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                </label>
              )}
            </div>
            <p className="modal-disclaimer">
              <Info size={17} aria-hidden="true" />
              <span>
                A {STORE.owner} confirma disponibilidade, valor final, pagamento e entrega com você.
                Salvar não reserva a peça.
              </span>
            </p>
          </div>
        </div>
      )}
    </Dialog>
  );
}
