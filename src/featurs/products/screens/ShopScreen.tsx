"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconCategory,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconPackage,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { Category } from "@/src/featurs/categories/types/categories.types";
import { PaginationMetadata, Product } from "../types/products.types";
import ProductCard from "../components/ProductCard";

const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-createdAt", label: "Newest" },
];

interface ShopScreenProps {
  products: Product[];
  totalResults: number;
  metadata: PaginationMetadata;
  categories: Category[];
  activeCategoryId?: string;
  keyword: string;
  sort: string;
}

export default function ShopScreen({
  products,
  totalResults,
  metadata,
  categories,
  activeCategoryId,
  keyword,
  sort,
}: ShopScreenProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(keyword);
  const [syncedKeyword, setSyncedKeyword] = useState(keyword);

  if (keyword !== syncedKeyword) {
    setSyncedKeyword(keyword);
    setSearchValue(keyword);
  }

  const currentPage = metadata.currentPage || 1;
  const totalPages = Math.max(1, metadata.numberOfPages || 1);
  const activeCategory = categories.find(
    (category) => category._id === activeCategoryId
  );
  const hasFilters = Boolean(activeCategoryId || keyword);

  const buildHref = ({
    categoryId = activeCategoryId,
    keywordValue = keyword,
    sortValue = sort,
    pageNumber = 1,
  }: {
    categoryId?: string;
    keywordValue?: string;
    sortValue?: string;
    pageNumber?: number;
  }) => {
    const params = new URLSearchParams();

    if (categoryId) params.set("category", categoryId);
    if (keywordValue) params.set("keyword", keywordValue);
    if (sortValue) params.set("sort", sortValue);
    if (pageNumber > 1) params.set("page", String(pageNumber));

    const query = params.toString();
    return query ? `/shop?${query}` : "/shop";
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      buildHref({ keywordValue: searchValue.trim(), pageNumber: 1 })
    );
  };

  const handleSort = (value: string) => {
    router.push(buildHref({ sortValue: value, pageNumber: 1 }));
  };

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
            <li className="text-gray-900 font-semibold">Shop</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {keyword ? (
              <>
                Results for{" "}
                <span className="text-primary-600">&ldquo;{keyword}&rdquo;</span>
              </>
            ) : activeCategory ? (
              <>
                {activeCategory.name}{" "}
                <span className="text-primary-600">Products</span>
              </>
            ) : (
              <>
                All <span className="text-primary-600">Products</span>
              </>
            )}
          </h1>
          <span className="text-sm text-gray-400 font-medium">
            {totalResults} {totalResults === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 lg:sticky lg:top-24">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Categories
              </h2>

              <ul className="space-y-1">
                <li>
                  <Link
                    href={buildHref({ categoryId: undefined })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !activeCategoryId
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <IconPackage stroke={1.8} className="size-4" />
                    <span>All Products</span>
                  </Link>
                </li>

                {categories.map((category) => {
                  const isActive = category._id === activeCategoryId;

                  return (
                    <li key={category._id}>
                      <Link
                        href={buildHref({ categoryId: category._id })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <IconCategory stroke={1.8} className="size-4" />
                        <span className="line-clamp-1">{category.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {hasFilters && (
                <Link
                  href="/shop"
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  <IconX stroke={2} className="size-3.5" />
                  Clear filters
                </Link>
              )}
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3 space-y-5">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <form onSubmit={handleSearch} className="relative w-full sm:max-w-sm">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all"
                />
                <IconSearch
                  stroke={2}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={() => setSearchValue("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <IconX stroke={2} className="size-4" />
                  </button>
                )}
              </form>

              <label className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
                <span className="hidden sm:inline">Sort by</span>
                <select
                  value={sort}
                  onChange={(event) => handleSort(event.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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
                  {keyword
                    ? `Nothing matches "${keyword}".`
                    : "Try another category or clear the filters."}
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  <span>Clear filters</span>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                {currentPage > 1 ? (
                  <Link
                    href={buildHref({ pageNumber: currentPage - 1 })}
                    className="size-10 rounded-xl border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Previous page"
                  >
                    <IconChevronLeft stroke={2} className="size-4.5" />
                  </Link>
                ) : (
                  <span className="size-10 rounded-xl border border-gray-200 bg-white text-gray-300 flex items-center justify-center opacity-50">
                    <IconChevronLeft stroke={2} className="size-4.5" />
                  </span>
                )}

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={buildHref({ pageNumber })}
                      aria-current={
                        pageNumber === currentPage ? "page" : undefined
                      }
                      className={`size-10 rounded-xl text-sm font-semibold flex items-center justify-center transition-colors ${
                        pageNumber === currentPage
                          ? "bg-primary-600 text-white"
                          : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  )
                )}

                {currentPage < totalPages ? (
                  <Link
                    href={buildHref({ pageNumber: currentPage + 1 })}
                    className="size-10 rounded-xl border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Next page"
                  >
                    <IconChevronRight stroke={2} className="size-4.5" />
                  </Link>
                ) : (
                  <span className="size-10 rounded-xl border border-gray-200 bg-white text-gray-300 flex items-center justify-center opacity-50">
                    <IconChevronRight stroke={2} className="size-4.5" />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
