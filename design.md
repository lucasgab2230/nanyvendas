# Nany Semijoias — Design

Landing page + catálogo de semijoias para a loja **Nany Semijoias** (dona: Eliane). Web (React/Vite), tema escuro
"joalheria": preto quente, dourado e uma serifada fina. O trabalho principal da página é levar a visitante do
brilho da vitrine até uma conversa no WhatsApp com o produto já identificado na mensagem.

Versão atual = **vitrine com fotos reais de semijoias** em `packages/web/public/images/images/`. O banner mostra a
foto do porta-joias (não é um produto). Preços ilegíveis ou ausentes devem ser consultados pelo WhatsApp. Vestuário
e lingerie permanecem sem itens publicados até que fotos e dados reais sejam confirmados.

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
- Assimetria deliberada: hero em 5/7 colunas com a foto da maleta invadindo a margem direita; catálogo em grid de
  3 colunas com o card "destaque" ocupando 2 colunas; apresentação da loja sem retrato de banco de imagens.
- Sem "grade de cards arredondados genérica": cards de produto são retângulos secos com cantos de 2px,
  filete dourado e sombra interna — vitrine, não dashboard.
- Divisórias são filetes dourados de 1px com fade nas pontas, nunca bordas cinzas.

## Components

- **Header** (`components/site-header.tsx`) — fixo, translúcido com blur ao rolar, âncora das seções + CTA WhatsApp.
- **Hero / banner** (`components/hero.tsx`) — banner com a foto real do porta-joias, título claro, atalho à vitrine
  e convite de primeiro contato.
- **Placeholder de joia** (`components/jewel-art.tsx`) — arte vetorial por categoria (anel, colar, brinco,
  pulseira, conjunto) desenhada à mão em traço dourado, usada em todo lugar onde faltar foto real.
- **Catálogo** (`components/catalog.tsx`, `product-card.tsx`) — filtros por categoria em pills + grid; card mostra
  nome, categoria, preço quando legível (ou consulta), descrição e selo. Disponibilidade é confirmada pela loja.
- **Modal da peça** (`components/product-modal.tsx`) — nome, preço, descrição, detalhes técnicos e o botão
  "Pedir no WhatsApp" com mensagem padrão já preenchida. Fecha com Esc, clique no scrim e botão X.
- **Primeira visita / Como comprar / Informações de compra / Sobre a Nany / Perguntas / Footer** — blocos acolhedores
  que deixam disponibilidade, entrega, pagamento e condições específicos para confirmação com Eliane.
- **Botão flutuante do WhatsApp** (`components/whatsapp-fab.tsx`) — sempre visível, com mensagem padrão geral.

## Key User Flows

1. **Primeira visita:** a cliente abre a home, vê o convite de boas-vindas, a foto real do porta-joias e as semijoias.
2. **Ver vitrine → abrir peça → pedir:** filtra por categoria, abre uma peça e envia pelo WhatsApp uma mensagem que
   identifica o item; se o preço não estiver disponível, a mensagem pede confirmação.
3. **Dúvida rápida:** os CTAs de contato levam ao WhatsApp; os atalhos de roupas/lingerie já preparam uma consulta
   sobre as opções atuais. Não são exibidos preços nem produtos de demonstração nessas categorias.
4. **Filtro sem resultado:** o grid informa a categoria vazia e permite voltar a "Todas".

## Architecture

- **API**: `packages/web/src/api/routes/catalog.ts` (oRPC) lê o catálogo tipado de
  `packages/web/src/api/catalog/products.ts` — `catalog.list` aceita `{ category }` e devolve categorias + peças.
  Rotas separadas para vestuário e lingerie não expõem produtos até haver fotos/preços confirmados.
- **Web**: hooks em `packages/web/src/web/queries/catalog.ts` (`useCatalog`), consumidos pela página e pelo grid.
  Skeleton de carregamento obrigatório antes do grid.
- **WhatsApp**: helper único em `packages/web/src/web/lib/whatsapp.ts` (número, mensagem padrão e mensagem por
  peça) — nenhum componente monta link `wa.me` na mão.
- **Estado**: seleção da peça e da categoria vivem na página (`useState`), sem estado global.
