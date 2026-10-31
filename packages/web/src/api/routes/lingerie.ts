import { ORPCError } from "@orpc/server";
import { normalizeSearch } from "../../shared/search";
import { z } from "zod";
import { base } from "../__core/app";
import { lingerieCategories, lingerieProducts } from "../catalog/lingerie-products";

export const lingerie = {
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

      let list = lingerieProducts;
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
        categories: lingerieCategories,
        products: list,
        total: list.length,
        catalogTotal: lingerieProducts.length,
        featured: lingerieProducts.filter((p) => p.featured).slice(0, 3),
      };
    }),

  get: base.input(z.object({ slug: z.string() })).handler(({ input }) => {
    const product = lingerieProducts.find((p) => p.slug === input.slug);
    if (!product) {
      throw new ORPCError("NOT_FOUND", { message: "Peça não encontrada no catálogo de lingerie." });
    }
    return product;
  }),
};
