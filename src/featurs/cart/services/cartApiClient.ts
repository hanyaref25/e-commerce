import axios from "axios";


export const cartApiClient = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
