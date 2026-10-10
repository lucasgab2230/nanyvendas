# Nany Semijoias — site da loja

Site da Nany (Eliane), em Guarapuava — PR. A experiência destaca as semijoias fotografadas e direciona pedidos e dúvidas ao WhatsApp **+55 42 98808-9633**.

## Situação atual do catálogo

- **Semijoias:** 35 itens cadastrados com fotos reais na pasta `packages/web/public/images/images/`. Preços são mostrados quando legíveis na etiqueta; nos demais casos, a cliente consulta a Eliane. A foto do porta-joias aparece no banner e não é um produto.
- **Vestuário e lingerie:** as páginas estão ativas, mas os produtos de demonstração foram removidos porque não tinham fotos/preços confirmados. Cada página convida a cliente a pedir as opções atuais pelo WhatsApp. Cadastre itens reais em `packages/web/src/api/catalog/clothing-products.ts` e `lingerie-products.ts` quando houver informações aprovadas pela loja.
- Estoque, entrega, pagamento, composição, garantia e trocas não são prometidos pelo site; são confirmados para cada pedido com a loja.

## Comandos

- `pnpm run dev` — inicia o Vite na porta declarada em `__ports.cjs`.
- `pnpm run build` — build dos pacotes do monorepo.
- `pnpm run typecheck` — validação TypeScript do monorepo.
- `pnpm --filter @template/web build` — build e typecheck do pacote web.

## Onde atualizar

| O que | Arquivo |
|---|---|
| Semijoias, preços, descrições e caminhos das imagens | `packages/web/src/api/catalog/products.ts` |
| Fotos reais do catálogo | `packages/web/public/images/images/` |
| Foto do porta-joias no banner | `packages/web/src/web/components/hero.tsx` |
| Vestuário e lingerie (após confirmação dos dados) | `packages/web/src/api/catalog/clothing-products.ts` e `lingerie-products.ts` |
| Número, horários e mensagens do WhatsApp | `packages/web/src/web/lib/whatsapp.ts` |
| Texto das páginas, experiência e perguntas frequentes | `packages/web/src/web/pages/` e `packages/web/src/web/components/sections.tsx` |
| Cores, fontes e estilos | `packages/web/src/web/styles.css` + `design.md` |
| Rotas da prévia | `packages/web/public/manus-routes.json` |

## Fluxo de compra

1. A cliente abre uma semijoia e confere fotos, descrição e o preço, se legível.
2. O botão de pedido abre o WhatsApp com a peça identificada; quando o preço não está confirmado, a mensagem pede que a loja o informe.
3. A cliente confirma disponibilidade, dados do produto, pagamento e entrega diretamente com Eliane antes de concluir.
4. Para a primeira visita há um convite específico de boas-vindas; não há desconto, brinde ou outra condição comercial anunciada sem confirmação.

## Arquitetura

Monorepo com `packages/web` em React, Vite, Tailwind e API oRPC. `catalog.list` lê `packages/web/src/api/catalog/products.ts`; Vestuário e Lingerie usam rotas e tipos próprios (`api/routes/vestuario.ts`, `api/routes/lingerie.ts`). As consultas da interface ficam em `packages/web/src/web/queries/`. O pacote `mobile` é o cliente Expo e `desktop` o shell Electron.
