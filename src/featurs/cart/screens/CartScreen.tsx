"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  IconArrowRight,
  IconChevronRight,
  IconHome,
  IconLoader2,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/src/featurs/auth/slices/auth.slice";
import CartItemRow from "../components/CartItemRow";

export default function CartScreen() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const {
    items,
    totalCartPrice,
    numOfCartItems,
    isLoading,
    fetchCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
  } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50/40 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="size-20 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-5">
            <IconShoppingCart stroke={1.5} className="size-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to view your cart
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            You need to be logged in to access your shopping cart.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/login"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/shop"
              className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="bg-gray-50/40 min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <IconLoader2 className="size-5 animate-spin text-primary-600" />
            <span className="text-gray-600 font-medium">Loading your cart…</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-5 h-28 animate-pulse"
                />
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 h-64 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className="bg-gray-50/40 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="size-20 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-5">
            <IconShoppingCart stroke={1.5} className="size-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <span>Start Shopping</span>
            <IconArrowRight stroke={2} className="size-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/40 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
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
            <li className="text-gray-900 font-semibold">Shopping Cart</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Shopping <span className="text-primary-600">Cart</span>
              <span className="text-base font-normal text-gray-400 ml-2">
                ({numOfCartItems} {numOfCartItems === 1 ? "item" : "items"})
              </span>
            </h1>
          </div>

          {/* Clear Cart Button */}
          <button
            type="button"
            onClick={handleClearCart}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium disabled:opacity-40 transition-colors cursor-pointer"
          >
            <IconTrash stroke={1.8} className="size-4" />
            <span className="hidden sm:inline">Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Cart Items List ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <CartItemRow
                key={item._id}
                item={item}
                isLoading={isLoading}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}

            {/* Continue Shopping Link */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-semibold mt-2 transition-colors group"
            >
              <IconArrowRight
                stroke={2}
                className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5"
              />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* ── Order Summary ────────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sticky top-24 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              {/* Price Rows */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>
                    Subtotal ({numOfCartItems}{" "}
                    {numOfCartItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold text-gray-900">
                    {totalCartPrice.toFixed(2)} EGP
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-primary-600">
                    {totalCartPrice.toFixed(2)} EGP
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all"
              >
                <span>Proceed to Checkout</span>
                <IconArrowRight stroke={2} className="size-4.5" />
              </Link>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-400 space-y-1.5">
                <p className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Secure SSL checkout</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Free delivery on all orders</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>↩️</span>
                  <span>30-Day hassle-free returns</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
