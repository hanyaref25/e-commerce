import { Product } from "@/src/featurs/products/types/products.types";


export interface WishlistApiResponse {
  status: string;
  message?: string;
  count?: number;
  data: Product[];
}


export interface WishlistMutationResponse {
  status: string;
  message?: string;
  data?: Product[] | string[];
}
