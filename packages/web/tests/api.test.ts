import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import app from "../src/api";
import type { AppRouterClient } from "../src/api";

// Exercita a montagem HTTP real e a serialização oRPC, sem banco ou rede externa.
const client: AppRouterClient = createORPCClient(
  new RPCLink({
    url: "http://nany.test/api/rpc",
    fetch: (request) => app.fetch(request),
  }),
);

describe("API pública", () => {
  it("responde à verificação de saúde", async () => {
    const response = await app.request("/api/health");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  });

  it("entrega o catálogo completo pelo cliente HTTP", async () => {
    const result = await client.catalog.list();
    assert.equal(result.total, 35);
    assert.equal(result.products.length, 35);
    assert.ok(result.featured.length > 0);
  });

  it("busca sem acentos na API e combina categoria", async () => {
    const result = await client.catalog.list({ category: "brincos", search: "CORACAO CANELADO" });
    assert.deepEqual(
      result.products.map((product) => product.slug),
      ["brinco-coracao-canelado"],
    );
  });

  it("entrega um produto pelo slug", async () => {
    const result = await client.catalog.get({ slug: "anel-dourado-largo" });
    assert.equal(result.price, 79.9);
  });

  it("produto inexistente retorna NOT_FOUND, não erro interno", async () => {
    for (const get of [client.catalog.get, client.vestuario.get, client.lingerie.get]) {
      await assert.rejects(
        () => get({ slug: "nao-existe" }),
        (error: unknown) => {
          assert.ok(error instanceof Error && "code" in error);
          assert.equal(error.code, "NOT_FOUND");
          return true;
        },
      );
    }
  });

  it("não publica itens fictícios de vestuário ou lingerie", async () => {
    for (const result of [await client.vestuario.list(), await client.lingerie.list()]) {
      assert.equal(result.catalogTotal, 0);
      assert.deepEqual(result.products, []);
    }
  });
});
