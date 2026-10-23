"use server";

import { apiClient } from "@/src/services/apiClient";
import { getToken } from "@/src/featurs/auth/server/auth.action";
import { Product } from "@/src/featurs/products/types/products.types";
import {
  WishlistApiResponse,
  WishlistMutationResponse,
} from "../types/wishlist.types";


const NO_TOKEN_MESSAGE = "You are not logged in. Please login to get access";

type WishlistActionResult = {
  success: boolean;
  message: string;
};

type WishlistListResult = WishlistActionResult & {
  data?: Product[];
};

function getErrorMessage(error: any, fallback: string): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

// ─── Get logged user wishlist · GET /wishlist ────────────────────────────────
// This is the only response that is safe to render: `data` is Product[].
export async function getWishlist(): Promise<WishlistListResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.get<WishlistApiResponse>("/wishlist", {
      headers: { token },
    });

    return {
      success: true,
      message: "Wishlist loaded.",
      data: Array.isArray(data.data) ? data.data : [],
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to load your wishlist."),
    };
  }
}

// ─── Add product to wishlist · POST /wishlist ────────────────────────────────
// body: { productId } · header: token
export async function addToWishlist(
  productId: string
): Promise<WishlistActionResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.post<WishlistMutationResponse>(
      "/wishlist",
      { productId },
      { headers: { token } }
    );

    return {
      success: true,
      message: data?.message || "Product added to your wishlist!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to add product to wishlist."),
    };
  }
}

// ─── Remove product from wishlist · DELETE /wishlist/:productId ──────────────
export async function removeFromWishlist(
  productId: string
): Promise<WishlistActionResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.delete<WishlistMutationResponse>(
      `/wishlist/${productId}`,
      { headers: { token } }
    );

    return {
      success: true,
      message: data?.message || "Product removed from your wishlist.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to remove product from wishlist."),
    };
  }
}
