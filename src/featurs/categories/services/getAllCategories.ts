import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/src/services/apiClient";
import {
  CategoriesApiResponse,
  GetAllCategoriesParams,
} from "../types/categories.types";


export async function getAllCategories(
  params: GetAllCategoriesParams = {}
): Promise<CategoriesApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/categories",
    method: "GET",
    params: {
      page: params.page,
      limit: params.limit,
      keyword: params.keyword,
    },
  };

  const { data } = await apiClient.request<CategoriesApiResponse>(options);
  return data;
}

export default getAllCategories;
