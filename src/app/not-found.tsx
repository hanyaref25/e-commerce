import Image from "next/image";
import Link from "next/link";
import {
  IconHome,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";
import notFoundImage from "../assets/images/404.svg";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative w-full max-w-md mx-auto aspect-[16/10] mb-8">
          <Image
            src={notFoundImage}
            alt="Page not found"
            fill
            priority
            className="object-contain"
          />
        </div>

        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
          Oops! This page could not be found
        </h1>

        <p className="text-gray-500 max-w-lg mx-auto mb-8">
          The page you are looking for may have been moved, deleted, or never
          existed. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <IconHome stroke={2} className="size-4.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <IconShoppingBag stroke={2} className="size-4.5" />
            <span>Browse Shop</span>
          </Link>
        </div>

        {/* Search */}
        <form
          action="/shop"
          method="GET"
          className="relative max-w-md mx-auto"
          role="search"
        >
          <input
            type="search"
            name="keyword"
            placeholder="Search for a product..."
            aria-label="Search products"
            className="w-full pl-11 pr-28 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all"
          />
          <IconSearch
            stroke={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
