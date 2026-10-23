"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconArrowBackUp,
  IconBolt,
  IconChevronRight,
  IconHeart,
  IconHome,
  IconLoader2,
  IconMinus,
  IconPlus,
  IconShare,
  IconShieldCheck,
  IconShoppingCart,
  IconStarFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { SingleProduct } from "../../types/productDetails.types";
import { useCart } from "@/src/featurs/cart/hooks/useCart";
import { useWishlist } from "@/src/featurs/wishlist/hooks/useWishlist";
import { useIsAuthenticated } from "@/src/featurs/auth/hooks/useAuth";

interface ProductInfoProps {
  product: SingleProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { handleAddToCart: addProductToCart } = useCart();
  const {
    isWishlisted,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const wishlisted = isWishlisted(product._id);

  const imagesList =
    product.images && product.images.length > 0
      ? [product.imageCover, ...product.images.filter((img) => img !== product.imageCover)]
      : [product.imageCover];

  const [selectedImage, setSelectedImage] = useState<string>(imagesList[0] || product.imageCover);
  const [quantity, setQuantity] = useState<number>(1);

  const priceToUse = product.priceAfterDiscount ?? product.price;
  const totalPrice = (priceToUse * quantity).toFixed(2);
  const isInStock = product.quantity > 0;

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.info(`Only ${product.quantity} items available in stock`);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    setIsAdding(true);
    await addProductToCart(product._id, product.title, quantity);
    setIsAdding(false);
  };

  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout with ${quantity} item(s)!`);
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your wishlist.");
      router.push("/login");
      return;
    }

    setIsWishlisting(true);
    if (wishlisted) {
      await handleRemoveFromWishlist(product._id, product.title);
    } else {
      await handleAddToWishlist(product._id, product.title);
    }
    setIsWishlisting(false);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      } catch {
        toast.info("Unable to copy link");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex items-center flex-wrap gap-2">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary-600 transition-colors"
            >
              <IconHome stroke={1.8} className="size-4" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
          </li>
          {product.category && (
            <>
              <li>
                <Link
                  href={`/categories`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {product.category.name}
                </Link>
              </li>
              <li>
                <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
              </li>
            </>
          )}
          {product.subcategory && product.subcategory.length > 0 && (
            <>
              <li className="hover:text-primary-600 transition-colors">
                {product.subcategory[0].name}
              </li>
              <li>
                <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
              </li>
            </>
          )}
          <li className="text-gray-800 font-medium line-clamp-1 max-w-xs">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main Product Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image Container */}
            <div className="relative aspect-square w-full rounded-2xl border border-gray-100 bg-white overflow-hidden p-4 flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-2"
              />
            </div>

            {/* Thumbnails Row */}
            {imagesList.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {imagesList.map((img, index) => {
                  const isSelected = selectedImage === img;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 p-1 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-primary-600 ring-2 ring-primary-100 scale-102"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Product Information */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Badges: Category & Brand */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {product.category && (
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
                  {product.category.name}
                </span>
              )}
              {product.brand && (
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {product.brand.name}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-2 tracking-tight">
              {product.title}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStarFilled
                    key={star}
                    className={`size-4 ${
                      star <= Math.round(product.ratingsAverage || 0)
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {product.ratingsAverage}
              </span>
              <span className="text-sm text-gray-400">
                ({product.ratingsQuantity || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-3xl font-extrabold text-gray-900">
                {priceToUse} EGP
              </span>
              {product.priceAfterDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {product.price} EGP
                </span>
              )}
            </div>

            {/* Stock Status Badge */}
            <div className="mt-2">
              {isInStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/50">
                  <span className="size-2 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Description */}
            <p className="text-sm text-gray-600 leading-relaxed mt-5 mb-6">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-semibold text-gray-800">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <IconMinus stroke={2} className="size-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold text-gray-800 min-w-[40px] text-center select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= product.quantity}
                    className="p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <IconPlus stroke={2} className="size-4" />
                  </button>
                </div>

                <span className="text-sm text-gray-500 font-medium">
                  {product.quantity} available
                </span>
              </div>
            </div>

            {/* Total Price Bar */}
            <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-6">
              <span className="text-sm font-medium text-gray-500">
                Total Price:
              </span>
              <span className="text-2xl font-bold text-primary-600">
                {totalPrice} EGP
              </span>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock || isAdding}
                aria-busy={isAdding}
                className="btn w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isAdding ? (
                  <IconLoader2 stroke={2} className="size-5 animate-spin" />
                ) : (
                  <IconShoppingCart stroke={2} className="size-5" />
                )}
                <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!isInStock}
                className="btn w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <IconBolt stroke={2} className="size-5" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Wishlist & Share Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleWishlist}
                disabled={isWishlisting}
                aria-busy={isWishlisting}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`flex-1 border py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {isWishlisting ? (
                  <IconLoader2 stroke={1.8} className="size-5 animate-spin" />
                ) : (
                  <IconHeart
                    stroke={1.8}
                    className={`size-5 ${wishlisted ? "fill-red-600 text-red-600" : ""}`}
                  />
                )}
                <span>{wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl transition-colors cursor-pointer"
                aria-label="Share product"
              >
                <IconShare stroke={1.8} className="size-5" />
              </button>
            </div>

            {/* Bottom Guarantees Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-gray-100">
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <IconTruckDelivery stroke={1.8} className="size-5 text-primary-600 shrink-0" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <IconArrowBackUp stroke={1.8} className="size-5 text-primary-600 shrink-0" />
                <span>30 Days Return</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <IconShieldCheck stroke={1.8} className="size-5 text-primary-600 shrink-0" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
