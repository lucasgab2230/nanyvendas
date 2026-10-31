import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { fileURLToPath } from "node:url";
import app from "./api";
import ports from "../../../__ports.cjs";

// O mesmo servidor entrega a vitrine e a API. Não depende de Bun ou de um
// backend em localhost no navegador, inclusive na prévia e em produção.
const distDir = fileURLToPath(new URL("../dist", import.meta.url));
const port = Number(process.env.PORT ?? ports.website);

app.use(
  "*",
  serveStatic({
    root: distDir,
    onFound: (filePath, c) => {
      c.header("X-Content-Type-Options", "nosniff");
      c.header(
        "Cache-Control",
        filePath.includes("/assets/")
          ? "public, max-age=31536000, immutable"
          : filePath.endsWith(".html")
            ? "no-cache"
            : "public, max-age=3600",
      );
    },
  }),
);
app.get("*", async (c, next) => {
  // Arquivos ausentes e endpoints desconhecidos devem ser 404, nunca index.html.
  if (c.req.path === "/api" || c.req.path.startsWith("/api/") || /\.[^/]+$/.test(c.req.path))
    return next();
  return serveStatic({ path: `${distDir}/index.html` })(c, next);
});

const server = serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Nany disponível na porta ${info.port}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
