"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconCategory,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { Category, Metadata } from "../types/categories.types";
import CategoryCard from "../components/CategoryCard";

interface CategoriesScreenProps {
  categories: Category[];
  metadata: Metadata;
  keyword: string;
}

export default function CategoriesScreen({
  categories,
  metadata,
  keyword,
}: CategoriesScreenProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(keyword);
  const [syncedKeyword, setSyncedKeyword] = useState(keyword);

 
  if (keyword !== syncedKeyword) {
    setSyncedKeyword(keyword);
    setSearchValue(keyword);
  }

  const currentPage = metadata.currentPage || 1;
  const totalPages = Math.max(1, metadata.numberOfPages || 1);

  const goToPage = (page: number, nextKeyword: string) => {
    const params = new URLSearchParams();
    const trimmed = nextKeyword.trim();

    if (trimmed) params.set("keyword", trimmed);
    if (page > 1) params.set("page", String(page));

    const query = params.toString();
    router.push(query ? `/categories?${query}` : "/categories");
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToPage(1, searchValue);
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
            <li className="text-gray-900 font-semibold">Categories</li>
          </ol>
        </nav>

        {/* Header + Search */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Shop By <span className="text-primary-600">Category</span>
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-500 max-w-xl">
                Browse every department and find the products you are looking
                for.
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative w-full md:w-80">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search categories..."
                className="w-full pl-10 pr-24 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all"
              />
              <IconSearch
                stroke={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <IconX stroke={2} className="size-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results Badge */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium">
            <span>
              Showing{" "}
              <strong className="text-gray-900 font-semibold">
                {categories.length}
              </strong>{" "}
              {categories.length === 1 ? "category" : "categories"}
              {keyword ? ` matching "${keyword}"` : ""}
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <IconCategory stroke={1.5} className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No categories found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {keyword
                ? `We couldn't find a category matching "${keyword}".`
                : "There are no categories to show right now."}
            </p>
            <button
              type="button"
              onClick={() => goToPage(1, "")}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              {keyword ? "Clear Search" : "Reload"}
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1, keyword)}
              disabled={currentPage <= 1}
              className="size-10 rounded-xl border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <IconChevronLeft stroke={2} className="size-4.5" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page, keyword)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`size-10 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    page === currentPage
                      ? "bg-primary-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1, keyword)}
              disabled={currentPage >= totalPages}
              className="size-10 rounded-xl border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <IconChevronRight stroke={2} className="size-4.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
