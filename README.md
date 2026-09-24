# Nany Semijoias — site da loja

Landing page + catálogo de semijoias (tema escuro dourado) com pedido pelo WhatsApp.
Dona da loja: Eliane. Número de atendimento: **+55 42 98808-9633**.

Esta é a versão de **apresentação**: as fotos reais ainda não estão no site, então cada peça e o banner
mostram uma arte dourada temporária marcada como espaço da foto.

## Comandos

- `bun run dev` — sobe o site (porta fixa em `__ports.cjs`).
- `bun run build` — build de produção de todos os pacotes.
- `bun run lint` e `bun run typecheck` — validação do projeto.

## Onde mexer depois

| O que | Arquivo |
|-------|---------|
| Peças, preços, descrições, selos | `packages/web/src/api/catalog/products.ts` |
| Categorias do filtro | `packages/web/src/api/catalog/products.ts` (`categories`) |
| Número do WhatsApp, mensagem padrão, e-mail/horário da loja | `packages/web/src/web/lib/whatsapp.ts` (`STORE`) |
| Banner da maleta (a arte que ocupa o lugar da foto) | `packages/web/src/web/components/suitcase-art.tsx` |
| Arte dourada das peças | `packages/web/src/web/components/jewel-art.tsx` |
| Cores, fontes e estilos | `packages/web/src/web/styles.css` + `design.md` |

## Colocar as fotos reais

1. Salve a foto em `packages/web/public/images/` (ex.: `maleta.jpg`, `anel-luna.jpg`). Fotos quadradas de
   preferência, 1200 × 1200.
2. No banner: troque o `<SuitcaseArt />` em `packages/web/src/web/components/hero.tsx` por
   `<img src="/images/maleta.jpg" alt="Maleta da Nany Semijoias" className="w-full object-cover" />`.
3. Nas peças: em `packages/web/src/api/catalog/products.ts`, preencha o campo `image` da peça com o caminho
   (`image: "/images/anel-luna.jpg"`). Enquanto estiver `null`, o site desenha a arte dourada da categoria.

A mensagem do WhatsApp já vai preenchida com o nome e o preço da peça:
*"Olá, Eliane! Vi no site a peça \*Anel Solitário Luna\* (R$ 149,90) e gostaria de saber se ela está disponível."*

## Arquitetura

Monorepo (Bun + Turborepo). O pacote `packages/web` tem o site (React + Vite + Tailwind) e a API (oRPC)
no mesmo serviço, na porta de `__ports.cjs`; o endpoint de saúde é `/api/health`. O catálogo é servido por
`catalog.list` (`packages/web/src/api/routes/catalog.ts`) e consumido pelo hook `useCatalog`
(`packages/web/src/web/queries/catalog.ts`). O pacote `mobile` é o cliente Expo e `desktop` o shell Electron
— nenhum dos dois foi tocado neste trabalho.
