import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { builtinModules } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "vite";

// Produce a self-contained ESM API, separate from the public Vite output.
// No frontend/dev plugins, images or listening server belong in the function.
const result = await build({
  configFile: false,
  root: fileURLToPath(new URL("../", import.meta.url)),
  logLevel: "warn",
  build: {
    ssr: fileURLToPath(new URL("../src/api/index.ts", import.meta.url)),
    target: "node22",
    write: false,
    copyPublicDir: false,
    rollupOptions: {
      output: { format: "es", inlineDynamicImports: true, entryFileNames: "index.mjs" },
    },
  },
  ssr: { noExternal: true },
});

if (Array.isArray(result) || !("output" in result)) {
  throw new Error("O build da API deve produzir um único módulo ESM.");
}
const chunks = result.output.filter((output) => output.type === "chunk");
const nodeImports = new Set(builtinModules.flatMap((name) => [name, `node:${name}`]));
if (chunks.length !== 1 || chunks[0].imports.some((name) => !nodeImports.has(name))) {
  throw new Error("A API serverless não pode depender de outros arquivos ou pacotes externos.");
}

const directory = new URL("../dist-api/", import.meta.url);
const destination = new URL("index.mjs", directory);
const temporary = new URL(`index.${process.pid}.tmp`, directory);
await mkdir(directory, { recursive: true });
try {
  await writeFile(temporary, chunks[0].code);
  // Frontend and function builders may both run vercel-build. Keep an existing
  // complete bundle available until its replacement has been fully written.
  await rename(temporary, destination);
} finally {
  await rm(temporary, { force: true });
}
console.log(`API serverless: dist-api/index.mjs (${Math.ceil(Buffer.byteLength(chunks[0].code) / 1024)} kB)`);
