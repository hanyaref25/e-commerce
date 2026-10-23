import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/src/services/apiClient";
import {
  GetAllSubcategoriesParams,
  SubcategoriesApiResponse,
} from "../types/categories.types";


export async function getAllSubcategories(
  params: GetAllSubcategoriesParams = {}
): Promise<SubcategoriesApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/subcategories",
    method: "GET",
    params: {
      page: params.page,
      limit: params.limit,
      category: params.category,
    },
  };

  const { data } = await apiClient.request<SubcategoriesApiResponse>(options);
  return data;
}

export default getAllSubcategories;
