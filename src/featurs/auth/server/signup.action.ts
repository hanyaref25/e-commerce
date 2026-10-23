"use server";

import signupSchema, { SignupFormData } from "../schemas/signup.schema";
import { apiClient } from "@/src/services/apiClient";

export async function signupAction(data: SignupFormData) {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    console.log("Sending request to API with data:", validationResult.data);

    const response = await apiClient.post("/auth/signup", validationResult.data);

    console.log("API Response:", response.data);

    if (response.data) {
      return {
        success: true,
        message: response.data.message || "Account created successfully!",
        data: response.data,
      };
    }

    return {
      success: false,
      message: "Unexpected response from server",
      error: { message: ["Unexpected response from server"] },
    };
  } catch (error: any) {
    console.error("Signup error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong. Please try again.";

    return {
      success: false,
      message: errorMessage,
      error: { message: [errorMessage] },
    };
  }
}
