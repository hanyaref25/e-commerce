import BrandDetailsScreen from "@/src/featurs/brands/screens/BrandDetailsScreen";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BrandPage({ params }: Props) {
  const { id } = await params;
  return <BrandDetailsScreen id={id} />;
}
