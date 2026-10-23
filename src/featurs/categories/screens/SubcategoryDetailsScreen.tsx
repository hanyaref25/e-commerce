import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowRight,
  IconCategory,
  IconChevronRight,
  IconHome,
  IconPackage,
} from "@tabler/icons-react";
import getSpecificSubcategory from "../services/getSpecificSubcategory";
import getSpecificCategory from "../services/getSpecificCategory";
import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import { Category, Subcategory } from "../types/categories.types";
import { Product } from "@/src/featurs/products/types/products.types";
import ProductCard from "@/src/featurs/products/components/ProductCard";

interface SubcategoryDetailsScreenProps {
  id: string;
}

export default async function SubcategoryDetailsScreen({
  id,
}: SubcategoryDetailsScreenProps) {
  let subcategory: Subcategory | null = null;

  try {
    const response = await getSpecificSubcategory(id);
    subcategory = response?.data ?? null;
  } catch (error) {
    console.error(`Failed to load subcategory ${id}:`, error);
    notFound();
  }

  if (!subcategory) {
    notFound();
  }

  const currentSubcategory: Subcategory = subcategory;

  let category: Category | null = null;

  try {
    const response = await getSpecificCategory(currentSubcategory.category);
    category = response?.data ?? null;
  } catch (error) {
    console.error("Failed to load the parent category:", error);
  }

  let products: Product[] = [];
  let productCount = 0;

  try {
    const response = await getAllProducts({
      subcategory: currentSubcategory._id,
      limit: 40,
    });
    products = response?.data ?? [];
    productCount = response?.results ?? products.length;
  } catch (error) {
    console.error("Failed to load subcategory products:", error);
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
                href="/subcategories"
                className="hover:text-primary-600 transition-colors"
              >
                Subcategories
              </Link>
            </li>
            {category && (
              <>
                <li>
                  <IconChevronRight
                    stroke={2}
                    className="size-3.5 text-gray-400"
                  />
                </li>
                <li>
                  <Link
                    href={`/category/${category._id}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li>
              <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
            </li>
            <li className="text-gray-900 font-semibold">
              {currentSubcategory.name}
            </li>
          </ol>
        </nav>

        {/* Subcategory Hero */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-primary-700" />

          <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="shrink-0 size-28 sm:size-32 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center shadow-2xs">
              <IconCategory stroke={1.5} className="size-12" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                <IconCategory stroke={2} className="size-3.5" />
                Subcategory
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2 mb-2">
                {currentSubcategory.name}
              </h1>

              <p className="text-sm text-gray-500 mb-5">
                {category ? (
                  <>
                    Part of{" "}
                    <Link
                      href={`/category/${category._id}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      {category.name}
                    </Link>
                    .
                  </>
                ) : (
                  "Browse the products in this subcategory."
                )}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900 text-base">
                    {productCount}
                  </span>
                  <span>{productCount === 1 ? "Product" : "Products"}</span>
                </div>
                <span className="w-px h-4 bg-gray-200" />
                <span className="text-xs font-mono text-gray-400">
                  /{currentSubcategory.slug}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {currentSubcategory.name}{" "}
                <span className="text-primary-600">Products</span>
              </h2>
            </div>

            {category && (
              <Link
                href={`/category/${category._id}`}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1.5 transition-colors group"
              >
                <span>All {category.name}</span>
                <IconArrowRight
                  stroke={2}
                  className="size-4.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            )}
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
                Nothing in &ldquo;{currentSubcategory.name}&rdquo; yet.
              </p>
              {category && (
                <Link
                  href={`/category/${category._id}`}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  <span>Browse {category.name}</span>
                  <IconArrowRight stroke={2} className="size-4.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
