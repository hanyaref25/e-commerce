import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/src/services/apiClient";
import {
  GetAllProductsParams,
  ProductsApiResponse,
} from "../types/products.types";


export async function getAllProducts(
  params: GetAllProductsParams = {}
): Promise<ProductsApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/products",
    method: "GET",
    params: {
      ...params.filter,
      category: params.category,
      subcategory: params.subcategory,
      keyword: params.keyword,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  };

  const { data } = await apiClient.request<ProductsApiResponse>(options);
  return data;
}

export default getAllProducts;
