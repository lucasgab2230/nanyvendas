import { z } from "zod";
import { base } from "../__core/app";
import { categories, products, type CategorySlug } from "../catalog/products";

const categorySlugs = categories.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

/**
 * Catálogo da loja: categorias para os filtros e as peças com preço.
 * `category` vem como "todas" ou o slug de uma categoria.
 */
export const catalog = {
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

      let list = products;
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
        categories,
        products: list,
        total: list.length,
        featured: products.filter((p) => p.featured).slice(0, 3),
      };
    }),

  /** Peça isolada — usada quando a vitrine abre um produto direto pela URL. */
  get: base
    .input(z.object({ slug: z.string() }))
    .handler(({ input, errors }) => {
      const product = products.find((p) => p.slug === input.slug);
      if (!product) {
        throw errors.NOT_FOUND({ message: "Peça não encontrada no catálogo." });
      }
      return product;
    }),
};

export { categorySlugs };
