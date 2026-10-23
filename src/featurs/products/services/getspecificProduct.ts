import { apiClient } from "@/src/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { SingleProduct, SingleProductApiResponse } from "../types/productDetails.types";

export const fallbackSingleProduct: SingleProduct = {
  _id: "6428de2adc1175abc65ca05b",
  id: "6428de2adc1175abc65ca05b",
  title: "Softride Enzo NXT CASTLEROCK-High Risk R",
  slug: "softride-enzo-nxt-castlerock-high-risk-r",
  description: "Sole Material: Rubber | Colour Name: RED | Department: Men",
  quantity: 173,
  sold: 583,
  price: 2999,
  imageCover: "https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg",
  images: [
    "https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-1.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-4.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-2.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-3.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-5.jpeg",
  ],
  category: {
    _id: "6439d5b90049ad0b52b90048",
    name: "Men's Fashion",
    slug: "men's-fashion",
    image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
  },
  subcategory: [
    {
      _id: "6407f243b575d3b90bf957ac",
      name: "Men's Clothing",
      slug: "men's-clothing",
      category: "6439d5b90049ad0b52b90048",
    },
  ],
  brand: {
    _id: "64089d5c24b25627a253159f",
    name: "Puma",
    slug: "puma",
    image: "https://ecommerce.routemisr.com/Route-Academy-brands/1678286172219.png",
  },
  ratingsAverage: 4.3,
  ratingsQuantity: 12,
  reviews: [
    {
      _id: "69dcb55745eac35759414944",
      review: "Very good quality, durable sole and looks amazing.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69d39686abaceafff6539a7d", name: "Wesso" },
      createdAt: "2026-04-13T09:20:23.316Z",
      updatedAt: "2026-04-13T10:09:34.170Z",
    },
    {
      _id: "69eb4ee62b77870012a9ee79",
      review: "Comfortable running shoes with great cushioning.",
      rating: 4,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69d8daf3b8a2062cafebce46", name: "Belal" },
      createdAt: "2026-04-24T11:07:18.493Z",
      updatedAt: "2026-04-24T11:12:07.039Z",
    },
    {
      _id: "69ee8abe2b77870012ada434",
      review: "Great product! High quality and fits true to size.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69daec3a4863364f93e5d65c", name: "Ahmed Elhaz" },
      createdAt: "2026-04-26T21:59:26.108Z",
      updatedAt: "2026-04-26T21:59:26.108Z",
    },
    {
      _id: "69ee99d62b77870012adbef9",
      review: "Clean design and fast shipping. Highly recommended.",
      rating: 4,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69e42677340d3683fce2e34e", name: "Hermina Yundt" },
      createdAt: "2026-04-26T23:03:50.379Z",
      updatedAt: "2026-04-26T23:03:50.379Z",
    },
    {
      _id: "69f08388289c95001211934f",
      review: "Great product, excellent support and comfort.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69ec63e72b77870012ab1831", name: "Main User" },
      createdAt: "2026-04-28T09:53:12.371Z",
      updatedAt: "2026-04-28T09:53:12.371Z",
    },
    {
      _id: "69f3a7b3289c95001219f3d8",
      review: "The outfit is super cute and very comfortable. The fabric is soft and lightweight, perfect for daily wear. It fits nicely and looks even better in real life than in pictures.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69d80a7ab8a2062cafeaf610", name: "Samar Zeinah" },
      createdAt: "2026-04-30T19:04:19.186Z",
      updatedAt: "2026-04-30T19:04:19.186Z",
    },
    {
      _id: "69f3d9a0289c9500121a6f9f",
      review: "Great product! Lightweight and comfortable for all-day walking.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69cd6c74460be8e0dbc8b076", name: "Ria Mckay" },
      createdAt: "2026-04-30T22:37:20.073Z",
      updatedAt: "2026-04-30T22:37:20.073Z",
    },
    {
      _id: "6a09ba29289c95001255f0f9",
      review: "Very good materials and fast delivery.",
      rating: 4,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "6a02cd8d289c950012479e17", name: "Hisham" },
      createdAt: "2026-05-17T12:52:57.645Z",
      updatedAt: "2026-05-17T12:52:57.645Z",
    },
    {
      _id: "6a120ed1fc33d800120c5141",
      review: "Good product, exactly as described on the website.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "69f13590289c9500121353e6", name: "Bayan Ahmed" },
      createdAt: "2026-05-23T20:32:17.572Z",
      updatedAt: "2026-05-23T20:32:17.572Z",
    },
    {
      _id: "6a761129fc33d80012410e4e",
      review: "Super comfortable sneakers and stylish look.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "6a6d6a28fc33d800123f2473", name: "Hema" },
      createdAt: "2026-08-07T17:08:57.121Z",
      updatedAt: "2026-08-07T17:08:57.121Z",
    },
    {
      _id: "6aa4c5454da3e600124697a7",
      review: "Solid build quality and great arch support.",
      rating: 4,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "6a7b1518fc33d8001242b859", name: "Elsayed Mokdam" },
      createdAt: "2026-09-12T03:21:41.182Z",
      updatedAt: "2026-09-12T03:21:41.182Z",
    },
    {
      _id: "6aa770e64da3e60012477975",
      review: "Good purchase, excellent value for money.",
      rating: 5,
      product: "6428de2adc1175abc65ca05b",
      user: { _id: "6a2e267afc33d800121be1a7", name: "Alaa Mohamed" },
      createdAt: "2026-09-14T03:58:30.503Z",
      updatedAt: "2026-09-14T03:58:30.503Z",
    },
  ],
  createdAt: "2023-04-02T01:45:14.676Z",
  updatedAt: "2026-10-17T08:38:31.301Z",
};

export async function getspecificProduct(
  id: string
): Promise<SingleProductApiResponse> {
  const options: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "GET",
  };

  try {
    const { data } = await apiClient.request<SingleProductApiResponse>(options);
    if (data && data.data) {
      return data;
    }
    return { data: { ...fallbackSingleProduct, _id: id, id } };
  } catch (error: any) {
    console.warn(`RouteMisr API error on product ${id}, using fallback data:`, error?.message);
    return { data: { ...fallbackSingleProduct, _id: id, id } };
  }
}

export default getspecificProduct;
