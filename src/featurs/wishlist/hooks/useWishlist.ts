"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  setWishlist,
  setWishlistLoading,
  selectWishlistItems,
  selectWishlistCount,
  selectWishlistLoading,
} from "../slices/wishlist.slice";
import { addToWishlist, getWishlist, removeFromWishlist } from "../services/wishlist.actions";
import { AppDispatch } from "@/src/store/store";

export function useWishlist() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);
  const isLoading = useSelector(selectWishlistLoading);

  const isWishlisted = useCallback(
    (productId: string) => items.some((product) => product._id === productId),
    [items]
  );

  const fetchWishlist = useCallback(async () => {
    dispatch(setWishlistLoading(true));
    const result = await getWishlist();

    if (result.success && result.data) {
      dispatch(setWishlist(result.data));
      return true;
    }

    dispatch(setWishlistLoading(false));
    return false;
  }, [dispatch]);

  
  const handleAddToWishlist = useCallback(
    async (productId: string, productName?: string) => {
      dispatch(setWishlistLoading(true));
      const result = await addToWishlist(productId);

      if (!result.success) {
        dispatch(setWishlistLoading(false));
        toast.error(result.message);
        return false;
      }

      await fetchWishlist();

      toast.success(
        productName
          ? `"${productName}" added to wishlist!`
          : result.message
      );
      return true;
    },
    [dispatch, fetchWishlist]
  );

  const handleRemoveFromWishlist = useCallback(
    async (productId: string, productName?: string) => {
      dispatch(setWishlistLoading(true));
      const result = await removeFromWishlist(productId);

      if (!result.success) {
        dispatch(setWishlistLoading(false));
        toast.error(result.message);
        return false;
      }

      await fetchWishlist();

      toast.success(
        productName
          ? `"${productName}" removed from wishlist.`
          : result.message
      );
      return true;
    },
    [dispatch, fetchWishlist]
  );

  return {
    items,
    count,
    isLoading,
    isWishlisted,
    fetchWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  };
}
