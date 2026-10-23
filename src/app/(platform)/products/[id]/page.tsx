import ProductDetailsScreen from "@/src/featurs/products/screens/ProductDetailsScreen";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ProductDetailsScreen id={id} />
    </>
  );
}
