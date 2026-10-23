import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/src/services/apiClient";
import { SubcategoriesApiResponse } from "../types/categories.types";


export async function getSubcategories(
  categoryId: string
): Promise<SubcategoriesApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/subcategories",
    method: "GET",
    params: {
      category: categoryId,
      limit: 40,
    },
  };

  const { data } = await apiClient.request<SubcategoriesApiResponse>(options);
  return data;
}

export default getSubcategories;
