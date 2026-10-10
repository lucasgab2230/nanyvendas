import { MapPin, Clock, Info } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";

const navLinks = [
  { href: "/", label: "Semijoias" },
  { href: "/vestuario", label: "Vestuário" },
  { href: "/lingerie", label: "Lingerie" },
  { href: "#como-comprar", label: "Como comprar" },
  { href: "#cuidados", label: "Compra e cuidados" },
  { href: "#sobre", label: "A Nany" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteFooter({ title = "Semijoias" }: { title?: string }) {
  return (
    <footer className="border-t border-gold/15 bg-[#080706]">
      <div className="shell grid gap-10 py-14 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <span className="font-display text-[30px] leading-none text-foreground">
            Nany<span className="gold-text">.</span>{" "}
            <span className="font-sans text-[10px] tracking-[0.28em] text-gold/80 uppercase">{title}</span>
          </span>
          <p className="max-w-sm font-sans text-[13.5px] leading-relaxed text-muted-foreground">
            Semijoias, vestuário e lingerie da Nany. Consulte disponibilidade, detalhes e formas de entrega com a {STORE.owner} pelo WhatsApp.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold self-start">
            <SiWhatsapp className="size-4" />
            Pedir pelo WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <span className="eyebrow">Contato</span>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-sans text-[13.5px] text-foreground/85 transition-colors hover:text-gold-soft"
          >
            <SiWhatsapp className="size-4 text-gold" />
            {STORE.whatsappLabel}
          </a>
          <span className="flex items-center gap-3 font-sans text-[13.5px] text-foreground/85">
            <MapPin className="size-4 text-gold" strokeWidth={1.5} />
            {STORE.city}
          </span>
          <span className="flex items-center gap-3 font-sans text-[13.5px] text-foreground/85">
            <Clock className="size-4 text-gold" strokeWidth={1.5} />
            {STORE.hours}
          </span>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-3">
          <span className="eyebrow">Navegar</span>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href.startsWith("#") && title !== "Semijoias" ? `/${link.href}` : link.href}
              className="font-sans text-[13.5px] text-foreground/80 transition-colors hover:text-gold-soft"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-gold/12 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 font-sans text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-[2px] size-3.5 shrink-0 text-gold/70" strokeWidth={1.6} />
          {STORE.name} © {new Date().getFullYear()}
        </p>
        <p className="font-sans text-[11px] text-muted-foreground/70">Feito com carinho para a {STORE.owner}</p>
      </div>
    </footer>
  );
}
