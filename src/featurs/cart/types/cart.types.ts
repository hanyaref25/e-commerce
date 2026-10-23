// Individual product inside cart data
export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
  };
  ratingsAverage?: number;
}

export interface CartItem {
  _id: string;
  product: CartProduct;
  count: number;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

export interface CartApiResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartMutationResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartData;
}

export interface CartErrorResponse {
  statusMsg: string;
  message: string;
}
