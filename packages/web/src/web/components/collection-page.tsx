import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Flower2, Shirt } from "lucide-react";
import { Link } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import type { CatalogProduct } from "./product-card";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { WhatsappFab } from "./whatsapp-fab";
import { STORE, whatsappLink } from "../lib/whatsapp";
import { usePageMeta } from "../hooks/use-page-meta";

export function CollectionPage({
  kind,
  products = [],
  categories = [],
  isPending,
  isError,
  retry,
}: {
  kind: "vestuario" | "lingerie";
  products?: CatalogProduct[];
  categories?: { slug: string; name: string }[];
  isPending: boolean;
  isError: boolean;
  retry: () => void;
}) {
  const isClothing = kind === "vestuario";
  const title = isClothing ? "Vestuário" : "Lingerie";
  const Icon = isClothing ? Shirt : Flower2;
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const message = `Olá, ${STORE.owner}! Vim pela página de ${title.toLowerCase()} da Nany. Você pode me enviar fotos das opções atuais e confirmar tamanhos, valores e disponibilidade?`;
  usePageMeta(
    `${title} | Nany em Guarapuava`,
    `Conheça as opções atuais de ${title.toLowerCase()} da Nany. Converse com a Eliane para conferir fotos, tamanhos, valores e disponibilidade.`,
  );
  return (
    <>
      <SiteHeader title={title} />
      <main id="conteudo">
        <div className="shell collection-page" id="topo">
          <nav aria-label="Caminho da página" className="breadcrumb">
            <Link href="/">Início</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{title}</span>
          </nav>
          <section className="collection-hero">
            <div>
              <p className="eyebrow">OUTRAS ESCOLHAS, O MESMO CARINHO</p>
              <h1>
                {isClothing ? (
                  <>
                    Seu dia a dia.
                    <br />
                    <em>Do seu jeito.</em>
                  </>
                ) : (
                  <>
                    Um cuidado só seu.
                    <br />
                    <em>Em cada detalhe.</em>
                  </>
                )}
              </h1>
              <p>
                {isClothing
                  ? "Uma peça que combina com você faz a diferença. Peça à Eliane as opções atuais de vestuário, com fotos, tamanhos e valores."
                  : "Para conhecer as opções de lingerie, fale diretamente com a Eliane. Ela confirma fotos, modelos, tamanhos e valores com você."}
              </p>
              <a
                className="btn-primary"
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp size={18} aria-hidden="true" /> Consultar {title.toLowerCase()}{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="collection-consult">
              <Icon size={65} strokeWidth={0.9} aria-hidden="true" />
              <h2>
                {isClothing
                  ? "Vamos encontrar sua próxima peça?"
                  : "Escolha com calma, converse com carinho."}
              </h2>
              {isPending ? (
                <output className="collection-loading">Conferindo a coleção…</output>
              ) : isError ? (
                <>
                  <p role="alert">Não conseguimos consultar a coleção agora.</p>
                  <button type="button" className="text-button" onClick={retry}>
                    Tentar novamente
                  </button>
                </>
              ) : (
                <p>
                  {products.length
                    ? "Veja as peças abaixo e confirme os detalhes com a Eliane."
                    : `As fotos de ${title.toLowerCase()} ainda não estão publicadas no site. Consulte as opções atuais pelo WhatsApp.`}
                </p>
              )}
            </div>
          </section>
          {products.length > 0 && (
            <section aria-label={`Peças de ${title}`}>
              <h2 className="collection-options-heading">Conheça as peças</h2>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={setSelected}
                    selectable={false}
                    categoryName={
                      categories.find((category) => category.slug === product.category)?.name
                    }
                  />
                ))}
              </div>
            </section>
          )}
          <div className="collection-back">
            <p>Enquanto isso, a vitrine de semijoias está cheia de detalhes para conhecer.</p>
            <a className="text-button" href="/#catalogo">
              Explorar semijoias <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
      <SiteFooter title={title} />
      <WhatsappFab />
      <ProductModal
        product={selected}
        categoryName={categories.find((category) => category.slug === selected?.category)?.name}
        onClose={() => setSelected(null)}
        selectable={false}
      />
    </>
  );
}
