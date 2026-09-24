# Nany Semijoias — Design

Landing page + catálogo de semijoias para a loja **Nany Semijoias** (dona: Eliane). Web (React/Vite), tema escuro
"joalheria": preto quente, dourado e uma serifada fina. O trabalho principal da página é levar a visitante do
brilho da vitrine até uma conversa no WhatsApp com o produto já identificado na mensagem.

Versão atual = **modelo de apresentação**: as fotos reais ainda não existem, então cada peça mostra um
placeholder elegante que também marca visualmente onde a foto vai entrar.

## Brand & Colors

Paleta em `packages/web/src/web/styles.css` (CSS variables) e expostas ao Tailwind via `@theme inline`.

| Token | Valor | Uso |
|-------|-------|-----|
| `--background` / `bg-background` | `#0A0908` | Fundo da página (preto quente) |
| `--surface` / `bg-surface` | `#12100C` | Seções alternadas, cards |
| `--elevated` / `bg-elevated` | `#1A1712` | Cards de produto, modal, header |
| `--gold` / `text-gold` | `#C9A24A` | Acento principal: preços, filetes, CTAs |
| `--gold-soft` | `#EBD79A` | Brilho/gradiente, hover, destaques |
| `--gold-deep` | `#8A6A21` | Sombras do ouro, bordas discretas |
| `--foreground` | `#F7F2E8` | Texto principal (branco creme) |
| `--muted-foreground` | `#A79C88` | Texto secundário |
| `--border` | `rgba(201,162,74,0.18)` | Filetes dourados de 1px |
| `--rose` | `#D8A79C` | "Preço antigo"/etiquetas, uso raríssimo |
| `--whatsapp` | `#25D366` | Só o botão flutuante e o CTA do produto |

Regras: dourado é acento, nunca fundo de área grande. Blocos escuros usam gradiente radial sutil + textura de
grão (`.grain`) para não ficar chapado. Nada de branco puro em texto longo.

## Typography

- **Display:** `Cormorant Garamond` (serifada, 400–700) — títulos grandes, nome da loja, preços em destaque.
  Tracking levemente negativo em tamanhos grandes, `italic` para sussurros elegantes.
- **Body:** `Jost` (geométrica, 300–600) — textos, botões, etiquetas. 300 para parágrafos longos,
  500/600 para botões e nomes de peça, sempre com `letter-spacing` aberto em caixa-alta pequena.
- Hierarquia: eyebrow (11px, uppercase, tracking 0.24em, dourado) → h2 display 40–64px → lead 17px muted → corpo 15px.
- Fontes self-hosted em `packages/web/public/fonts/` (woff2 variável), declaradas no topo de `styles.css`.

## Layout

- Container `max-w-7xl` com respiro lateral de 20–28px; seções com 96–128px de padding vertical.
- Assimetria deliberada: hero em 7/5 colunas com a maleta invadindo a margem direita; catálogo em grid de
  3 colunas com o card "destaque" ocupando 2 colunas; seção "quem faz" com retrato deslocado.
- Sem "grade de cards arredondados genérica": cards de produto são retângulos secos com cantos de 2px,
  filete dourado e sombra interna — vitrine, não dashboard.
- Divisórias são filetes dourados de 1px com fade nas pontas, nunca bordas cinzas.

## Components

- **Header** (`components/site-header.tsx`) — fixo, translúcido com blur ao rolar, âncora das seções + CTA WhatsApp.
- **Hero / banner** (`components/hero.tsx` + `components/suitcase-art.tsx`) — banner full-bleed com a arte da
  maleta aberta com semijoias (placeholder rotulado "foto real entra aqui") e o título sobreposto.
- **Placeholder de joia** (`components/jewel-art.tsx`) — arte vetorial por categoria (anel, colar, brinco,
  pulseira, conjunto) desenhada à mão em traço dourado, usada em todo lugar onde faltar foto real.
- **Catálogo** (`components/catalog.tsx`, `product-card.tsx`) — filtros por categoria em pills + grid; card mostra
  nome, categoria, preço (e preço antigo riscado quando houver) e selo.
- **Modal da peça** (`components/product-modal.tsx`) — nome, preço, descrição, detalhes técnicos e o botão
  "Pedir no WhatsApp" com mensagem padrão já preenchida. Fecha com Esc, clique no scrim e botão X.
- **Como comprar / Garantias / Sobre a Eliane / Perguntas / Footer** — blocos de confiança, todos com CTA.
- **Botão flutuante do WhatsApp** (`components/whatsapp-fab.tsx`) — sempre visível, com mensagem padrão geral.

## Key User Flows

1. **Ver vitrine → abrir peça → pedir:** visitante abre a home → banner apresenta a loja → rola até o catálogo →
   filtra por categoria → clica numa peça → modal com nome, preço e detalhes → "Pedir no WhatsApp" abre
   `wa.me/5542988089633` com a mensagem "Olá, Eliane! Vi no site a peça *X* (R$ Y)...".
2. **Dúvida rápida:** qualquer CTA (header, hero, botão flutuante, rodapé) abre o WhatsApp com a mensagem geral.
3. **Filtro sem resultado:** o grid mostra estado vazio com atalho para voltar a "Todas".

## Architecture

- **API**: `packages/web/src/api/routes/catalog.ts` (oRPC) lê o catálogo tipado de
  `packages/web/src/api/catalog/products.ts` — `catalog.list` aceita `{ category }` e devolve categorias + peças.
- **Web**: hooks em `packages/web/src/web/queries/catalog.ts` (`useCatalog`), consumidos pela página e pelo grid.
  Skeleton de carregamento obrigatório antes do grid.
- **WhatsApp**: helper único em `packages/web/src/web/lib/whatsapp.ts` (número, mensagem padrão e mensagem por
  peça) — nenhum componente monta link `wa.me` na mão.
- **Estado**: seleção da peça e da categoria vivem na página (`useState`), sem estado global.
