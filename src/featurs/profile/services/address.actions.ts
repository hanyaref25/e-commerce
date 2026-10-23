"use server";

import { apiClient } from "@/src/services/apiClient";
import { getToken } from "@/src/featurs/auth/server/auth.action";
import { Address, AddressPayload } from "../types/address.types";

const NO_TOKEN_MESSAGE = "You are not logged in. Please login to get access";

type AddressResult = {
  success: boolean;
  message: string;
  data?: Address;
};

type AddressListResult = {
  success: boolean;
  message: string;
  data?: Address[];
};

function getErrorMessage(error: any, fallback: string): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export async function getAddresses(): Promise<AddressListResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.get("/addresses", {
      headers: { token },
    });

    const addresses: Address[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];

    return { success: true, message: "Addresses loaded.", data: addresses };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to load your addresses."),
    };
  }
}

export async function getSpecificAddress(
  addressId: string
): Promise<AddressResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.get(`/addresses/${addressId}`, {
      headers: { token },
    });

    return {
      success: true,
      message: "Address loaded.",
      data: data?.data ?? data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to load the address."),
    };
  }
}

export async function addAddress(payload: AddressPayload): Promise<AddressResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.post("/addresses", payload, {
      headers: { token },
    });

    return {
      success: true,
      message: data?.message || "Address added successfully.",
      data: data?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to add the address."),
    };
  }
}

export async function removeAddress(
  addressId: string
): Promise<{ success: boolean; message: string }> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const { data } = await apiClient.delete(`/addresses/${addressId}`, {
      headers: { token },
    });

    return {
      success: true,
      message: data?.message || "Address removed successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to remove the address."),
    };
  }
}
