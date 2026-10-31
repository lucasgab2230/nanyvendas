import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";

export function WhatsappFab() {
  return (
    <a
      className="whatsapp-fab"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Posso ajudar? Converse com a ${STORE.owner} pelo WhatsApp`}
    >
      <SiWhatsapp size={23} aria-hidden="true" />
      <span>Posso ajudar?</span>
    </a>
  );
}
