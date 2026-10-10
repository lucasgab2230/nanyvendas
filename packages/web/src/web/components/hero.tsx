import { Camera, Tag, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { STORE, firstVisitWhatsappLink } from "../lib/whatsapp";

const trust = [
  { icon: Camera, label: "Fotos das peças", hint: "reais e detalhadas" },
  { icon: Tag, label: "Preço transparente", hint: "na etiqueta ou com a Eliane" },
  { icon: MessageCircle, label: "Pedido sem cadastro", hint: "direto pelo WhatsApp" },
];

/**
 * Banner de abertura com a foto real da maleta e acesso rápido à vitrine.
 */
export function Hero({ pieceCount }: { pieceCount?: number }) {
  return (
    <section id="topo" className="grain relative overflow-hidden pt-[110px] pb-16 sm:pt-[130px] sm:pb-24">
      {/* fundo: brilho dourado + vinheta */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,74,0.16),transparent_65%)]" />
        <div className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(235,215,154,0.09),transparent_68%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="shell relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow rise" style={{ animationDelay: "60ms" }}>
            Semijoias • {STORE.city}
          </p>

          <h1
            className="rise mt-5 text-[42px] leading-[1.02] sm:text-[56px] lg:text-[62px]"
            style={{ animationDelay: "160ms" }}
          >
            O brilho certo
            <br />
            para o seu dia —
            <br />
            <span className="gold-text italic">e para o seu presente</span>
          </h1>

          <p
            className="rise mt-6 max-w-lg font-sans text-[15px] leading-relaxed text-muted-foreground"
            style={{ animationDelay: "260ms" }}
          >
            Conheça as peças pelas fotos e confira o preço quando ele estiver na etiqueta. A {STORE.owner} confirma
            disponibilidade, valores e entrega pelo WhatsApp — sem cadastro.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "360ms" }}>
            <a href="#catalogo" className="btn-gold">
              Ver semijoias{typeof pieceCount === "number" ? ` (${pieceCount} peças)` : ""}
            </a>
            <a href={firstVisitWhatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
              <SiWhatsapp className="size-3.5" />
              Primeira visita? Fale com a Eliane
            </a>
          </div>

          <dl className="rise mt-10 grid gap-5 sm:grid-cols-3" style={{ animationDelay: "460ms" }}>
            {trust.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-t border-gold/18 pt-4">
                <item.icon className="size-4 text-gold" strokeWidth={1.5} />
                <dt className="font-sans text-[12px] tracking-[0.06em] text-foreground/90">{item.label}</dt>
                <dd className="font-sans text-[11px] text-muted-foreground">{item.hint}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Banner — espaço da foto da maleta */}
        <div className="rise lg:col-span-7" style={{ animationDelay: "300ms" }}>
          <div className="relative border border-gold/20 bg-[linear-gradient(160deg,#1b1812,#0c0a08)] p-3 sm:p-4">
            <span className="absolute -top-px left-6 h-px w-24 bg-gold-soft/70" />

            <div className="relative overflow-hidden border border-gold/12">
              <div className="plate relative flex items-center justify-center">
                <div className="sheen pointer-events-none absolute inset-0 overflow-hidden" />
                <img
                  src="/images/images/20261004_192042.jpg"
                  alt="Porta-joias rosa aberto, com colares pendurados e divisórias para semijoias"
                  className="max-h-[560px] w-full object-contain"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/70 to-transparent px-5 pt-14 pb-5">
                <span className="font-sans text-[10px] tracking-[0.24em] text-gold/85 uppercase">
                  A maleta da Nany
                </span>
                <span className="font-sans text-[11px] text-muted-foreground">
                  Escolha uma peça da vitrine e confirme os detalhes pelo WhatsApp.
                </span>
              </div>


            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            <span>Preço visível ou sob consulta</span>
            <span className="text-gold/50">◆</span>
            <span>Disponibilidade confirmada antes do pedido</span>
            <span className="text-gold/50">◆</span>
            <span>{STORE.hours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
