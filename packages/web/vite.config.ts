import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import runableAnalyticsPlugin from "./vite/__plugins/runable-analytics-plugin";
import honoDevPlugin from "./vite/__plugins/hono-dev-plugin";
import assetOptimizerPlugin from "./vite/__plugins/asset-optimizer-plugin";
import ports from "../../__ports.cjs";

const root = path.resolve(__dirname, "../..");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  Object.assign(process.env, env);

  return {
    // All env files live at the repo root — keep Vite's own env loading there too,
    // so packages/web/.env* files can never shadow the root .env.
    envDir: root,
    plugins: [
      honoDevPlugin(),
      react(),
      runableAnalyticsPlugin(),
      {
        name: "quiet-local-analytics",
        transformIndexHtml: {
          order: "post",
          // Keep analytics, but never cover the storefront with its local debug widget.
          handler: (html) => html.replace(/\sdata-debug="localhost"/g, ""),
        },
      },
      tailwind(),
      assetOptimizerPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/web"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: ports.website,
      strictPort: true,
      allowedHosts: true,
      hmr: { overlay: true },
      cors: false,
    },
  };
});
