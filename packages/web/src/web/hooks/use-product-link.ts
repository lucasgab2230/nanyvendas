import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../api/catalog/products";

const readSlug = () => new URLSearchParams(window.location.search).get("peca");

export function useProductLink() {
  const [slug, setSlug] = useState(readSlug);
  useEffect(() => {
    const onPop = () => setSlug(readSlug());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const open = useCallback((product: Product) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("peca") !== product.slug) {
      url.searchParams.set("peca", product.slug);
      window.history.pushState(window.history.state, "", url);
    }
    setSlug(product.slug);
  }, []);
  const close = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("peca");
    window.history.replaceState(window.history.state, "", url);
    setSlug(null);
  }, []);
  return { slug, open, close };
}
