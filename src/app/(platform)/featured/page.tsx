import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import ProductCollectionScreen from "@/src/featurs/products/screens/ProductCollectionScreen";
import { Product } from "@/src/featurs/products/types/products.types";

export default async function FeaturedProductsPage() {
  let products: Product[] = [];

  try {
    const response = await getAllProducts({ sort: "-sold", limit: 20 });
    products = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load featured products:", error);
  }

  return (
    <ProductCollectionScreen
      eyebrow="Featured"
      title="Featured"
      accent="Products"
      description="The products our customers buy the most — the bestsellers across every category."
      products={products}
      emptyMessage="No featured products are available right now."
    />
  );
}
