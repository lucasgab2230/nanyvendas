import { ORPCError } from "@orpc/server";
import { normalizeSearch } from "../../shared/search";
import { z } from "zod";
import { base } from "../__core/app";
import { clothingCategories, clothingProducts } from "../catalog/clothing-products";

export const vestuario = {
  list: base
    .input(
      z
        .object({
          category: z.string().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .handler(({ input }) => {
      const category = input?.category;
      const search = normalizeSearch(input?.search ?? "");

      let list = clothingProducts;
      if (category && category !== "todas") {
        list = list.filter((p) => p.category === category);
      }
      if (search) {
        list = list.filter((p) => {
          const haystack = normalizeSearch(`${p.name} ${p.summary} ${p.description}`);
          return search.split(/\s+/).every((word) => haystack.includes(word));
        });
      }

      return {
        categories: clothingCategories,
        products: list,
        total: list.length,
        catalogTotal: clothingProducts.length,
        featured: clothingProducts.filter((p) => p.featured).slice(0, 3),
      };
    }),

  get: base.input(z.object({ slug: z.string() })).handler(({ input }) => {
    const product = clothingProducts.find((p) => p.slug === input.slug);
    if (!product) {
      throw new ORPCError("NOT_FOUND", {
        message: "Peça não encontrada no catálogo de vestuário.",
      });
    }
    return product;
  }),
};
