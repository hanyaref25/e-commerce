"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowsExchange,
  IconEye,
  IconHeart,
  IconLoader2,
  IconPlus,
  IconStarFilled,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Product } from "../types/products.types";
import { useCart } from "@/src/featurs/cart/hooks/useCart";
import { useWishlist } from "@/src/featurs/wishlist/hooks/useWishlist";
import { useIsAuthenticated } from "@/src/featurs/auth/hooks/useAuth";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { handleAddToCart } = useCart();
  const {
    isWishlisted,
    handleAddToWishlist: addProductToWishlist,
    handleRemoveFromWishlist: removeProductFromWishlist,
  } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const wishlisted = isWishlisted(product._id);

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const handleAddToCartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    setIsAdding(true);
    await handleAddToCart(product._id, product.title);
    setIsAdding(false);
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add items to your wishlist.");
      router.push("/login");
      return;
    }

    setIsWishlisting(true);
    if (wishlisted) {
      await removeProductFromWishlist(product._id, product.title);
    } else {
      await addProductToWishlist(product._id, product.title);
    }
    setIsWishlisting(false);
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative flex flex-col justify-between">
      {hasDiscount && (
        <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
          -{discountPercentage}%
        </span>
      )}

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 text-gray-400">
        <button
          type="button"
          onClick={handleWishlistClick}
          disabled={isWishlisting}
          aria-busy={isWishlisting}
          aria-pressed={wishlisted}
          className={`size-8 rounded-full bg-white/90 hover:bg-white shadow-2xs flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
            wishlisted ? "text-red-500" : "hover:text-red-500"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisting ? (
            <IconLoader2 stroke={1.8} className="size-4.5 animate-spin" />
          ) : (
            <IconHeart
              stroke={1.8}
              className={`size-4.5 ${wishlisted ? "fill-red-500" : ""}`}
            />
          )}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toast.info("Compare feature coming soon");
          }}
          className="size-8 rounded-full bg-white/90 hover:bg-white hover:text-primary-600 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Compare product"
        >
          <IconArrowsExchange stroke={1.8} className="size-4.5" />
        </button>
        <Link
          href={`/products/${product._id}`}
          className="size-8 rounded-full bg-white/90 hover:bg-white hover:text-primary-600 shadow-2xs flex items-center justify-center transition-colors"
          aria-label="Quick view"
        >
          <IconEye stroke={1.8} className="size-4.5" />
        </Link>
      </div>

      <div>
        <Link
          href={`/products/${product._id}`}
          className="relative aspect-square w-full mb-3 overflow-hidden rounded-xl bg-gray-50/50 flex items-center justify-center p-2 block"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <span className="text-xs text-gray-400 font-medium capitalize line-clamp-1 mb-1 block">
          {product.category?.name || "Category"}
        </span>

        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-1 hover:text-primary-600 transition-colors mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStarFilled
                key={star}
                className={`size-3.5 ${
                  star <= Math.round(product.ratingsAverage || 0)
                    ? "text-amber-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 font-medium">
            {product.ratingsAverage}
          </span>
          <span className="text-gray-400">
            ({product.ratingsQuantity})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100/60 mt-auto">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base md:text-lg font-bold text-gray-900">
            {hasDiscount ? product.priceAfterDiscount : product.price} EGP
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {product.price} EGP
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCartClick}
          disabled={isAdding}
          aria-busy={isAdding}
          className="size-9 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Add to cart"
        >
          {isAdding ? (
            <IconLoader2 stroke={2.5} className="size-5 animate-spin" />
          ) : (
            <IconPlus stroke={2.5} className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}
