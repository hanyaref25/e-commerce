"use server";

import { apiClient } from "@/src/services/apiClient";

type MessageResult = {
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


export async function forgotPassword(email: string): Promise<MessageResult> {
  try {
    const { data } = await apiClient.post("/auth/forgotPasswords", { email });

    return {
      success: true,
      message: data?.message || "A reset code has been sent to your email.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to send the reset code."),
    };
  }
}


export async function verifyResetCode(resetCode: string): Promise<MessageResult> {
  try {
    const { data } = await apiClient.post("/auth/verifyResetCode", {
      resetCode,
    });

    return {
      success: true,
      message: data?.message || "Code verified successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Reset code is invalid or has expired"),
    };
  }
}


export async function resetPassword(
  email: string,
  newPassword: string
): Promise<MessageResult> {
  try {
    const { data } = await apiClient.put("/auth/resetPassword", {
      email,
      newPassword,
    });

    return {
      success: true,
      message: data?.message || "Password reset successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to reset your password."),
    };
  }
}
