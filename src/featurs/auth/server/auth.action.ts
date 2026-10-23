"use server";

import { apiClient } from "@/src/services/apiClient";
import { cookies } from "next/headers";

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  });
}

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token?.value || null;
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }

  try {
    const options = {
      url: "/auth/verifyToken",
      method: "GET",
      headers: {
        token: token.value,
      },
    };
    const { data } = await apiClient.request(options);
    if (data.message === "verified") {
      return {
        isAuthenticated: true,
        userInfo: {
          name: data.decoded.name,
          id: data.decoded.id,
          role: data.decoded.role,
        },
      };
    }
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}


