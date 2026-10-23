import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "@/src/featurs/auth/slices/auth.slice";
import cartReducer, { CartState } from "@/src/featurs/cart/slices/cart.slice";
import wishlistReducer, {
  WishlistState,
} from "@/src/featurs/wishlist/slices/wishlist.slice";

interface AppState {
  auth: AuthState;
  cart: CartState;
  wishlist: WishlistState;
}


const initialState: AppState = {
  auth: { isAuthenticated: false, user: null, token: null },
  cart: {
    cartId: null,
    items: [],
    totalCartPrice: 0,
    totalAfterDiscount: null,
    numOfCartItems: 0,
    isLoading: false,
  },
  wishlist: {
    items: [],
    isLoading: false,
  },
};

export const createStore = (preloadedState?: Partial<AppState>) =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: { ...initialState, ...preloadedState },
  });

export const myStore = createStore();
export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
