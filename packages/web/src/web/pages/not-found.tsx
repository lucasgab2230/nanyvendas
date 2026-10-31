import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { usePageMeta } from "../hooks/use-page-meta";

export default function NotFound() {
  usePageMeta(
    "Página não encontrada | Nany",
    "Volte para a vitrine da Nany e encontre seu próximo encanto.",
  );
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <div className="shell not-found" id="topo">
          <Sparkles size={32} strokeWidth={1.2} aria-hidden="true" />
          <p className="eyebrow">PÁGINA NÃO ENCONTRADA</p>
          <h1>
            Esse caminho não está aqui.
            <br />
            <em>Seu próximo encanto pode estar.</em>
          </h1>
          <p>O endereço pode ter mudado. Volte para a Nany e continue escolhendo com calma.</p>
          <Link href="/" className="btn-primary">
            <ArrowLeft size={17} aria-hidden="true" /> Voltar para a Nany
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
