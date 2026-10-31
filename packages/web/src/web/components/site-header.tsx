import { useEffect, useRef, useState } from "react";
import { Heart, MapPin, Menu, Search, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";
import { useSelection } from "./selection-provider";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-name">
        nany<span aria-hidden="true">✧</span>
      </span>
      <span className="brand-caption">SEMIJOIAS & MAIS</span>
    </span>
  );
}

export function SiteHeader({ title = "Semijoias" }: { title?: string }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const selection = useSelection();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  return (
    <>
      <div className="announcement">
        <div className="shell announcement-inner">
          <span>
            <MapPin size={13} aria-hidden="true" /> De Guarapuava, com carinho para você
          </span>
          <span className="announcement-extra">Escolha no site. Combine pelo WhatsApp.</span>
        </div>
      </div>
      <header className="site-header" ref={header}>
        <div className="shell header-inner">
          <Link href="/" className="brand-link" aria-label="Nany Semijoias & Mais — página inicial">
            <Brand />
          </Link>
          <nav
            id="main-navigation"
            aria-label="Navegação principal"
            className={`main-nav ${open ? "main-nav-open" : ""}`}
          >
            <a
              href="/#catalogo"
              className={title === "Semijoias" ? "nav-active" : ""}
              onClick={() => setOpen(false)}
              aria-current={title === "Semijoias" ? "page" : undefined}
            >
              Semijoias
            </a>
            <Link
              href="/vestuario"
              className={title === "Vestuário" ? "nav-active" : ""}
              aria-current={title === "Vestuário" ? "page" : undefined}
            >
              Vestuário
            </Link>
            <Link
              href="/lingerie"
              className={title === "Lingerie" ? "nav-active" : ""}
              aria-current={title === "Lingerie" ? "page" : undefined}
            >
              Lingerie
            </Link>
            <a href="/#como-comprar" onClick={() => setOpen(false)}>
              Como comprar
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-contact"
            >
              <SiWhatsapp size={17} aria-hidden="true" /> Falar com a {STORE.owner}
            </a>
          </nav>
          <div className="header-actions">
            <a
              className="icon-button header-search"
              href="/#catalogo"
              aria-label="Buscar na vitrine"
              onClick={(event) => {
                const input = document.getElementById("catalog-search");
                if (location === "/" && input) {
                  event.preventDefault();
                  input.focus({ preventScroll: true });
                  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Search size={20} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="icon-button selection-trigger"
              aria-label={`Abrir sua seleção${selection.ids.length ? `, ${selection.ids.length} ${selection.ids.length === 1 ? "peça" : "peças"}` : ""}`}
              onClick={() => {
                setOpen(false);
                selection.setOpen(true);
              }}
            >
              <Heart size={21} strokeWidth={1.6} aria-hidden="true" />
              {selection.ids.length > 0 && (
                <span className="selection-count" aria-hidden="true">
                  {selection.ids.length}
                </span>
              )}
            </button>
            <span className="header-divider" aria-hidden="true" />
            <a
              className="header-contact"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiWhatsapp size={17} aria-hidden="true" />
              <span>Fale com a Eliane</span>
            </a>
            <button
              type="button"
              ref={menuButton}
              className="icon-button menu-trigger"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="main-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
