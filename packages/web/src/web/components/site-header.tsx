import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";

const links = [
  { href: "/", label: "Semijoias" },
  { href: "/vestuario", label: "Vestuário" },
  { href: "/lingerie", label: "Lingerie" },
  { href: "#como-comprar", label: "Como comprar" },
  { href: "#cuidados", label: "Compra e cuidados" },
  { href: "#sobre", label: "A Nany" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteHeader({ title = "Semijoias" }: { title?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        scrolled ? "border-b border-gold/15 bg-[#0a0908]/88 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[70px] items-center justify-between gap-6">
        <a href="/" className="flex items-baseline gap-3">
          <span className="font-display text-[26px] leading-none text-foreground">
            Nany<span className="gold-text">.</span>
          </span>
          <span className="hidden font-sans text-[10px] tracking-[0.28em] text-gold/80 uppercase sm:block">
            {title}
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href.startsWith("#") && title !== "Semijoias" ? `/${link.href}` : link.href}
              className="font-sans text-[12px] tracking-[0.12em] text-foreground/70 uppercase transition-colors hover:text-gold-soft"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-gold hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <SiWhatsapp className="size-3.5" />
            Falar com a {STORE.owner}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="btn-ghost-gold !px-3 !py-2.5 sm:hidden"
          >
            <SiWhatsapp className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            className="flex size-10 items-center justify-center border border-gold/22 text-gold-soft lg:hidden"
          >
            {open ? <X className="size-4" strokeWidth={1.6} /> : <Menu className="size-4" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/15 bg-[#0a0908]/97 backdrop-blur-md lg:hidden">
          <nav id="site-mobile-nav" aria-label="Navegação principal" className="shell flex flex-col py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href.startsWith("#") && title !== "Semijoias" ? `/${link.href}` : link.href}
                onClick={() => setOpen(false)}
                className="border-b border-gold/10 py-4 font-sans text-[13px] tracking-[0.14em] text-foreground/80 uppercase last:border-0 hover:text-gold-soft"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
