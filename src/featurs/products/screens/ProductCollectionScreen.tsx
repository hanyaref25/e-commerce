import Link from "next/link";
import {
  IconArrowRight,
  IconChevronRight,
  IconHome,
  IconPackage,
} from "@tabler/icons-react";
import { Product } from "../types/products.types";
import ProductCard from "../components/ProductCard";

interface ProductCollectionScreenProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  products: Product[];
  emptyMessage: string;
}

export default function ProductCollectionScreen({
  eyebrow,
  title,
  accent,
  description,
  products,
  emptyMessage,
}: ProductCollectionScreenProps) {
  return (
    <div className="bg-gray-50/40 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
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
            <li className="text-gray-900 font-semibold">
              {title} {accent}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-600 mb-2">
            {eyebrow}
          </span>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {title} <span className="text-primary-600">{accent}</span>
            </h1>

            <span className="text-sm text-gray-500 font-medium">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mt-2">
            {description}
          </p>
        </div>

        {/* Grid */}
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
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Nothing here yet
            </h2>
            <p className="text-sm text-gray-500 mb-6">{emptyMessage}</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              <span>Browse all products</span>
              <IconArrowRight stroke={2} className="size-4.5" />
            </Link>
          </div>
        )}

        {/* Footer link */}
        {products.length > 0 && (
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors group"
            >
              <span>See all products</span>
              <IconArrowRight
                stroke={2}
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
