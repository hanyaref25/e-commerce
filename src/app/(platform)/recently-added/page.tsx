import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import ProductCollectionScreen from "@/src/featurs/products/screens/ProductCollectionScreen";
import { Product } from "@/src/featurs/products/types/products.types";

export default async function RecentlyAddedPage() {
  let products: Product[] = [];

  try {
    const response = await getAllProducts({ sort: "-createdAt", limit: 20 });
    products = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load recently added products:", error);
  }

  return (
    <ProductCollectionScreen
      eyebrow="New in"
      title="Recently"
      accent="Added"
      description="The latest products to land in the store, newest first."
      products={products}
      emptyMessage="No new products have been added yet."
    />
  );
}
