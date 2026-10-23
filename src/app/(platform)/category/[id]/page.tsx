import CategoryDetailsScreen from "@/src/featurs/categories/screens/CategoryDetailsScreen";
import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import { Product } from "@/src/featurs/products/types/products.types";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  let products: Product[] = [];
  let productCount = 0;

  try {
    const response = await getAllProducts({ category: id, limit: 40 });
    products = response?.data ?? [];
    productCount = response?.results ?? products.length;
  } catch (error) {
    console.error("Failed to load category products:", error);
  }

  return (
    <CategoryDetailsScreen
      id={id}
      products={products}
      productCount={productCount}
    />
  );
}
