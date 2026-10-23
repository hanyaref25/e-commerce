import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/src/services/apiClient";
import { SingleBrandApiResponse } from "../types/brands.types";


export default async function getSpecificBrand(
  id: string
): Promise<SingleBrandApiResponse> {
  const options: AxiosRequestConfig = {
    url: `/brands/${id}`,
    method: "GET",
  };

  const { data } = await apiClient.request<SingleBrandApiResponse>(options);
  return data;
}
