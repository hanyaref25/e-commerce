import { apiClient } from "@/src/services/apiClient";
import { SingleCategoryApiResponse } from "../types/categories.types";


export default async function getSpecificCategory(
  id: string
): Promise<SingleCategoryApiResponse> {
  const { data } = await apiClient.get<SingleCategoryApiResponse>(
    `/categories/${id}`
  );

  return data;
}
