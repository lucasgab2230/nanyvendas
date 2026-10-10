import { z } from "zod";
import { base } from "../__core/app";
import { lingerieCategories, lingerieProducts, type LingerieCategorySlug } from "../catalog/lingerie-products";

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
      const search = input?.search?.trim().toLowerCase() ?? "";

      let list = lingerieProducts as any[];
      if (category && category !== "todas") {
        list = list.filter((p) => p.category === category);
      }
      if (search) {
        list = list.filter((p) => {
          const haystack = `${p.name} ${p.summary} ${p.description}`.toLowerCase();
          return haystack.includes(search);
        });
      }

      return {
        categories: lingerieCategories as any[],
        products: list,
        total: list.length,
        catalogTotal: lingerieProducts.length,
        featured: lingerieProducts.filter((p: any) => p.featured).slice(0, 3),
      };
    }),

  get: base
    .input(z.object({ slug: z.string() }))
    .handler(({ input, errors }) => {
      const product = lingerieProducts.find((p) => p.slug === input.slug);
      if (!product) {
        throw errors.NOT_FOUND({ message: "Peça não encontrada no catálogo de lingerie." });
      }
      return product;
    }),
};
