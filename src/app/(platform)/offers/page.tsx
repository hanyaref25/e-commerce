import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import ProductCollectionScreen from "@/src/featurs/products/screens/ProductCollectionScreen";
import { Product } from "@/src/featurs/products/types/products.types";

// Biggest discount first (percentage, not amount).
const discountPercentage = (product: Product) => {
  if (
    !product.priceAfterDiscount ||
    product.priceAfterDiscount >= product.price
  ) {
    return 0;
  }

  return ((product.price - product.priceAfterDiscount) / product.price) * 100;
};

export default async function OffersPage() {
  let products: Product[] = [];

  try {
    const response = await getAllProducts({
      filter: { "priceAfterDiscount[gt]": 0 },
      limit: 50,
    });
    products = [...(response?.data ?? [])].sort(
      (a, b) => discountPercentage(b) - discountPercentage(a)
    );
  } catch (error) {
    console.error("Failed to load offers:", error);
  }

  return (
    <ProductCollectionScreen
      eyebrow="Deals"
      title="Current"
      accent="Offers"
      description="Limited-time deals — every product below has a reduced price, sorted by the biggest saving."
      products={products}
      emptyMessage="There are no active offers at the moment."
    />
  );
}
