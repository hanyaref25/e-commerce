"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  IconBuildingStore,
  IconChevronRight,
  IconHome,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { Brand } from "../types/brands.types";
import BrandCard from "../components/BrandCard";

interface BrandsScreenProps {
  initialBrands: Brand[];
}

export default function BrandsScreen({ initialBrands }: BrandsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialBrands;
    }
    const query = searchQuery.toLowerCase().trim();
    return initialBrands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(query) ||
        brand.slug.toLowerCase().includes(query)
    );
  }, [initialBrands, searchQuery]);

  return (
    <div className="bg-gray-50/40 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
            <li className="text-gray-900 font-semibold">Brands</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Featured <span className="text-primary-600">Brands</span>
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-500 max-w-xl">
                Explore our full selection of official brands and authentic products.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands..."
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all"
              />
              <IconSearch
                stroke={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <IconX stroke={2} className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium">
            <span>
              Showing{" "}
              <strong className="text-gray-900 font-semibold">
                {filteredBrands.length}
              </strong>{" "}
              {filteredBrands.length === 1 ? "brand" : "brands"}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </span>
          </div>
        </div>

        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <IconBuildingStore stroke={1.5} className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No brands found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              We couldn&apos;t find any brand matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="btn bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
