"use server";

import { getToken } from "@/src/featurs/auth/server/auth.action";
import { cartApiClient } from "./cartApiClient";
import { CartApiResponse, CartMutationResponse } from "../types/cart.types";


const NO_TOKEN_MESSAGE = "Invalid Token. please login again";

type CartMutationResult = {
  success: boolean;
  message: string;
  data?: CartMutationResponse;
};

function getErrorMessage(error: any, fallback: string): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}


export async function getUserCart(): Promise<CartApiResponse | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const { data } = await cartApiClient.get<CartApiResponse>("/cart", {
      headers: { token },
    });
    return data;
  } catch (error: any) {
    if (error?.response?.status !== 404) {
      console.error("Get cart error:", error?.response?.data || error.message);
    }
    return null;
  }
}


export async function addToCart(
  productId: string,
  count: number = 1
): Promise<CartMutationResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    let data: CartMutationResponse | undefined;

    for (let i = 0; i < Math.max(1, Math.floor(count)); i++) {
      const response = await cartApiClient.post<CartMutationResponse>(
        "/cart",
        { productId },
        { headers: { token } }
      );
      data = response.data;
    }

    return {
      success: true,
      message: data?.message || "Product added to cart!",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to add product to cart."),
    };
  }
}


export async function updateCartItemQuantity(
  productId: string,
  count: number
): Promise<CartMutationResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await cartApiClient.put<CartMutationResponse>(
      `/cart/${productId}`,
      { count },
      { headers: { token } }
    );
    return {
      success: true,
      message: data.message || "Cart updated!",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to update cart."),
    };
  }
}


export async function removeCartItem(
  productId: string
): Promise<CartMutationResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await cartApiClient.delete<CartMutationResponse>(
      `/cart/${productId}`,
      { headers: { token } }
    );
    return {
      success: true,
      message: data.message || "Item removed from cart.",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to remove item."),
    };
  }
}

export async function clearUserCart(): Promise<{
  success: boolean;
  message: string;
}> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    await cartApiClient.delete("/cart", { headers: { token } });
    return { success: true, message: "Your cart has been cleared." };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to clear cart."),
    };
  }
}
