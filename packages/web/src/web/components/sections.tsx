import { ShieldCheck, Sparkles, Package, CreditCard, ChevronDown, Quote, LockKeyhole } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Reveal } from "./reveal";
import { STORE, whatsappLink } from "../lib/whatsapp";

/** 01 → 02 → 03: o caminho de quem compra, do clique ao WhatsApp. */
export function HowToBuy() {
  const steps = [
    {
      n: "01",
      title: "Escolha a peça na vitrine",
      text: "Cada peça tem o preço na frente, sem precisar perguntar. Clique nela para ver material, medidas e garantia.",
    },
    {
      n: "02",
      title: "Clique em Pedir no WhatsApp",
      text: `A mensagem abre pronta com o nome e o preço da peça. A ${STORE.owner} confirma a disponibilidade e combina a entrega.`,
    },
    {
      n: "03",
      title: "Pague como preferir",
      text: "Pix, dinheiro ou cartão. Na região, dá para combinar a entrega em mãos — e a peça já vai embalada para presente.",
    },
  ];

  return (
    <section id="como-comprar" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Como comprar</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Do clique ao brilho na sua mão,
            <br />
            <span className="gold-text italic">em três passos</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 110} className="bg-background">
              <div className="flex h-full flex-col gap-4 p-7 sm:p-9">
                <span className="font-display text-5xl text-gold/35">{step.n}</span>
                <h3 className="font-display text-2xl leading-snug text-foreground">{step.title}</h3>
                <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-4">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <SiWhatsapp className="size-4" />
            Chamar a {STORE.owner} agora
          </a>
          <span className="font-sans text-[12px] text-muted-foreground">
            Atendimento {STORE.hours.toLowerCase()} • {STORE.whatsappLabel}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/** Garantias e cuidados: o que tira a dúvida de quem compra semijoia. */
export function Guarantees() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Garantia de 6 meses no banho",
      text: "Peça com banho de ouro 18k e garantia acompanhada no comprovante. Deu problema no banho dentro do prazo? A gente resolve.",
    },
    {
      icon: Sparkles,
      title: "Antialérgico e hipoalergênico",
      text: "Liga livre de níquel nas peças de contato, pensada para pele sensível e uso todos os dias.",
    },
    {
      icon: Package,
      title: "Embalagem para presente",
      text: "Toda peça sai em embalagem própria da Nany, com laço. Dá para enviar direto para quem vai receber.",
    },
    {
      icon: CreditCard,
      title: "Pix, dinheiro ou cartão",
      text: "Pagamento combinado no WhatsApp: Pix na hora, dinheiro na entrega ou cartão na maquininha.",
    },
    {
      icon: LockKeyhole,
      title: "Compra sempre com a Eliane",
      text: `Você fala direto com a dona da loja, do começo ao fim. Sem robô, sem intermediário.`,
    },
    {
      icon: Quote,
      title: "Resposta no mesmo dia",
      text: "Mensagens respondidas dentro do horário de atendimento — e se for presente para hoje, a gente corre.",
    },
  ];

  return (
    <section id="cuidados" className="grain scroll-mt-24 border-y border-gold/12 bg-surface py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Por que comprar tranquila</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Semijoia boa é a que
            <br />
            <span className="gold-text italic">dura e não dá trabalho</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="flex flex-col gap-3">
                <item.icon className="size-5 text-gold" strokeWidth={1.4} />
                <h3 className="font-display text-[22px] leading-snug text-foreground">{item.title}</h3>
                <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-12 grid gap-6 border border-gold/15 bg-background/50 p-7 sm:grid-cols-3 sm:p-9">
          <p className="font-sans text-[12px] tracking-[0.2em] text-gold uppercase sm:col-span-3">
            Como cuidar da sua peça
          </p>
          <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">
            Tire a peça antes do banho, da piscina e da praia — cloro e sal são os que mais atacam o banho.
          </p>
          <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">
            Perfume e hidratante primeiro, joia depois. Guarde em lugar seco, de preferência no saquinho da Nany.
          </p>
          <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">
            Para limpar, flanela seca ou um pano levemente úmido. Nunca use produto de limpeza abrasivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Quem está por trás da vitrine — retrato da Eliane ainda vazio. */
export function AboutOwner() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="plate plate-2 relative flex aspect-[4/5] flex-col items-center justify-center gap-4 border border-gold/20">
              <div className="sheen pointer-events-none absolute inset-0 overflow-hidden" />
              <span className="font-display text-[110px] leading-none text-gold/45">E</span>
              <span className="photo-slot px-4 py-2 font-sans text-[10px] tracking-[0.2em] text-gold/75 uppercase">
                Foto da Eliane entra aqui
              </span>
            </div>
            <span className="absolute -right-4 -bottom-4 hidden border border-gold/25 bg-background px-4 py-3 font-sans text-[10px] tracking-[0.2em] text-gold-soft uppercase sm:block">
              No comando desde o começo
            </span>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <p className="eyebrow">Quem cuida de cada peça</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            A {STORE.owner} escolhe peça por peça,
            <br />
            <span className="gold-text italic">antes de chegar até você</span>
          </h2>
          <div className="mt-6 flex flex-col gap-4 font-sans text-[15px] leading-relaxed text-muted-foreground">
            <p>
              A Nany Semijoias nasceu do jeito que a {STORE.owner} gosta de atender: olhando no olho, entendendo para
              quem é a peça e ajudando a escolher. Ela mesma seleciona os modelos, testa o brilho e o fecho, e conversa
              com cada cliente pelo WhatsApp como se fosse na loja.
            </p>
            <p>
              Por isso aqui você não encontra catálogo de mil peças iguais: é a vitrine do que ela tem em mãos, com o
              preço na etiqueta. Se a peça que você quer não estiver na lista, pergunta — muitas vezes ela tem, ou
              consegue encomendar.
            </p>
            <p className="text-gold-soft/90 italic">
              "Gosto de vender a peça certa para a pessoa certa. É isso que faz a cliente voltar." — {STORE.owner}
            </p>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
            Falar direto com a {STORE.owner}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Dúvidas frequentes — sanfona nativa, sem dependência nova. */
export function Faq() {
  const faqs = [
    {
      q: "Como faço o pedido?",
      a: `Você escolhe a peça na vitrine, clica no botão "Pedir no WhatsApp" e a mensagem abre pronta com o nome e o preço. A ${STORE.owner} confirma se está disponível e combina o pagamento e a entrega.`,
    },
    {
      q: "Vocês entregam ou é só retirada?",
      a: "Os dois. Na região de Ponta Grossa e cidades próximas dá para combinar entrega ou retirada em mãos. Para outras cidades, enviamos pelos Correios — o frete é combinado no WhatsApp antes de fechar.",
    },
    {
      q: "As semijoias escurecem?",
      a: "As peças têm banho de ouro 18k de alta durabilidade e garantia de 6 meses no banho. Com os cuidados básicos (tirar para banho, piscina e praia), a peça mantém o brilho por muito mais tempo.",
    },
    {
      q: "Dá para trocar ou devolver?",
      a: "Sim. A peça precisa estar sem uso e com a embalagem original. Fale no WhatsApp que a gente combina a troca ou o ajuste.",
    },
    {
      q: "Consigo ver mais modelos além dos do site?",
      a: "Consigo te mostrar sim — a loja tem muito mais peças do que esta prévia do site. Chama no WhatsApp que a Eliane manda as fotos das novidades.",
    },
    {
      q: "Quais as formas de pagamento?",
      a: "Pix, dinheiro e cartão (débito ou crédito na maquininha). Para presente, dá para pedir embalagem com laço sem custo extra.",
    },
  ];

  return (
    <section id="duvidas" className="grain scroll-mt-24 border-y border-gold/12 bg-surface py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Perguntas que
            <br />
            <span className="gold-text italic">a gente mais ouve</span>
          </h2>
          <p className="mt-5 font-sans text-[14px] leading-relaxed text-muted-foreground">
            Ficou outra dúvida? Manda mensagem — responder é a parte que a {STORE.owner} mais gosta.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold mt-6">
            <SiWhatsapp className="size-3.5" />
            Perguntar no WhatsApp
          </a>
        </Reveal>

        <div className="lg:col-span-8">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 60}>
              <details className="group border-b border-gold/15 py-5 first:border-t first:border-gold/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-display text-[22px] leading-snug text-foreground">{faq.q}</span>
                  <ChevronDown
                    className="size-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                    strokeWidth={1.6}
                  />
                </summary>
                <p className="mt-3 max-w-2xl font-sans text-[13.5px] leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Faixa final: se a peça procurada não está aqui, a Eliane resolve. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,162,74,0.14),transparent_70%)]" />
      </div>
      <Reveal className="shell relative flex flex-col items-center gap-6 text-center">
        <p className="eyebrow">Não achou o que queria?</p>
        <h2 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
          A vitrine do site é só uma parte —
          <span className="gold-text italic"> a loja tem muito mais</span>
        </h2>
        <p className="max-w-xl font-sans text-[15px] leading-relaxed text-muted-foreground">
          Conta para a {STORE.owner} o que você procura: ocasião, cor, faixa de preço. Ela manda as fotos das peças
          que combinam com você.
        </p>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <SiWhatsapp className="size-4" />
          Pedir sugestões no WhatsApp
        </a>
        <span className="font-sans text-[12px] text-muted-foreground">{STORE.whatsappLabel}</span>
      </Reveal>
    </section>
  );
}
