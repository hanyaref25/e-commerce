import { apiClient } from "@/src/services/apiClient";
import { UserProfile } from "../types/profile.types";


export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  try {
    const { data } = await apiClient.get(`/users/${userId}`);
    return data?.data ?? null;
  } catch (error: any) {
    console.error(`Failed to load user ${userId}:`, error?.message);
    return null;
  }
}

export default getUserProfile;
