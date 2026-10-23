import { Product } from "./products.types";

// Represents a user who submitted a review
export interface ReviewUser {
  _id: string;
  name: string;
}

// Represents an individual review item
export interface Review {
  _id: string;
  review?: string; // Optional since some reviews might only include a rating
  rating: number;
  product: string;
  user: ReviewUser;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v?: number;
}





export interface SingleProduct extends Product {
  reviews: Review[];
}

export interface SingleProductApiResponse {
  data: SingleProduct;
}