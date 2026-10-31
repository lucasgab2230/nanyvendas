import { ArrowRight, Heart, Info, Trash2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Dialog } from "./dialog";
import { useSelection } from "./selection-provider";
import { JewelPlate } from "./jewel-plate";
import { selectionSummary } from "../lib/selection";
import { formatPrice, selectionWhatsappLink } from "../lib/whatsapp";

export function SelectionDrawer() {
  const selection = useSelection();
  const { subtotal, unknownPrices } = selectionSummary(selection.products);

  return (
    <Dialog
      open={selection.isOpen}
      onClose={() => selection.setOpen(false)}
      titleId="selection-title"
      className="selection-dialog"
    >
      <div className="selection-heading">
        <span className="eyebrow">GUARDADAS COM CARINHO</span>
        <h2 id="selection-title">
          Sua seleção<span className="selection-title-count">{selection.products.length}</span>
        </h2>
        <p>Suas favoritas, juntas em uma só conversa.</p>
      </div>
      {selection.isLoading ? (
        <output className="selection-empty">Buscando suas peças…</output>
      ) : selection.isError ? (
        <div className="selection-empty" role="alert">
          <p>Não foi possível consultar suas peças agora.</p>
          <button type="button" className="btn-primary" onClick={selection.retry}>
            Tentar novamente
          </button>
        </div>
      ) : selection.products.length === 0 ? (
        <div className="selection-empty">
          <span className="empty-icon">
            <Heart size={30} strokeWidth={1.3} aria-hidden="true" />
          </span>
          <h3>Uma seleção com a sua cara</h3>
          <p>
            Toque no coração das peças que gostar. Elas ficam guardadas aqui para você enviar à
            Eliane.
          </p>
          <a href="/#catalogo" onClick={() => selection.setOpen(false)} className="btn-primary">
            Explorar semijoias <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      ) : (
        <>
          <ul className="selection-items">
            {selection.products.map((product) => (
              <li key={product.id}>
                {product.image && (
                  <JewelPlate
                    image={product.image}
                    alt={product.name}
                    className="selection-thumbnail"
                  />
                )}
                <div>
                  <h3>{product.name}</h3>
                  <p>
                    {product.price === null ? "Preço sob consulta" : formatPrice(product.price)}
                  </p>
                </div>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => selection.remove(product.id)}
                  aria-label={`Remover ${product.name} da seleção`}
                >
                  <Trash2 size={19} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="selection-summary">
            <div className="selection-total">
              <span>{unknownPrices ? "Subtotal dos preços informados" : "Subtotal das peças"}</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            {unknownPrices > 0 && (
              <p className="price-note">
                + {unknownPrices} {unknownPrices === 1 ? "peça com preço" : "peças com preços"} sob
                consulta
              </p>
            )}
            <p className="selection-disclaimer">
              <Info size={17} aria-hidden="true" /> Esta seleção não reserva as peças. Valores,
              disponibilidade, pagamento e entrega são confirmados com a Eliane.
            </p>
            <a
              className="btn-whatsapp"
              href={selectionWhatsappLink(selection.products)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiWhatsapp size={19} aria-hidden="true" /> Enviar seleção pelo WhatsApp
            </a>
            <button className="text-button" type="button" onClick={() => selection.setOpen(false)}>
              Continuar escolhendo <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
      <p className="selection-storage-note">
        Guardada somente neste navegador, quando o armazenamento está disponível. Sem cadastro.
      </p>
    </Dialog>
  );
}
