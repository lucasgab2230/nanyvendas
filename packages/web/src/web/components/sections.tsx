import {
  Camera,
  Check,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Gift,
  MapPin,
  MessageCircleHeart,
  ShieldQuestion,
  Tag,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Reveal } from "./reveal";
import { STORE, firstVisitWhatsappLink, whatsappLink } from "../lib/whatsapp";

/** Boas-vindas especial, sem oferecer desconto ou benefício não confirmado. */
export function FirstVisit() {
  return (
    <section id="primeira-visita" className="shell scroll-mt-24 py-5 sm:py-8">
      <Reveal className="relative overflow-hidden border border-gold/25 bg-[linear-gradient(110deg,#17130d,#0e0c09)] p-6 sm:p-9">
        <span className="absolute top-0 left-0 h-px w-28 bg-gold-soft/80" />
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Um primeiro oi para a Nany</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Primeira vez por aqui? <span className="gold-text italic">Que bom ter você.</span>
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-[14px] leading-relaxed text-muted-foreground">
              Se quiser ajuda para escolher, fale com a {STORE.owner}. A mensagem já explica que é sua primeira visita
e pede informações sobre as peças, valores e entrega — sem cadastro.
            </p>
          </div>
          <a
            href={firstVisitWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp justify-center"
          >
            <SiWhatsapp className="size-4" />
            Quero ajuda para escolher
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/** Caminho de compra com verificações simples antes de fechar o pedido. */
export function HowToBuy() {
  const steps = [
    {
      n: "01",
      title: "Encontre uma peça",
      text: "Explore as fotos da vitrine e abra o detalhe para conferir o que está visível sobre o produto.",
    },
    {
      n: "02",
      title: "Confirme pelo WhatsApp",
      text: `A mensagem já identifica a peça. A ${STORE.owner} confirma disponibilidade e esclarece valores ou detalhes que não apareçam na foto.`,
    },
    {
      n: "03",
      title: "Combine antes de concluir",
      text: "Confirme forma de pagamento, entrega ou retirada e qualquer informação importante para você.",
    },
  ];

  return (
    <section id="como-comprar" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Como comprar</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Da vitrine até você,
            <br />
            <span className="gold-text italic">com tudo combinado</span>
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-foreground">
            Um caminho direto, com espaço para tirar suas dúvidas antes de fechar.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 100} className="bg-background">
              <div className="flex h-full flex-col gap-4 p-7 sm:p-9">
                <span className="font-display text-5xl text-gold/35">{step.n}</span>
                <h3 className="font-display text-2xl leading-snug text-foreground">{step.title}</h3>
                <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-8 flex flex-wrap items-center gap-4">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <SiWhatsapp className="size-4" />
            Conversar com a {STORE.owner}
          </a>
          <span className="font-sans text-[12px] text-muted-foreground">
            {STORE.whatsappLabel} · {STORE.hours}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/** Informações para a cliente confirmar, sem criar promessas sobre a loja. */
export function PurchaseInfo() {
  const items = [
    {
      icon: Check,
      title: "Disponibilidade",
      text: "O estoque pode mudar. Confirme com a Eliane se a peça ainda está disponível antes de combinar o pedido.",
    },
    {
      icon: Tag,
      title: "Preço e detalhes",
      text: "O valor está no card quando foi possível ler a etiqueta. Para campos ausentes, materiais ou medidas, peça confirmação.",
    },
    {
      icon: MapPin,
      title: "Entrega ou retirada",
      text: `Combine diretamente com a ${STORE.owner} as opções e o prazo para Guarapuava ou outra localidade.`,
    },
    {
      icon: CreditCard,
      title: "Pagamento",
      text: "Pergunte quais formas estão disponíveis para o seu pedido e confirme antes de concluir.",
    },
    {
      icon: Gift,
      title: "É para presente?",
      text: "Conte a ocasião e pergunte sobre embalagem ou a possibilidade de incluir um recadinho.",
    },
    {
      icon: ShieldQuestion,
      title: "Trocas e garantia",
      text: "Condições podem variar por item. Consulte as regras aplicáveis à peça antes de finalizar a compra.",
    },
  ];

  return (
    <section id="cuidados" className="grain scroll-mt-24 border-y border-gold/12 bg-surface py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Informações claras</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Antes de pedir,
            <br />
            <span className="gold-text italic">confirme o que importa</span>
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-foreground">
            Cada produto pode ter detalhes e condições diferentes. A {STORE.owner} ajuda a confirmar tudo antes da compra.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 60}>
              <div className="flex flex-col gap-3">
                <item.icon className="size-5 text-gold" strokeWidth={1.5} />
                <h3 className="font-display text-[22px] leading-snug text-foreground">{item.title}</h3>
                <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 flex flex-col gap-3 border border-gold/15 bg-background/50 p-6 sm:flex-row sm:items-start sm:p-7">
          <Camera className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
          <p className="font-sans text-[13.5px] leading-relaxed text-muted-foreground">
            <span className="text-foreground">Cuidados da peça:</span> composição e recomendações podem variar. Pergunte como conservar o item escolhido, especialmente antes de expô-lo à água, perfume ou produtos de limpeza.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Apresentação da loja sem foto fictícia ou depoimento atribuído à proprietária. */
export function AboutOwner() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden border border-gold/20 bg-[radial-gradient(ellipse_at_top,rgba(201,162,74,0.13),transparent_62%),#12100c] p-7 sm:min-h-[340px] sm:p-9">
            <span className="font-display text-[92px] leading-none text-gold/70">N.</span>
            <div>
              <span className="eyebrow">Atendimento direto</span>
              <p className="mt-2 font-display text-3xl text-foreground">Eliane</p>
              <p className="mt-2 font-sans text-sm text-muted-foreground">{STORE.city}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-8">
          <p className="eyebrow">A Nany</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Sua escolha,
            <br />
            <span className="gold-text italic">com conversa de verdade</span>
          </h2>
          <div className="mt-6 flex flex-col gap-4 font-sans text-[15px] leading-relaxed text-muted-foreground">
            <p>
              A Nany reúne semijoias, vestuário e lingerie em {STORE.city}. Para conhecer as peças e tirar dúvidas, você pode falar diretamente com a {STORE.owner} pelo WhatsApp.
            </p>
            <p>
              Na sua primeira compra, diga o que está procurando — para você ou para presentear. A {STORE.owner} pode confirmar opções, valores e combinações de entrega antes de você decidir.
            </p>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-7">
            <SiWhatsapp className="size-4" />
            Falar com a {STORE.owner}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Respostas diretas para dúvidas comuns antes da primeira compra. */
export function Faq() {
  const faqs = [
    {
      q: "Como faço meu pedido?",
      a: `Abra a peça e toque em “Pedir no WhatsApp”. A mensagem identifica o produto; a ${STORE.owner} confirma disponibilidade e esclarece os detalhes antes de combinar o pedido.`,
    },
    {
      q: "O produto ainda está disponível?",
      a: `A disponibilidade pode mudar. Envie a mensagem do produto para a ${STORE.owner} e espere a confirmação antes de pagar.`,
    },
    {
      q: "Como descubro tamanho, material ou outros detalhes?",
      a: "Essas informações não estão disponíveis para todos os itens no site. Pergunte sobre a peça específica antes de decidir.",
    },
    {
      q: "Como combino entrega ou retirada?",
      a: `Escreva para a ${STORE.owner} para consultar as opções, local e prazo para seu pedido.`,
    },
    {
      q: "Quais formas de pagamento são aceitas?",
      a: "As formas podem depender do pedido. Confirme as opções disponíveis pelo WhatsApp antes de concluir.",
    },
    {
      q: "Vou presentear alguém. Há embalagem ou recadinho?",
      a: `Conte para a ${STORE.owner} que é um presente e pergunte quais opções de embalagem estão disponíveis.`,
    },
  ];

  return (
    <section id="duvidas" className="grain scroll-mt-24 border-y border-gold/12 bg-surface py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <CircleHelp className="mb-5 size-6 text-gold" strokeWidth={1.5} />
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl">
            Quer perguntar
            <br />
            <span className="gold-text italic">antes de escolher?</span>
          </h2>
          <p className="mt-5 font-sans text-[14px] leading-relaxed text-muted-foreground">
            Chame a {STORE.owner}. A mensagem já abre pronta no WhatsApp.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold mt-6">
            <SiWhatsapp className="size-3.5" />
            Perguntar no WhatsApp
          </a>
        </Reveal>

        <div className="lg:col-span-8">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 50}>
              <details className="group border-b border-gold/15 py-5 first:border-t first:border-gold/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-display text-[22px] leading-snug text-foreground">{faq.q}</span>
                  <ChevronDown className="size-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" strokeWidth={1.6} />
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

/** Chamada final para pedir sugestões sem apresentar estoque fictício. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,162,74,0.14),transparent_70%)]" />
      </div>
      <Reveal className="shell relative flex flex-col items-center gap-5 text-center">
        <MessageCircleHeart className="size-6 text-gold" strokeWidth={1.5} />
        <p className="eyebrow">Uma ajuda para escolher</p>
        <h2 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
          Conte o que você procura
          <span className="gold-text italic"> e converse com a Nany</span>
        </h2>
        <p className="max-w-xl font-sans text-[15px] leading-relaxed text-muted-foreground">
          Diga se é para você ou para presentear e quais detalhes são importantes. A {STORE.owner} confirma as opções disponíveis diretamente com você.
        </p>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-2">
          <SiWhatsapp className="size-4" />
          Pedir ajuda pelo WhatsApp
        </a>
        <span className="font-sans text-[12px] text-muted-foreground">{STORE.whatsappLabel}</span>
      </Reveal>
    </section>
  );
}
