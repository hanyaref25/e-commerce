import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowRight,
  IconCategory,
  IconChevronRight,
  IconHome,
  IconPackage,
} from "@tabler/icons-react";
import getSpecificCategory from "../services/getSpecificCategory";
import { getSubcategories } from "../services/getSubcategories";
import { Category, Subcategory } from "../types/categories.types";
import ProductCard from "@/src/featurs/products/components/ProductCard";
import { Product } from "@/src/featurs/products/types/products.types";

interface CategoryDetailsScreenProps {
  id: string;
  products: Product[];
  productCount: number;
}

export default async function CategoryDetailsScreen({
  id,
  products,
  productCount,
}: CategoryDetailsScreenProps) {
  let category: Category | null = null;
  let subcategories: Subcategory[] = [];

  try {
    const response = await getSpecificCategory(id);
    category = response?.data ?? null;
  } catch (error) {
    console.error(`Failed to load category ${id}:`, error);
    notFound();
  }

  if (!category) {
    notFound();
  }

  const currentCategory: Category = category;

  try {
    const response = await getSubcategories(currentCategory._id);
    subcategories = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load subcategories:", error);
  }

  return (
    <div className="bg-gray-50/40 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                <IconHome stroke={1.8} className="size-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-primary-600 transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>
              <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
            </li>
            <li className="text-gray-900 font-semibold">
              {currentCategory.name}
            </li>
          </ol>
        </nav>

        {/* Category Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-primary-700" />

          <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Category Image */}
            <div className="shrink-0 size-32 sm:size-40 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-5 relative shadow-2xs">
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                priority
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain p-3"
              />
            </div>

            {/* Category Info */}
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                <IconCategory stroke={2} className="size-3.5" />
                Category
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2 mb-2">
                {currentCategory.name}
              </h1>

              <p className="text-sm text-gray-500 mb-5">
                Browse the{" "}
                <strong className="text-gray-800">{currentCategory.name}</strong>{" "}
                products or jump into a subcategory.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900 text-base">
                    {productCount}
                  </span>
                  <span>{productCount === 1 ? "Product" : "Products"}</span>
                </div>
                <span className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900 text-base">
                    {subcategories.length}
                  </span>
                  <span>
                    {subcategories.length === 1
                      ? "Subcategory"
                      : "Subcategories"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {currentCategory.name}{" "}
                  <span className="text-primary-600">Subcategories</span>
                </h2>
              </div>
              <Link
                href="/categories"
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1.5 transition-colors group"
              >
                <span>All Categories</span>
                <IconArrowRight
                  stroke={2}
                  className="size-4.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory._id}
                  href={`/subcategories/${subcategory._id}`}
                  className="group bg-white border border-gray-100 rounded-xl p-4 shadow-2xs flex items-center gap-3 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
                >
                  <span className="size-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <IconCategory stroke={1.8} className="size-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {subcategory.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-mono line-clamp-1">
                      /{subcategory.slug}
                    </p>
                  </div>
                  <IconChevronRight
                    stroke={2}
                    className="size-4 text-gray-300 group-hover:text-primary-600 transition-colors shrink-0"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {currentCategory.name}{" "}
                <span className="text-primary-600">Products</span>
              </h2>
            </div>
            <span className="text-sm text-gray-500 font-medium">
              {productCount} {productCount === 1 ? "product" : "products"}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
              <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
                <IconPackage stroke={1.5} className="size-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No products found
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                This category has no products yet.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                <span>Browse Categories</span>
                <IconArrowRight stroke={2} className="size-4.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
