import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

/** Uma única consulta é compartilhada pelo catálogo, detalhes e seleção. */
export function useCatalog() {
  return useQuery(
    orpc.catalog.list.queryOptions({
      input: { category: "todas" },
      staleTime: 5 * 60_000,
    }),
  );
}
