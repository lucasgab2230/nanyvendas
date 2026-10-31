import { CollectionPage } from "../components/collection-page";
import { useVestuario } from "../queries/vestuario";

export default function ClothingPage() {
  const catalog = useVestuario();
  return (
    <CollectionPage
      kind="vestuario"
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
