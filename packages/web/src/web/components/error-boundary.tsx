import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { STORE, whatsappLink } from "../lib/whatsapp";

export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Nany] Falha na interface", error, info);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="shell not-found">
          <p className="eyebrow">NANY</p>
          <h1>Vamos tentar de novo?</h1>
          <p>
            Algo não carregou como deveria. Você pode reabrir a vitrine ou falar diretamente com a{" "}
            {STORE.owner}.
          </p>
          <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
            Reabrir a vitrine
          </button>
          <a
            className="btn-secondary"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversar pelo WhatsApp
          </a>
        </main>
      );
    return this.props.children;
  }
}
