import Link from "next/link";
import {
  IconCategory,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
} from "@tabler/icons-react";
import { getAllCategories } from "@/src/featurs/categories/services/getAllCategories";
import { getAllSubcategories } from "@/src/featurs/categories/services/getAllSubcategories";
import {
  Subcategory,
} from "@/src/featurs/categories/types/categories.types";

const LIMIT = 40;

interface SubcategoriesPageProps {
  searchParams: Promise<{ page?: string }>;
}

const pageHref = (page: number) =>
  page > 1 ? `/subcategories?page=${page}` : "/subcategories";

export default async function SubcategoriesPage({
  searchParams,
}: SubcategoriesPageProps) {
  const { page } = await searchParams;

  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  let subcategories: Subcategory[] = [];
  let totalResults = 0;
  let totalPages = 1;
  const categoryNames = new Map<string, string>();

  try {
    const response = await getAllSubcategories({
      page: currentPage,
      limit: LIMIT,
    });
    subcategories = response?.data ?? [];
    totalResults = response?.results ?? subcategories.length;
    totalPages = Math.max(1, response?.metadata?.numberOfPages || 1);
  } catch (error) {
    console.error("Failed to load subcategories:", error);
  }

  try {
    const response = await getAllCategories();
    response?.data?.forEach((category) => {
      categoryNames.set(category._id, category.name);
    });
  } catch (error) {
    console.error("Failed to load categories:", error);
  }

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
            <li className="text-gray-900 font-semibold">Subcategories</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              All <span className="text-primary-600">Subcategories</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl">
            Every subcategory in the store, grouped under its parent category.
          </p>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium">
            <span>
              Showing{" "}
              <strong className="text-gray-900 font-semibold">
                {subcategories.length}
              </strong>{" "}
              of <strong className="text-gray-900">{totalResults}</strong>{" "}
              subcategories
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>

        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                href={`/subcategories/${subcategory._id}`}
                className="group bg-white border border-gray-100 rounded-xl p-4 shadow-2xs flex items-center gap-3 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
              >
                <span className="size-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <IconCategory stroke={1.8} className="size-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {subcategory.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {categoryNames.get(subcategory.category) ?? "Category"}
                  </p>
                </div>

                <IconChevronRight
                  stroke={2}
                  className="size-4 text-gray-300 group-hover:text-primary-600 transition-colors shrink-0"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <IconCategory stroke={1.5} className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No subcategories found
            </h3>
            <p className="text-sm text-gray-500">
              There are no subcategories to show right now.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1)}
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
                  href={pageHref(pageNumber)}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
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
                href={pageHref(currentPage + 1)}
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
  );
}
