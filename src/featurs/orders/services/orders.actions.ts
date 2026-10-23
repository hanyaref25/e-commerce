"use server";

import { getToken } from "@/src/featurs/auth/server/auth.action";
import { apiClient } from "@/src/services/apiClient";
import { ordersApiClient } from "./ordersApiClient";
import {
  CashOrderResponse,
  CheckoutSessionResponse,
  Order,
  ShippingAddress,
} from "../types/orders.types";

const NO_TOKEN_MESSAGE = "Invalid Token. please login again";

type OrderActionResult = {
  success: boolean;
  message: string;
};

function getErrorMessage(error: any, fallback: string): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress
): Promise<OrderActionResult & { data?: Order }> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await ordersApiClient.post<CashOrderResponse>(
      `/orders/${cartId}`,
      { shippingAddress },
      { headers: { token } }
    );

    return {
      success: true,
      message: data?.message || "Order created successfully!",
      data: data?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to create the order."),
    };
  }
}


export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  returnUrl: string
): Promise<OrderActionResult & { url?: string }> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.post<CheckoutSessionResponse>(
      `/orders/checkout-session/${cartId}`,
      { shippingAddress },
      { headers: { token }, params: { url: returnUrl } }
    );

    const url = data?.session?.url;
    if (!url) {
      return {
        success: false,
        message: "The payment session could not be created.",
      };
    }

    return { success: true, message: "Redirecting to payment…", url };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to start the payment session."),
    };
  }
}


export async function getUserOrders(
  userId: string
): Promise<OrderActionResult & { data?: Order[] }> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.get(`/orders/user/${userId}`, {
      headers: { token },
    });

    const orders: Order[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];

    return { success: true, message: "Orders loaded.", data: orders };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to load your orders."),
    };
  }
}
