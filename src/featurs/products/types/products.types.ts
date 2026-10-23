// Represents a subcategory item nested within a product
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Represents the main category assigned to a product
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Represents the brand assigned to a product
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Represents an individual product item in the "data" array
export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number; // Optional as not all items have discounts
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Represents the pagination metadata object
export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // Optional for the last page
}

// Query params accepted by GET /products
export interface GetAllProductsParams {
  category?: string;
  subcategory?: string;
  keyword?: string;
  page?: number;
  limit?: number;
  sort?: string;
  // Extra query keys, e.g. { "priceAfterDiscount[gt]": 0 }
  filter?: Record<string, string | number>;
}

// Represents the root API response structure for products
export interface ProductsApiResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Product[];
}