import { CollectionPage } from "../components/collection-page";
import { useLingerie } from "../queries/lingerie";

export default function LingeriePage() {
  const catalog = useLingerie();
  return (
    <CollectionPage
      kind="lingerie"
      products={catalog.data?.products}
      categories={catalog.data?.categories}
      isPending={catalog.isPending}
      isError={catalog.isError}
      retry={() => {
        void catalog.refetch();
      }}
    />
  );
}
