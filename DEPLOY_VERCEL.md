# Publicar a Nany na Vercel

A vitrine precisa de **duas partes**: os arquivos da interface e a API que entrega o catálogo. Publicar somente `dist/` não é suficiente. Este repositório agora inclui uma função Node.js para `/api/*`, além do build estático do Vite.

Não são necessários banco, chaves de API ou variáveis de ambiente para o catálogo atual.

## Configuração recomendada

1. No projeto da Vercel, use o repositório com esta correção. Se o deploy de produção acompanha `main`, primeiro mescle a correção nessa branch; republicar um commit antigo não inclui os novos arquivos.
2. Em **Settings → Build and Deployment**, deixe **Root Directory** na raiz do repositório (`./`, campo vazio). Não selecione a pasta `dist`.
3. Use **Framework Preset: Vite** e **Node.js: 22.x**. Os comandos e a saída estão definidos no `vercel.json` da raiz:

   | Configuração | Valor |
   | --- | --- |
   | Install Command | `npx --yes pnpm@12.6.0 install --filter @template/web... --filter nanyvendas --frozen-lockfile` |
   | Build Command | `npx --yes pnpm@12.6.0 run build` |
   | Output Directory | `packages/web/dist` |

4. Remova configurações antigas que mandem executar `pnpm start`, `src/server.ts`, Bun ou servir apenas arquivos estáticos. Não é preciso manter um processo escutando uma porta na Vercel.
5. Faça um novo deploy do commit com a correção. Para descartar artefatos da configuração anterior, faça o primeiro **Redeploy sem reutilizar o Build Cache**.

O `vercel.json` versionado define o build, a função e os encaminhamentos. Não adicione um encaminhamento genérico de `/api/*` para `/index.html` no painel ou em outra configuração.

### Se o projeto já usa `packages/web` como Root Directory

Essa opção também é suportada: há um `packages/web/vercel.json` e uma entrada `packages/web/api/index.mjs` próprios. O comando de instalação e o comando de build são os mesmos da tabela; a **Output Directory é `dist`**.

Habilite **Include source files outside of the Root Directory in the Build Step** nas configurações da pasta raiz. O workspace, o lockfile e a configuração de portas ficam na raiz do monorepo e precisam estar disponíveis. Não crie um segundo lockfile nem instale este pacote como um projeto isolado.

Se houver dúvida, prefira a configuração recomendada na raiz do repositório.

## Conferir depois do deploy

Troque `https://sua-loja.vercel.app` pelo domínio publicado:

```bash
curl --fail https://sua-loja.vercel.app/api/health
# Deve responder: {"status":"ok"}
```

No navegador:

- Abra a página inicial: o catálogo deve carregar as **35 peças**.
- Abra `/lingerie` diretamente e atualize a página: a navegação deve funcionar sem 404 da hospedagem.
- Abra `/?peca=anel-dourado-largo`: os detalhes da peça devem aparecer.
- Teste uma busca, os filtros, a seleção e o botão de consulta pelo WhatsApp.
- `/api/nao-existe` deve retornar **404**, não a página inicial com status 200.

Para repetir os testes de navegador contra um deploy acessível, com Chromium instalado:

```bash
PLAYWRIGHT_BASE_URL=https://sua-loja.vercel.app pnpm test:e2e
```

Se a Vercel tiver proteção de acesso para previews, abra o deploy autorizado no navegador ou execute esses testes no domínio público. Não coloque tokens de acesso no código ou no repositório.

## Se ainda aparecer “vitrine indisponível”

| Sintoma | O que verificar |
| --- | --- |
| `/api/health` retorna HTML ou 404 | O deploy contém `api/index.mjs` e o `vercel.json` da Root Directory selecionada? A correção foi incluída no commit publicado? |
| `/api/health` retorna 500 | Confira o log da função `api/index` na Vercel e a versão Node.js 22.x. |
| `/api/health` funciona, mas o catálogo não | No painel Network do navegador, confira a resposta de `/api/rpc/catalog/list` e o log da função. |
| Build não encontra workspace, lockfile ou `__ports.cjs` | Use a raiz do repositório ou inclua os arquivos externos à Root Directory `packages/web`. |
| A página antiga continua aparecendo | Confira a branch/commit do deploy e faça um novo deploy sem o cache anterior. |

Para investigar a publicação real, compartilhe o domínio e o trecho do erro de build/função, sem segredos, ou conecte sua conta Vercel à Arena. Os testes locais não substituem a verificação do deploy na sua conta.

## Como funciona

- `packages/web/api/index.mjs` expõe os métodos HTTP no padrão Web (`Request`/`Response`), encaminhando as requisições para a aplicação Hono existente no runtime Node.js 22 da Vercel. Isso preserva os corpos JSON do oRPC sem depender dos helpers de body parsing de handlers Node legados.
- `api/index.mjs` delega para o mesmo handler quando a Root Directory é o repositório.
- Nenhuma dessas entradas chama `listen()` nem importa o servidor de execução contínua.
- As rotas de API vão para a função; o fallback de navegação vai para `index.html`, sem capturar a API ou arquivos com extensão inexistentes.
- O cliente continua usando `/api/rpc` no mesmo domínio. Não é necessário configurar outro backend nem uma URL `localhost`.
- `pnpm test` exercita ambas as entradas em HTTP real, incluindo POST com filtros, detalhes, erros e a configuração das duas pastas raiz.
- `pnpm typecheck` gera a API e verifica os tipos da aplicação, do servidor e das entradas serverless com JSDoc e `@ts-check`. `pnpm build` faz essa verificação e gera a interface.
- O bundle ESM em `packages/web/dist-api/index.mjs` é separado de `dist/`, não é publicado como arquivo estático e não deve ser versionado.
- O hook `vercel-build` gera esse módulo também no build isolado da função, independentemente da ordem em que a Vercel constrói a interface e a API.

Para hospedagem Node.js tradicional, `pnpm build && pnpm start` continua disponível.
