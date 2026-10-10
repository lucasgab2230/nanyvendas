import { useState } from "react";
import type { ClothingProduct } from "../../api/catalog/clothing-products";
import { CatalogVestuario } from "../components/catalog-vestuario";
import { ProductModal } from "../components/product-modal";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { WhatsappFab } from "../components/whatsapp-fab";
import { STORE, whatsappLink } from "../lib/whatsapp";

function ClothingPage() {
  const [selected, setSelected] = useState<ClothingProduct | null>(null);
  const categoryName = selected?.category;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background" data-theme="clothing">
      <SiteHeader title="Vestuário" />
      <main>
        <section className="grain relative overflow-hidden pt-[110px] pb-16 sm:pt-[130px] sm:pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.16),transparent_65%)]" />
            <div className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(154,196,235,0.09),transparent_68%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="shell relative">
            <div className="max-w-2xl">
              <p className="eyebrow">Nany • Vestuário</p>
              <h1 className="mt-5 text-[42px] leading-[1.02] sm:text-[56px] lg:text-[62px]">
                Vestuário da Nany
                <br />
                <span className="gold-text italic">consulte as opções atuais</span>
              </h1>
              <p className="mt-6 max-w-lg font-sans text-[15px] leading-relaxed text-muted-foreground">
                Esta vitrine está sendo atualizada com fotos, tamanhos e valores confirmados. Peça à {STORE.owner} a seleção de vestuário disponível agora.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={whatsappLink(`Olá, ${STORE.owner}! Estou conhecendo o vestuário da Nany. Você pode me enviar as opções disponíveis e confirmar tamanhos e valores?`)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Consultar vestuário
                </a>
                <a href="/" className="btn-ghost-gold">
                  Voltar para Semijoias
                </a>
                <a href="/lingerie" className="btn-ghost-gold">
                  Ver Lingerie
                </a>
              </div>
            </div>
          </div>
        </section>
        <CatalogVestuario onOpenProduct={(p) => setSelected(p as any)} />
      </main>
      <SiteFooter title="Vestuário" />
      <WhatsappFab />
      <ProductModal product={selected as any} categoryName={categoryName} onClose={() => setSelected(null)} />
    </div>
  );
}

export default ClothingPage;
