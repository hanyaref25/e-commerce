import { getAllBrands } from "@/src/featurs/brands/services/getAllBrands";
import { Brand } from "@/src/featurs/brands/types/brands.types";
import BrandsScreen from "@/src/featurs/brands/screens/BrandsScreen";

const LIMIT = 50;

export default async function BrandsPage() {
  let brands: Brand[] = [];

  try {
    // The API caps `limit` at 50, so 54 brands arrive in two pages.
    const firstPage = await getAllBrands({ page: 1, limit: LIMIT });
    brands = firstPage?.data ?? [];

    const totalPages = Math.max(1, firstPage?.metadata?.numberOfPages ?? 1);

    if (totalPages > 1) {
      const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
          getAllBrands({ page: index + 2, limit: LIMIT })
        )
      );
      brands = [...brands, ...rest.flatMap((page) => page?.data ?? [])];
    }
  } catch (error) {
    console.error("Failed to load brands:", error);
  }

  return <BrandsScreen initialBrands={brands} />;
}
