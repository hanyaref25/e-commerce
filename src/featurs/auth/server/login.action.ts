"use server";

import loginSchema, { LoginFormData } from "../schemas/login.schema";
import { apiClient } from "@/src/services/apiClient";


type LoginResponse = {
  message: string;
  user:{
    name: string;
    email:string;
    role: string;
  };
  token: string;
};
  

export async function loginAction(data: LoginFormData) {
  console.log("Login action called with data:", data);

  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    console.log("Validation failed:", validationResult.error);
    return {
      success: false,
      error: validationResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    console.log("Sending request to API:", validationResult.data);

    const response = await apiClient.post("/auth/signin", validationResult.data);

    console.log("API Response:", response.data);

    if (response.data) {
      return {
        success: true,
        message: response.data.message || "Login successful!",
        data: response.data,
      };
    }

    return {
      success: false,
      message: "Unexpected response from server",
      error: { message: ["Unexpected response from server"] },
    };
  } catch (error: any) {
    console.error("Login error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Invalid email or password. Please try again.";

    return {
      success: false,
      message: errorMessage,
      error: { message: [errorMessage] },
    };
  }
}
