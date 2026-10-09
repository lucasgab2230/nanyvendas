import { ShieldCheck, Truck, Gift, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { STORE, whatsappLink } from "../lib/whatsapp";

const trust = [
  { icon: ShieldCheck, label: "Prata com alta durabilidade e", hint: "com garantia" },
  { icon: Gift, label: "Embalagem de presente", hint: "inclusa" },
  { icon: Truck, label: "Entrega na região", hint: "e envio pelos Correios" },
];

/**
 * Banner de abertura: a maleta aberta com as semijoias é o primeiro impacto —
 * por enquanto como arte vetorial, no mesmo espaço onde a foto real vai entrar.
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
            Peças de prata, preço na etiqueta e atendimento direto com a {STORE.owner}. Você escolhe a
            peça aqui e finaliza no WhatsApp — sem cadastro, sem complicação.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "360ms" }}>
            <a href="#catalogo" className="btn-gold">
              Ver a vitrine{typeof pieceCount === "number" ? ` (${pieceCount} peças)` : ""}
            </a>
            <a href="/vestuario" className="btn-ghost-gold">
              Ver Coleção de Vestuário
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
              <SiWhatsapp className="size-3.5" />
              Tirar uma dúvida
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
              </span>
              </div>


            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <span>Prata de alta durabilidade</span>
            <span className="text-gold/50">◆</span>
            <span>Garantia de 6 meses</span>
            <span className="text-gold/50">◆</span>
            <span>Pix e cartão</span>
            <span className="text-gold/50">◆</span>
            <span>{STORE.hours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
