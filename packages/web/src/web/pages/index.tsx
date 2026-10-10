import { useState } from "react";
import type { Product } from "../../api/catalog/products";
import { useCatalog } from "../queries/catalog";
import { SiteHeader } from "../components/site-header";
import { Hero } from "../components/hero";
import { Catalog } from "../components/catalog";
import { FirstVisit, HowToBuy, PurchaseInfo, AboutOwner, Faq, FinalCta } from "../components/sections";
import { SiteFooter } from "../components/site-footer";
import { WhatsappFab } from "../components/whatsapp-fab";
import { ProductModal } from "../components/product-modal";
import { STORE, whatsappLink } from "../lib/whatsapp";

/**
 * Home da Nany Semijoias: banner com a maleta, vitrine com preços e o caminho
 * do WhatsApp em todas as seções. A peça aberta vive aqui — o grid só avisa
 * qual foi clicada.
 */
function Index() {
  const [selected, setSelected] = useState<Product | null>(null);
  // Mesma chave de query usada pelo grid em "Todas": o catálogo é buscado uma vez só.
  const catalog = useCatalog("todas");

  const categoryName = catalog.data?.categories.find((c) => c.slug === selected?.category)?.name;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <Hero pieceCount={catalog.data?.total} />
        <FirstVisit />
        <div className="shell flex flex-wrap justify-center gap-4 py-6">
          <a href={whatsappLink(`Olá, ${STORE.owner}! Estou conhecendo o vestuário da Nany. Você pode me enviar as opções disponíveis e confirmar tamanhos e valores?`)} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Consultar Vestuário →
          </a>
          <a href={whatsappLink(`Olá, ${STORE.owner}! Estou conhecendo a lingerie da Nany. Você pode me enviar as opções disponíveis e confirmar tamanhos e valores?`)} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Consultar Lingerie →
          </a>
        </div>
        <Catalog onOpenProduct={setSelected} />
        <HowToBuy />
        <PurchaseInfo />
        <AboutOwner />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter title="Semijoias" />
      <WhatsappFab />
      <ProductModal product={selected} categoryName={categoryName} onClose={() => setSelected(null)} />
    </div>
  );
}

export default Index;
