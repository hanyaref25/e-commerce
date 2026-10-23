"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  setCart,
  clearCart,
  setCartLoading,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectCartId,
  selectCartLoading,
} from "../slices/cart.slice";
import {
  getUserCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
} from "../services/cart.actions";
import { AppDispatch } from "@/src/store/store";

export function useCart() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectCartTotal);
  const numOfCartItems = useSelector(selectCartCount);
  const cartId = useSelector(selectCartId);
  const isLoading = useSelector(selectCartLoading);

  const fetchCart = useCallback(async () => {
    dispatch(setCartLoading(true));
    try {
      const response = await getUserCart();
      if (response && response.data) {
        dispatch(
          setCart({
            cartId: response.cartId,
            data: response.data,
            numOfCartItems: response.numOfCartItems,
          })
        );
      } else {
        dispatch(clearCart());
      }
    } catch {
      dispatch(clearCart());
    }
  }, [dispatch]);

 
  const handleAddToCart = useCallback(
    async (productId: string, productName?: string, count: number = 1) => {
      dispatch(setCartLoading(true));
      const result = await addToCart(productId, count);
      if (result.success && result.data) {
        dispatch(
          setCart({
            cartId: result.data.cartId || cartId || "",
            data: result.data.data,
            numOfCartItems: result.data.numOfCartItems,
          })
        );
        toast.success(
          productName
            ? `${count > 1 ? `${count} × ` : ""}"${productName}" added to cart!`
            : result.message
        );
        return true;
      }

      dispatch(setCartLoading(false));
      toast.error(result.message);
      return false;
    },
    [dispatch, cartId]
  );

  const handleUpdateQuantity = useCallback(
    async (productId: string, count: number) => {
      if (count < 1) return;
      dispatch(setCartLoading(true));
      const result = await updateCartItemQuantity(productId, count);
      if (result.success && result.data) {
        dispatch(
          setCart({
            cartId: result.data.cartId || cartId || "",
            data: result.data.data,
            numOfCartItems: result.data.numOfCartItems,
          })
        );
      } else {
        dispatch(setCartLoading(false));
        toast.error(result.message);
      }
    },
    [dispatch, cartId]
  );

  const handleRemoveItem = useCallback(
    async (productId: string) => {
      dispatch(setCartLoading(true));
      const result = await removeCartItem(productId);
      if (result.success && result.data) {
        dispatch(
          setCart({
            cartId: result.data.cartId || cartId || "",
            data: result.data.data,
            numOfCartItems: result.data.numOfCartItems,
          })
        );
        toast.success("Item removed from cart.");
      } else {
        dispatch(setCartLoading(false));
        toast.error(result.message);
      }
    },
    [dispatch, cartId]
  );

  const handleClearCart = useCallback(async () => {
    dispatch(setCartLoading(true));
    const result = await clearUserCart();
    if (result.success) {
      dispatch(clearCart());
      toast.success("Cart cleared.");
    } else {
      dispatch(setCartLoading(false));
      toast.error(result.message);
    }
  }, [dispatch]);

  return {
    items,
    totalCartPrice,
    numOfCartItems,
    cartId,
    isLoading,
    fetchCart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
  };
}
