import { apiClient } from "@/src/services/apiClient";
import { SingleSubcategoryApiResponse } from "../types/categories.types";


export default async function getSpecificSubcategory(
  id: string
): Promise<SingleSubcategoryApiResponse> {
  const { data } = await apiClient.get<SingleSubcategoryApiResponse>(
    `/subcategories/${id}`
  );

  return data;
}
