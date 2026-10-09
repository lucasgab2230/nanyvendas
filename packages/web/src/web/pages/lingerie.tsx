import { useState } from "react";
import type { LingerieProduct } from "../../api/catalog/lingerie-products";
import { CatalogLingerie } from "../components/catalog-lingerie";
import { ProductModal } from "../components/product-modal";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { WhatsappFab } from "../components/whatsapp-fab";

function LingeriePage() {
  const [selected, setSelected] = useState<LingerieProduct | null>(null);
  const categoryName = selected?.category;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background" data-theme="clothing">
      <SiteHeader title="Lingerie" />
      <main>
        <section className="grain relative overflow-hidden pt-[110px] pb-16 sm:pt-[130px] sm:pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.16),transparent_65%)]" />
            <div className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(154,196,235,0.09),transparent_68%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="shell relative">
            <div className="max-w-2xl">
              <p className="eyebrow">Nany • Lingerie</p>
              <h1 className="mt-5 text-[42px] leading-[1.02] sm:text-[56px] lg:text-[62px]">
                Coleção de Lingerie
                <br />
                <span className="gold-text italic">conforto com delicadeza</span>
              </h1>
              <p className="mt-6 max-w-lg font-sans text-[15px] leading-relaxed text-muted-foreground">
                Meias, cuecas e calcinhas com conforto e estilo. Clique na peça para ver os detalhes e pedir pelo
                WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#catalogo" className="btn-gold">
                  Ver a vitrine
                </a>
                <a href="/" className="btn-ghost-gold">
                  Voltar para Semijoias
                </a>
                <a href="/vestuario" className="btn-ghost-gold">
                  Ver Vestuário
                </a>
              </div>
            </div>
          </div>
        </section>
        <CatalogLingerie onOpenProduct={(p) => setSelected(p as any)} />
      </main>
      <SiteFooter title="Lingerie" />
      <WhatsappFab />
      <ProductModal product={selected as any} categoryName={categoryName} onClose={() => setSelected(null)} />
    </div>
  );
}

export default LingeriePage;
