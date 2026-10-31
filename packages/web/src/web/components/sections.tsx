import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Flower2,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  Shirt,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import { STORE, firstVisitWhatsappLink, whatsappLink } from "../lib/whatsapp";
import { JewelPlate } from "./jewel-plate";

export function OtherCollections() {
  return (
    <section className="other-collections shell" aria-label="Outras coleções da Nany">
      <div className="other-collections-label">
        <span className="eyebrow">ALÉM DO BRILHO</span>
        <h2>Mais Nany para você.</h2>
      </div>
      <Link href="/vestuario" className="collection-link">
        <span className="collection-icon">
          <Shirt size={27} strokeWidth={1.2} aria-hidden="true" />
        </span>
        <span>
          <strong>Vestuário</strong>
          <small>Conheça as opções com a Eliane</small>
        </span>
        <ArrowUpRight size={21} strokeWidth={1.3} aria-hidden="true" />
      </Link>
      <Link href="/lingerie" className="collection-link">
        <span className="collection-icon">
          <Flower2 size={28} strokeWidth={1.2} aria-hidden="true" />
        </span>
        <span>
          <strong>Lingerie</strong>
          <small>Um cuidado só seu, em cada detalhe</small>
        </span>
        <ArrowUpRight size={21} strokeWidth={1.3} aria-hidden="true" />
      </Link>
    </section>
  );
}

export function HowToBuy() {
  const steps = [
    {
      icon: Search,
      title: "Encontre o seu encanto",
      text: "Explore a vitrine, veja as fotos e salve suas favoritas no coração.",
    },
    {
      icon: Heart,
      title: "Escolha do seu jeito",
      text: "Peça uma peça pelo WhatsApp ou envie sua seleção em uma só mensagem.",
    },
    {
      icon: MessageCircle,
      title: "Converse com a Eliane",
      text: "Confirme os valores e a disponibilidade. Combine pagamento e entrega antes de concluir.",
    },
  ];
  return (
    <section className="how-section" id="como-comprar" aria-labelledby="how-title">
      <div className="shell">
        <div className="section-heading centered">
          <p className="eyebrow">SIMPLES, PESSOAL, SEM COMPLICAÇÃO</p>
          <h2 id="how-title">
            Da sua escolha <em>para uma conversa.</em>
          </h2>
          <p>Sem cadastro. Sem pressa. Com alguém para te ajudar.</p>
        </div>
        <ol className="buy-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className="step-top">
                <span className="step-icon">
                  <step.icon size={24} strokeWidth={1.3} aria-hidden="true" />
                </span>
                <span className="step-number">0{index + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <a
          className="text-button how-contact"
          href={firstVisitWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          É sua primeira vez? A Eliane te ajuda a escolher{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function AboutOwner() {
  const image = "/images/images/20261004_192042.jpg";
  return (
    <section className="about-section shell" id="sobre" aria-labelledby="about-title">
      <div className="about-visual">
        <div className="about-image">
          <JewelPlate
            image={image}
            alt="A maleta rosa da Nany aberta, com colares e brincos fotografados pela loja"
          />
        </div>
        <span className="about-caption">
          <Heart size={16} aria-hidden="true" /> A maleta da Nany, cheia de detalhes.
        </span>
        <span className="about-flower" aria-hidden="true">
          ✧
        </span>
      </div>
      <div className="about-copy">
        <p className="eyebrow">MUITO PRAZER, SOMOS A NANY</p>
        <h2 id="about-title">
          Por trás de cada escolha,
          <br />
          <em>tem a Eliane.</em>
        </h2>
        <p>
          A Nany é uma loja de semijoias, vestuário e lingerie em Guarapuava. Um espaço para
          encontrar algo que combine com você — ou com alguém especial.
        </p>
        <p>
          E o atendimento é de pessoa para pessoa. É com a Eliane que você tira dúvidas, confirma os
          detalhes e combina sua compra pelo WhatsApp.
        </p>
        <span className="about-location">
          <MapPin size={16} strokeWidth={1.5} aria-hidden="true" /> {STORE.city}
        </span>
        <a
          className="btn-secondary"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiWhatsapp size={17} aria-hidden="true" /> Quero conversar com a Eliane{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
    {
      q: "Como faço meu pedido?",
      a: "Abra uma peça e toque no botão do WhatsApp. Se quiser várias, salve-as no coração e envie sua seleção. A mensagem identifica cada escolha. A Eliane confirma tudo antes de você pagar.",
    },
    {
      q: "Por que algumas peças estão com preço sob consulta?",
      a: "Mostramos o preço quando ele está legível na etiqueta da foto. Quando não está, preferimos confirmar o valor com a Eliane em vez de informar um preço incorreto. O valor final de qualquer peça é confirmado na conversa.",
    },
    {
      q: "Como funcionam a entrega e o pagamento?",
      a: "Combine diretamente com a Eliane as formas de pagamento e as opções de entrega ou retirada para a sua região. Prazos, custos e disponibilidade são confirmados para cada pedido.",
    },
    {
      q: "Salvar uma peça já faz uma reserva?",
      a: "Não. O coração serve para organizar suas escolhas neste navegador. Sua seleção não é um pedido concluído nem uma reserva. A disponibilidade pode mudar e precisa ser confirmada com a Eliane.",
    },
    {
      q: "Posso saber o tamanho, material, cuidados e condições de troca?",
      a: "Sim. Envie a peça pelo WhatsApp e pergunte sobre medidas, composição, conservação, garantia e trocas. Esses detalhes podem variar de um produto para outro, então confirme as condições da sua escolha antes de comprar.",
    },
    {
      q: "Onde encontro as roupas e lingeries?",
      a: "As fotos e os valores dessas coleções ainda não estão publicados no site. Nas páginas de Vestuário e Lingerie, você pode pedir à Eliane as opções atuais, incluindo tamanhos e valores, pelo WhatsApp.",
    },
  ];
  return (
    <section className="faq-section" id="duvidas" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="faq-heading">
          <p className="eyebrow">PODE PERGUNTAR</p>
          <h2 id="faq-title">
            Tudo bem ter
            <br />
            <em>uma dúvida.</em>
          </h2>
          <p>Se a resposta não estiver aqui, a Eliane está a uma conversa de distância.</p>
          <a
            className="text-button"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Perguntar no WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="faq-items">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                <span>{faq.q}</span>
                <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="shell final-cta-inner">
        <span className="final-sparkle" aria-hidden="true">
          <Sparkles size={31} strokeWidth={1.1} />
        </span>
        <div>
          <p className="eyebrow">UM OI PODE SER O COMEÇO</p>
          <h2>
            Vamos encontrar <em>o seu próximo encanto?</em>
          </h2>
          <p>Conte o que você procura. A Eliane te ajuda com o resto.</p>
        </div>
        <a
          className="btn-primary"
          href={firstVisitWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiWhatsapp size={18} aria-hidden="true" /> Falar com a Eliane{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
