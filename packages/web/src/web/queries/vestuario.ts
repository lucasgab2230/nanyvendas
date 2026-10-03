import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useVestuario(category?: string) {
  return useQuery(
    orpc.vestuario.list.queryOptions({
      input: { category },
      staleTime: 5 * 60_000,
    }),
  );
}
