import { Product } from "../types/products.types";
import { getAllProducts } from "./getAllProducts";

/**
 * The API has no working text search: `keyword`, `search`, `q` and `name` all
 * come back with 0 results because they are treated as field filters.
 * The catalogue is small (56 products), so it is fetched once and filtered
 * in memory instead.
 */
export async function searchProducts(
  keyword: string,
  options: { categoryId?: string; sort?: string } = {}
): Promise<Product[]> {
  const firstPage = await getAllProducts({ page: 1, limit: 50 });
  const products = [...(firstPage?.data ?? [])];

  const totalPages = Math.max(1, firstPage?.metadata?.numberOfPages ?? 1);

  if (totalPages > 1) {
    const rest = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        getAllProducts({ page: index + 2, limit: 50 })
      )
    );
    products.push(...rest.flatMap((page) => page?.data ?? []));
  }

  let matched = products;

  if (options.categoryId) {
    matched = matched.filter(
      (product) => product.category?._id === options.categoryId
    );
  }

  const term = keyword.trim().toLowerCase();

  if (term) {
    matched = matched.filter((product) =>
      [product.title, product.brand?.name, product.category?.name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }

  switch (options.sort) {
    case "price":
      matched.sort((a, b) => a.price - b.price);
      break;
    case "-price":
      matched.sort((a, b) => b.price - a.price);
      break;
    case "-createdAt":
      matched.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return matched;
}
