"use server";

import { apiClient } from "@/src/services/apiClient";
import { getToken } from "@/src/featurs/auth/server/auth.action";
import { UserInfo } from "@/src/featurs/auth/slices/auth.slice";

const NO_TOKEN_MESSAGE = "You are not logged in. Please login to get access";

type ProfileResult = {
  success: boolean;
  message: string;
  data?: UserInfo;
};

function getErrorMessage(error: any, fallback: string): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export async function updateMe(data: {
  name: string;
  email: string;
  phone: string;
}): Promise<ProfileResult> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const response = await apiClient.put("/users/updateMe", data, {
      headers: { token },
    });

    return {
      success: true,
      message: response.data?.message || "Profile updated successfully.",
      data: response.data?.data ?? response.data?.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to update your profile."),
    };
  }
}

export async function changeMyPassword(data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}): Promise<{ success: boolean; message: string }> {
  const token = await getToken();
  if (!token) return { success: false, message: NO_TOKEN_MESSAGE };

  try {
    const response = await apiClient.put("/users/changeMyPassword", data, {
      headers: { token },
    });

    return {
      success: true,
      message: response.data?.message || "Password changed successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to change your password."),
    };
  }
}
