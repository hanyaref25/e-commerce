// Represents an individual category item in the "data" array
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface GetAllCategoriesParams {
  page?: number;
  limit?: number;
  keyword?: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; 
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Query params accepted by GET /subcategories
export interface GetAllSubcategoriesParams {
  page?: number;
  limit?: number;
  category?: string;
}

// GET /subcategories/:id
export interface SingleSubcategoryApiResponse {
  data: Subcategory;
}

// GET /subcategories?category=<id>
export interface SubcategoriesApiResponse {
  results: number;
  metadata: Metadata;
  data: Subcategory[];
}

// GET /categories/:id
export interface SingleCategoryApiResponse {
  data: Category;
}

// Represents the root API response structure
export interface CategoriesApiResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}