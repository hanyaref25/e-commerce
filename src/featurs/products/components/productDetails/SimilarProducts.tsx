import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import { Product } from "@/src/featurs/products/types/products.types";
import { SingleProduct } from "../../types/productDetails.types";
import ProductCard from "../ProductCard";

interface SimilarProductsProps {
  currentProduct: SingleProduct;
}

export default async function SimilarProducts({ currentProduct }: SimilarProductsProps) {
  let allProducts: Product[] = [];

  try {
    const response = await getAllProducts();
    allProducts = response?.data || [];
  } catch (error) {
    console.error("Failed to load similar products:", error);
  }

  const currentCategoryId = currentProduct.category?._id;
  const currentId = currentProduct._id;

  const sameCategoryProducts = allProducts.filter(
    (p) => p._id !== currentId && p.category?._id === currentCategoryId
  );

  const otherProducts = allProducts.filter(
    (p) => p._id !== currentId && p.category?._id !== currentCategoryId
  );

  const similarList = [...sameCategoryProducts, ...otherProducts].slice(0, 5);

  if (similarList.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            You May Also <span className="text-primary-600">Like</span>
          </h2>
        </div>

        <Link
          href={`/shop`}
          className="text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base flex items-center gap-1.5 transition-colors group"
        >
          <span>View More</span>
          <IconArrowRight
            stroke={2}
            className="size-4.5 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {similarList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
