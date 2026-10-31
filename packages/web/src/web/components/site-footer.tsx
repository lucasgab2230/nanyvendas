import { ArrowUpRight, Clock3, Heart, MapPin } from "lucide-react";
import { Link } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";
import { Brand } from "./site-header";

export function SiteFooter({ title = "Semijoias" }: { title?: string }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Nany Semijoias & Mais — página inicial">
            <Brand light />
          </Link>
          <p>
            Semijoias, vestuário e lingerie.
            <br />
            Pequenos detalhes que fazem parte de você.
          </p>
          <span className="footer-made">
            <Heart size={13} aria-hidden="true" /> Feito com carinho, em Guarapuava.
          </span>
        </div>
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <h2>Explore a Nany</h2>
          <a href="/#catalogo" aria-current={title === "Semijoias" ? "page" : undefined}>
            Semijoias
          </a>
          <Link href="/vestuario">Vestuário</Link>
          <Link href="/lingerie">Lingerie</Link>
          <a href="/#como-comprar">Como comprar</a>
          <a href="/#duvidas">Dúvidas frequentes</a>
        </nav>
        <div className="footer-contact">
          <h2>Uma conversa com a Eliane</h2>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <SiWhatsapp size={17} aria-hidden="true" /> {STORE.whatsappLabel}{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <p>
            <MapPin size={16} aria-hidden="true" /> {STORE.city}
          </p>
          <p>
            <Clock3 size={16} aria-hidden="true" /> {STORE.hours}
          </p>
          <span>
            Pagamento, entrega e disponibilidade:
            <br />
            tudo combinado diretamente com a loja.
          </span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Nany. Todos os direitos reservados.</p>
        <a href="#topo">Voltar ao início ↑</a>
      </div>
    </footer>
  );
}
