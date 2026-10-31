# Nany — semijoias, vestuário e lingerie

Vitrine da Eliane, em Guarapuava — PR. Fotos reais, navegação pensada para celular e pedidos pelo WhatsApp **+55 42 98808-9633**. Não é um checkout on-line: preço final, disponibilidade, pagamento e entrega são combinados com a loja.

## Rodar o site

Requisitos: **Node.js 22.22 ou superior compatível** e **pnpm 12.6.0**. Se não tiver pnpm instalado, use `npx --yes pnpm@12.6.0` no lugar de `pnpm` nos comandos abaixo.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

A prévia abre na porta **4200**, definida em `__ports.cjs`. O servidor aceita acesso pela rede e pelo host de prévia. Não é necessário configurar banco, login, chave de pagamento ou arquivo `.env` para usar o catálogo.

### Versão de produção

```bash
pnpm build
pnpm start
```

`pnpm start` e `pnpm preview` servem o build **e a API juntos**, com Node.js, sem depender do Vite de desenvolvimento ou do Bun. Execute o build antes. `PORT=8080 pnpm start` altera somente a porta do servidor de produção. Para encerrar o processo em primeiro plano, use `Ctrl+C`.

Opcionalmente, após o build, `pnpm exec pm2 start ecosystem.config.cjs` inicia o mesmo servidor com PM2. A configuração carrega o `.env` da raiz caso exista.

> Hospede em um serviço que execute Node.js e encaminhe as rotas `/api/*` para o mesmo processo. Publicar apenas a pasta `dist/` em hospedagem estática não disponibiliza a API.

## O que funciona

- Catálogo com **35 semijoias reais**, sem produtos fictícios.
- Busca por nome, cor e detalhes, aceitando palavras com ou sem acentos.
- Categorias com peças cadastradas, filtros de preço e ordenação. Valores sob consulta ficam ao final das ordenações por preço.
- Filtros preservados na URL; carregamento progressivo de 12 peças por vez.
- Detalhes com foto completa, ampliação, preço, descrição e pedido individual pelo WhatsApp.
- Links diretos `/?peca=slug-da-peca`, compartilhamento nativo, cópia de link ou alternativa manual.
- Seleção pelo coração, persistida neste navegador quando o armazenamento está disponível; envio das peças em uma única mensagem, com subtotal dos preços informados e itens sob consulta separados.
- Recuperação de falhas da API, fotos com fallback, página não encontrada e proteção contra erros da interface.
- Menu móvel, perguntas frequentes, diálogos com Escape, foco contido e retorno ao botão que abriu a janela.

A seleção **não reserva peças**, não cria pedido no servidor e não acompanha estoque. Apenas IDs são guardados no navegador; os dados exibidos vêm do catálogo atual. Em modo privado ou com armazenamento bloqueado, a seleção funciona durante a visita, mas pode não persistir.

## Catálogo e atualização

| O que atualizar                                     | Onde                                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------- |
| Semijoias, preços, descrições e imagens             | `packages/web/src/api/catalog/products.ts`                                   |
| Fotos originais, preservadas                        | `packages/web/public/images/images/`                                         |
| Versões WebP responsivas                            | `packages/web/public/images/optimized/`                                      |
| Vestuário e lingerie, quando houver dados aprovados | `packages/web/src/api/catalog/clothing-products.ts` e `lingerie-products.ts` |
| Contato, horários e mensagens                       | `packages/web/src/web/lib/whatsapp.ts`                                       |
| Cores, fontes e estilos por componente              | `packages/web/src/web/styles/`                                               |
| Fluxos e conteúdo das páginas                       | `packages/web/src/web/components/` e `pages/`                                |

Preços ilegíveis nas fotos permanecem `null`, exibidos como **Preço sob consulta**. A maleta rosa é uma foto de apresentação, não um produto. Vestuário e lingerie têm páginas próprias e consulta pelo WhatsApp; não há itens de demonstração publicados.

Após incluir ou trocar fotos JPG na pasta original, execute:

```bash
pnpm images:optimize
pnpm test
pnpm build
```

O gerador preserva os originais e produz imagens quadradas de 480, 960 e 1600 px, sem recortar a peça e com orientação corrigida. As miniaturas do acervo atual somam aproximadamente **0,7 MB**, contra **43,5 MB** das fotos originais canônicas. Fotos novas fora do padrão de nomes atual continuam funcionando pelo caminho original; atualize o helper `optimizedImage` para habilitar as variantes nesses novos nomes.

## Verificações

```bash
pnpm typecheck       # verifica de verdade os projetos TS de aplicação e servidor
pnpm test            # catálogo, arquivos de imagens, filtros, seleção, WhatsApp e API HTTP
pnpm build           # typecheck + build de produção
```

Testes de navegador, com Playwright e axe, em computador e celular:

```bash
pnpm --filter @template/web exec playwright install --with-deps chromium
pnpm test:e2e
```

Os testes cobrem busca, preços, seleção persistente, teclado, compartilhamento, falhas de rede/fotos, navegação, tamanhos de tela e auditoria automática WCAG A/AA. Artefatos vão para `.cache/`, fora do Git. A auditoria automática complementa, mas não substitui, testes manuais com pessoas e tecnologias assistivas.

Para testar uma instância já iniciada: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4201 pnpm test:e2e`. Um Chromium próprio pode ser indicado por `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

O lint herdado do template requer Bun: `bun run lint` (ou `npx --yes bun run lint`). O site, os testes unitários e o servidor de produção usam Node.js.

## Arquitetura e escopo

Workspace único com React 19, Vite, Tailwind, TanStack Query e API Hono/oRPC. A mesma consulta é compartilhada pela vitrine, pelos detalhes e pela seleção; os filtros não fazem novas requisições. Um único lockfile na raiz mantém as dependências do monorepo.

Os comandos padrão priorizam a **vitrine web**. Os clientes Expo e Electron foram preservados, mas não são o foco desta revisão. Os comandos abrangentes continuam disponíveis em `pnpm build:all` e `pnpm typecheck:all`; executar o cliente desktop exige instalar o binário do Electron separadamente.

Veja também [o guia simples de uso da loja](GUIA_DA_LOJA.md) e [as decisões de design](design.md).
