// Represents an individual Brand item
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface BrandsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

// Query params accepted by GET /brands
export interface GetAllBrandsParams {
  page?: number;
  limit?: number;
}

export interface BrandsApiResponse {
  results: number;
  metadata: BrandsMetadata;
  data: Brand[];
}

export interface SingleBrandApiResponse {
  data: Brand;
}
