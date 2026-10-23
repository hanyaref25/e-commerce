"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconChevronRight,
  IconHeart,
  IconHome,
} from "@tabler/icons-react";
import { useWishlist } from "../hooks/useWishlist";
import ProductCard from "@/src/featurs/products/components/ProductCard";

export default function WishlistScreen() {
  const { items, count } = useWishlist();

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
            <li className="text-gray-900 font-semibold">Wishlist</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            My <span className="text-primary-600">Wishlist</span>
            <span className="text-base font-normal text-gray-400 ml-2">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <IconHeart stroke={1.5} className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              <span>Browse Products</span>
              <IconArrowRight stroke={2} className="size-4.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
