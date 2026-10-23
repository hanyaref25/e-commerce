export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  active?: boolean;
  wishlist?: unknown[];
  addresses?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}
