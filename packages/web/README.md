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

A porta padrão é 4200; o servidor de produção aceita `PORT`. `start` e `preview` precisam do build e entregam **a interface e a API juntas** — não publique só o `dist/` sem o servidor.

Não são necessários banco, autenticação ou credenciais para o catálogo atual. As dependências são geridas pelo workspace e pelo lockfile **da raiz**, não por uma instalação independente nesta pasta.

- [Como rodar, testar e atualizar o catálogo](../../README.md)
- [Guia simples para usar a loja](../../GUIA_DA_LOJA.md)
- [Design e fluxos](../../design.md)
