import SubcategoryDetailsScreen from "@/src/featurs/categories/screens/SubcategoryDetailsScreen";

interface SubcategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { id } = await params;

  return <SubcategoryDetailsScreen id={id} />;
}
