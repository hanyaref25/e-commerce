import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import { Product } from "@/src/featurs/products/types/products.types";
import ProductCard from "@/src/featurs/products/components/ProductCard";

export default async function FeturedProducts() {
  let products: Product[] = [];

  try {
    const productsResponse = await getAllProducts();
    products = productsResponse?.data || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Featured <span className="text-primary-600">Products</span>
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Products</span>
            <IconArrowRight
              stroke={2}
              className="size-4.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products Grid (5 Columns on Large Screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
