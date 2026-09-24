import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";

/** Botão fixo: em qualquer ponto da página, um clique abre o WhatsApp. */
export function WhatsappFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${STORE.owner} no WhatsApp`}
      className="fixed right-4 bottom-4 z-[70] flex items-center gap-3 border border-black/20 bg-whatsapp px-4 py-3.5 text-[#05170c] shadow-[0_18px_40px_-18px_rgba(37,211,102,0.9)] transition-transform duration-300 hover:scale-[1.03] sm:right-6 sm:bottom-6"
    >
      <SiWhatsapp className="size-5" />
      <span className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase">
        Falar com a {STORE.owner}
      </span>
      <span className="pulse-ring pointer-events-none absolute inset-0" />
    </a>
  );
}
