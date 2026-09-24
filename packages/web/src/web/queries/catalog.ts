import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

// Hooks do catálogo — o grid e a home nunca chamam `orpc.*` direto.
export function useCatalog(category?: string) {
  return useQuery(
    orpc.catalog.list.queryOptions({
      input: { category },
      staleTime: 5 * 60_000,
    }),
  );
}
