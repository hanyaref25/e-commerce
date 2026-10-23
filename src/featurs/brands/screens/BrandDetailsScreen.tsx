import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowRight,
  IconBuildingStore,
  IconChevronRight,
  IconHome,
} from "@tabler/icons-react";
import getSpecificBrand from "../services/getSpecificBrand";
import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import { Product } from "@/src/featurs/products/types/products.types";
import ProductCard from "@/src/featurs/products/components/ProductCard";

interface BrandDetailsScreenProps {
  id: string;
}

export default async function BrandDetailsScreen({
  id,
}: BrandDetailsScreenProps) {
  let brand = null;
  let brandProducts: Product[] = [];

  try {
    const brandResponse = await getSpecificBrand(id);
    brand = brandResponse?.data;
  } catch {
    notFound();
  }

  if (!brand) {
    notFound();
  }

  try {
    const productsResponse = await getAllProducts();
    const allProducts = productsResponse?.data || [];
    brandProducts = allProducts.filter(
      (p) => p.brand?._id === brand!._id || p.brand?.slug === brand!.slug
    );
  } catch (error) {
    console.error("Failed to load brand products:", error);
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
                href="/brands"
                className="hover:text-primary-600 transition-colors"
              >
                Brands
              </Link>
            </li>
            <li>
              <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
            </li>
            <li className="text-gray-900 font-semibold">{brand.name}</li>
          </ol>
        </nav>

        {/* Brand Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          {/* Hero Banner Strip */}
          <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-primary-700" />

          <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Brand Logo */}
            <div className="shrink-0 size-36 sm:size-44 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-5 relative shadow-2xs">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain p-4"
              />
            </div>

            {/* Brand Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <IconBuildingStore stroke={2} className="size-3.5" />
                  Official Brand
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2 mb-2">
                {brand.name}
              </h1>

              <p className="text-sm text-gray-500 mb-5">
                Explore the full collection of{" "}
                <strong className="text-gray-800">{brand.name}</strong> products.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900 text-base">
                    {brandProducts.length > 0 ? brandProducts.length : "—"}
                  </span>
                  <span>Products</span>
                </div>
                <span className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900 text-base">
                    {brand.createdAt
                      ? new Date(brand.createdAt).getFullYear()
                      : "—"}
                  </span>
                  <span>Since</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {brand.name}{" "}
                <span className="text-primary-600">Products</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1.5 transition-colors group"
            >
              <span>View All</span>
              <IconArrowRight
                stroke={2}
                className="size-4.5 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {brandProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
              <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
                <IconBuildingStore stroke={1.5} className="size-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No products listed yet
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                We&apos;re still adding products for{" "}
                <strong>{brand.name}</strong>. Check back soon!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                <span>Browse All Products</span>
                <IconArrowRight stroke={2} className="size-4.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
