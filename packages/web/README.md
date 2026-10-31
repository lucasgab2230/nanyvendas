# Vitrine web da Nany

React + Vite + Tailwind, API Hono/oRPC e servidor de produção Node.js. Todos os comandos podem ser executados da raiz do monorepo:

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

A porta padrão é 4200; o servidor de produção aceita `PORT`. `start` e `preview` precisam do build e entregam **a interface e a API juntas** — não publique só o `dist/` sem o servidor ou a função de API.

Na **Vercel**, a API é atendida pela função `api/index.mjs`; não use `pnpm start`. O `vercel.json` nesta pasta permite usar `packages/web` como Root Directory, com saída em `dist`. Inclua os arquivos externos à Root Directory para disponibilizar o workspace e o lockfile da raiz. Também é possível publicar pela raiz do repositório, que tem sua própria configuração. Veja o [passo a passo de deploy na Vercel](../../DEPLOY_VERCEL.md).

Não são necessários banco, autenticação ou credenciais para o catálogo atual. As dependências são geridas pelo workspace e pelo lockfile **da raiz**, não por uma instalação independente nesta pasta.

- [Como rodar, testar e atualizar o catálogo](../../README.md)
- [Guia simples para usar a loja](../../GUIA_DA_LOJA.md)
- [Design e fluxos](../../design.md)
