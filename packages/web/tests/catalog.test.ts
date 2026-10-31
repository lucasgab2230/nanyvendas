import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { products, categories } from "../src/api/catalog/products";
import {
  defaultFilters,
  filterProducts,
  normalizeSearch,
  optimizedImage,
} from "../src/web/lib/catalog";
import type { PriceFilter } from "../src/web/lib/catalog";
import { readSelection, selectionSummary } from "../src/web/lib/selection";
import {
  DEFAULT_MESSAGE,
  STORE,
  formatPrice,
  productMessage,
  productWhatsappLink,
  selectionMessage,
  selectionWhatsappLink,
} from "../src/web/lib/whatsapp";

const publicDir = new URL("../public/", import.meta.url);

describe("catálogo real", () => {
  it("mantém 35 produtos únicos, com categoria e preço válido ou sob consulta", () => {
    assert.equal(products.length, 35);
    for (const field of ["id", "slug", "image"] as const) {
      assert.equal(new Set(products.map((product) => product[field])).size, products.length);
    }
    for (const product of products) {
      assert.ok(categories.some((category) => category.slug === product.category));
      assert.ok(product.price === null || (Number.isFinite(product.price) && product.price > 0));
      assert.ok(!product.image?.includes("192042"), "O porta-joias não é um produto");
    }
  });

  it("todas as fotos e suas três variantes otimizadas existem", async () => {
    for (const product of products) {
      assert.ok(product.image);
      for (const image of [
        product.image,
        ...([480, 960, 1600] as const).map((width) => optimizedImage(product.image!, width)),
      ]) {
        assert.ok((await stat(fileURLToPath(new URL(image.slice(1), publicDir)))).size > 0, image);
      }
    }
  });

  it("mantém URLs externas e fotos novas sem variantes intactas", () => {
    assert.equal(optimizedImage("https://example.test/nova.jpg"), "https://example.test/nova.jpg");
    assert.equal(optimizedImage("/images/nova.jpg"), "/images/nova.jpg");
  });
});

describe("busca, filtros e ordenação", () => {
  it("normaliza acentos, maiúsculas e espaços", () => {
    assert.equal(normalizeSearch("  CORAÇÃO Nó PRATEADO  "), "coracao no prateado");
    const result = filterProducts(products, { ...defaultFilters, search: "coracao" });
    assert.ok(result.length > 0);
    assert.ok(
      result.every((product) =>
        normalizeSearch(
          [product.name, product.summary, product.description, ...product.highlights].join(" "),
        ).includes("coracao"),
      ),
    );
  });

  it("combina várias palavras, categoria e preço", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      search: "anel PRATEADO",
      category: "aneis",
      price: "50a80",
    });
    assert.deepEqual(
      result.map((product) => product.slug),
      ["anel-prateado-com-pedras"],
    );
  });

  it("não altera a ordem do catálogo original", () => {
    const ids = products.map((product) => product.id);
    filterProducts(products, { ...defaultFilters, sort: "maior" });
    assert.deepEqual(
      products.map((product) => product.id),
      ids,
    );
  });

  for (const sort of ["menor", "maior"] as const) {
    it(`${sort}: deixa preços sob consulta ao final`, () => {
      const result = filterProducts(products, { ...defaultFilters, sort });
      const firstUnknown = result.findIndex((product) => product.price === null);
      assert.ok(firstUnknown > 0);
      assert.ok(result.slice(firstUnknown).every((product) => product.price === null));
      const prices = result.slice(0, firstUnknown).map((product) => product.price!);
      assert.deepEqual(
        prices,
        [...prices].sort((a, b) => (sort === "menor" ? a - b : b - a)),
      );
    });
  }

  it("respeita as faixas, incluindo limites e preço ausente", () => {
    const sample = [null, 49.9, 50, 50.01, 80, 80.01].map((price, index) => ({
      ...products[0]!,
      id: index,
      price,
    }));
    const expected: Record<PriceFilter, (number | null)[]> = {
      todos: [null, 49.9, 50, 50.01, 80, 80.01],
      ate50: [49.9, 50],
      "50a80": [50.01, 80],
      acima80: [80.01],
      consultar: [null],
    };
    for (const price of Object.keys(expected) as PriceFilter[]) {
      assert.deepEqual(
        filterProducts(sample, { ...defaultFilters, price }).map((product) => product.price),
        expected[price],
      );
    }
  });

  it("retorna vazio para uma busca sem correspondência", () => {
    assert.deepEqual(
      filterProducts(products, { ...defaultFilters, search: "nenhuma-peca-assim" }),
      [],
    );
  });
});

describe("seleção e mensagens de compra", () => {
  it("recupera somente IDs positivos únicos, tolerando armazenamento inválido", () => {
    assert.deepEqual(readSelection('[1, 1, 2, "3", null, -1, 0, {}, 1.2]'), [1, 2]);
    for (const input of [null, "{", '"string"', "null", "{}"] as const)
      assert.deepEqual(readSelection(input), []);
    assert.equal(
      readSelection(JSON.stringify(Array.from({ length: 150 }, (_, index) => index + 1))).length,
      100,
    );
  });

  it("soma em centavos e não trata preços ausentes como produtos grátis", () => {
    assert.deepEqual(selectionSummary([{ price: 0.1 }, { price: 0.2 }, { price: null }]), {
      subtotal: 0.3,
      unknownPrices: 1,
    });
  });

  it("formata reais em português", () => {
    assert.match(formatPrice(79.9).replace(/\s/g, " "), /^R\$ 79,90$/);
  });

  it("pedido individual identifica a peça e consulta o preço quando ausente", () => {
    const product = products[0]!;
    const url = new URL(productWhatsappLink(product));
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, `/${STORE.whatsapp}`);
    assert.equal(url.searchParams.get("text"), productMessage(product));
    assert.match(url.searchParams.get("text")!, /gostaria de saber o preço/);
    assert.ok(url.searchParams.get("text")!.includes(product.slug));
  });

  it("mensagem da seleção reúne as peças e separa valores sob consulta", () => {
    const chosen = [products[0]!, products.find((product) => product.id === 16)!];
    const message = selectionMessage(chosen);
    assert.ok(
      chosen.every((product) => message.includes(product.name) && message.includes(product.slug)),
    );
    assert.match(message, /Subtotal dos preços informados: R\$\s79,90 \+ 1 peça sob consulta/);
    assert.match(message, /confirmar os valores, a disponibilidade/);
    assert.equal(new URL(selectionWhatsappLink(chosen)).searchParams.get("text"), message);
    assert.equal(selectionMessage([]), DEFAULT_MESSAGE);
  });
});
