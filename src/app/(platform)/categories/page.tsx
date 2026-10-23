import { getAllCategories } from "@/src/featurs/categories/services/getAllCategories";
import CategoriesScreen from "@/src/featurs/categories/screens/CategoriesScreen";
import {
  Category,
  Metadata,
} from "@/src/featurs/categories/types/categories.types";

const LIMIT = 12;

interface CategoriesPageProps {
  searchParams: Promise<{ page?: string; keyword?: string }>;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { page, keyword } = await searchParams;

  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  let categories: Category[] = [];
  let metadata: Metadata = {
    currentPage,
    numberOfPages: 0,
    limit: LIMIT,
  };

  try {
    if (keyword) {
      // The API's keyword filter returns nothing, so filter in memory.
      const response = await getAllCategories({ limit: 50 });
      const term = keyword.trim().toLowerCase();
      const matched = (response?.data ?? []).filter(
        (category) =>
          category.name.toLowerCase().includes(term) ||
          category.slug.toLowerCase().includes(term)
      );

      categories = matched.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
      metadata = {
        currentPage,
        numberOfPages: Math.max(1, Math.ceil(matched.length / LIMIT)),
        limit: LIMIT,
      };
    } else {
      const response = await getAllCategories({
        page: currentPage,
        limit: LIMIT,
      });
      categories = response?.data ?? [];
      metadata = response?.metadata ?? metadata;
    }
  } catch (error) {
    console.error("Failed to load categories:", error);
  }

  return (
    <CategoriesScreen
      categories={categories}
      metadata={metadata}
      keyword={keyword ?? ""}
    />
  );
}
