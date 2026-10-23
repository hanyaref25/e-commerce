export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface Order {
  _id: string;
  user:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card" | string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CashOrderResponse {
  status?: string;
  message?: string;
  data?: Order;
}

export interface CheckoutSessionResponse {
  status?: string;
  message?: string;
  session?: {
    url?: string;
    success_url?: string;
    cancel_url?: string;
  };
}
