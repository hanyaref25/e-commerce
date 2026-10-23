import { getAllCategories } from "@/src/featurs/categories/services/getAllCategories";
import { getAllProducts } from "@/src/featurs/products/services/getAllProducts";
import { searchProducts } from "@/src/featurs/products/services/searchProducts";
import ShopScreen from "@/src/featurs/products/screens/ShopScreen";
import { Category } from "@/src/featurs/categories/types/categories.types";
import {
  PaginationMetadata,
  Product,
} from "@/src/featurs/products/types/products.types";

const LIMIT = 12;

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    keyword?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, keyword, sort, page } = await searchParams;

  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  let products: Product[] = [];
  let totalResults = 0;
  let metadata: PaginationMetadata = {
    currentPage,
    numberOfPages: 0,
    limit: LIMIT,
  };
  let categories: Category[] = [];

  try {
    if (keyword) {
      // The API's text filter returns nothing, so filtering happens in memory.
      const matched = await searchProducts(keyword, {
        categoryId: category,
        sort,
      });

      totalResults = matched.length;
      products = matched.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
      metadata = {
        currentPage,
        numberOfPages: Math.max(1, Math.ceil(matched.length / LIMIT)),
        limit: LIMIT,
      };
    } else {
      const response = await getAllProducts({
        category,
        sort,
        page: currentPage,
        limit: LIMIT,
      });
      products = response?.data ?? [];
      totalResults = response?.results ?? products.length;
      metadata = response?.metadata ?? metadata;
    }
  } catch (error) {
    console.error("Failed to load shop products:", error);
  }

  try {
    const response = await getAllCategories();
    categories = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load shop categories:", error);
  }

  return (
    <ShopScreen
      products={products}
      totalResults={totalResults}
      metadata={metadata}
      categories={categories}
      activeCategoryId={category}
      keyword={keyword ?? ""}
      sort={sort ?? ""}
    />
  );
}
