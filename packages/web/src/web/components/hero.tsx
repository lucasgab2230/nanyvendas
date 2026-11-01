import { ArrowDown, ArrowUpRight, Camera, Heart, MessageCircle, Sparkles } from "lucide-react";
import type { Product } from "../../api/catalog/products";
import { firstVisitWhatsappLink } from "../lib/whatsapp";
import { JewelPlate } from "./jewel-plate";

export function Hero({
  pieceCount,
  featured,
  onOpenProduct,
}: {
  pieceCount?: number;
  featured?: Product;
  onOpenProduct: (product: Product) => void;
}) {
  const image = "/images/images/20261004_193025.jpg";
  return (
    <>
      <section className="hero" id="topo">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> BELEZA NOS PEQUENOS DETALHES
            </p>
            <h1>
              Sua escolha.
              <br />
              Seu brilho.
              <br />
              <em>Seu estilo.</em>
            </h1>
            <p className="hero-description">
              Semijoias que dão um toque especial ao seu dia.
              <br className="desktop-break" /> Escolha com calma e converse com quem cuida de cada
              detalhe.
            </p>
            <div className="hero-actions">
              <a href="#catalogo" className="btn-primary">
                Encontrar minha semijoia <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                href={firstVisitWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-help"
              >
                Precisa de uma ajudinha?{" "}
                <span>
                  Fale com a Eliane <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </a>
            </div>
            <div className="hero-personal">
              <span className="owner-avatar" aria-hidden="true">
                E<span />
              </span>
              <p>
                De uma escolha especial
                <br />
                <strong>para uma conversa de verdade.</strong>
              </p>
              <span className="hero-personal-rule" />
              <Heart size={19} strokeWidth={1.3} aria-hidden="true" />
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-orbit orbit-one" aria-hidden="true" />
            <span className="hero-orbit orbit-two" aria-hidden="true" />
            <span className="hero-sparkle sparkle-one" aria-hidden="true">
              ✧
            </span>
            <span className="hero-sparkle sparkle-two" aria-hidden="true">
              ✧
            </span>
            <div className="hero-photo-frame">
              <JewelPlate
                image={image}
                alt="Brincos dourados de coração com textura canelada, uma das peças reais da Nany"
                large
                priority
              />
            </div>
            <span className="hero-photo-label">
              <Camera size={13} aria-hidden="true" /> FOTO REAL DA NOSSA VITRINE
            </span>
            <div className="hero-product-note">
              <span className="note-icon">
                <Sparkles size={20} strokeWidth={1.3} aria-hidden="true" />
              </span>
              <div>
                <span>PARA SE APAIXONAR</span>
                <strong>Um detalhe, tanto encanto.</strong>
                {featured ? (
                  <button type="button" onClick={() => onOpenProduct(featured)}>
                    Conhecer esta peça <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                ) : (
                  <a href="#catalogo">
                    Conhecer as peças <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
            <span className="hero-side-note" aria-hidden="true">
              ESCOLHIDAS COM CARINHO · NANY
            </span>
          </div>
        </div>
        <a href="#catalogo" className="hero-scroll" aria-label="Descer para a vitrine">
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      </section>
      <div className="benefits-strip">
        <div className="shell benefits-inner">
          <span>
            <Camera size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>
              <strong>Peças de verdade</strong>
              <small>Fotos reais, de pertinho</small>
            </span>
          </span>
          <span>
            <Heart size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>
              <strong>Escolha com carinho</strong>
              <small>
                {pieceCount
                  ? `${pieceCount} semijoias para conhecer`
                  : "Encontre o que combina com você"}
              </small>
            </span>
          </span>
          <span>
            <MessageCircle size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>
              <strong>Atendimento pessoal</strong>
              <small>Direto com a Eliane, sem cadastro</small>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
