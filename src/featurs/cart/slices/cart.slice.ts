import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartData, CartItem } from "../types/cart.types";

export interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount: number | null;
  numOfCartItems: number;
  isLoading: boolean;
}

const initialState: CartState = {
  cartId: null,
  items: [],
  totalCartPrice: 0,
  totalAfterDiscount: null,
  numOfCartItems: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (
      state,
      action: PayloadAction<{
        cartId: string;
        data: CartData;
        numOfCartItems: number;
      }>
    ) => {
      const { cartId, data, numOfCartItems } = action.payload;
      state.cartId = cartId;
      state.items = data.products;
      state.totalCartPrice = data.totalCartPrice;
      state.totalAfterDiscount = data.totalAfterDiscount ?? null;
      state.numOfCartItems = numOfCartItems;
      state.isLoading = false;
    },

    clearCart: (state) => {
      state.cartId = null;
      state.items = [];
      state.totalCartPrice = 0;
      state.totalAfterDiscount = null;
      state.numOfCartItems = 0;
      state.isLoading = false;
    },

    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCart, clearCart, setCartLoading } = cartSlice.actions;
export default cartSlice.reducer;


export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.totalCartPrice;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.numOfCartItems;
export const selectCartId = (state: { cart: CartState }) => state.cart.cartId;
export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.isLoading;
