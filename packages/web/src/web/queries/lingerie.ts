import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useLingerie(category: string = "todas") {
  return useQuery(orpc.lingerie.list.queryOptions({ input: { category }, staleTime: 5 * 60_000 }));
}

export function useLingerieProduct(slug: string) {
  return useQuery(orpc.lingerie.get.queryOptions({ input: { slug }, staleTime: 5 * 60_000 }));
}
