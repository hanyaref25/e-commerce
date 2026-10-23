import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/src/featurs/products/types/products.types";

export interface WishlistState {
  items: Product[];
  isLoading: boolean;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },

    // Reset on logout.
    clearWishlist: (state) => {
      state.items = [];
      state.isLoading = false;
    },

    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setWishlist, clearWishlist, setWishlistLoading } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;
export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.items.length;
export const selectWishlistLoading = (state: { wishlist: WishlistState }) =>
  state.wishlist.isLoading;
