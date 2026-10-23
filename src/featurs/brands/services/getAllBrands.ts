import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/src/services/apiClient";
import { BrandsApiResponse, GetAllBrandsParams } from "../types/brands.types";


export async function getAllBrands(
  params: GetAllBrandsParams = {}
): Promise<BrandsApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/brands",
    method: "GET",
    params: {
      page: params.page,
      limit: params.limit,
    },
  };

  const { data } = await apiClient.request<BrandsApiResponse>(options);
  return data;
}

export default getAllBrands;
