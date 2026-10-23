"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  IconArrowRight,
  IconChevronRight,
  IconCreditCard,
  IconHome,
  IconLoader2,
  IconShoppingCart,
  IconTruckDelivery,
} from "@tabler/icons-react";
import checkoutSchema, { CheckoutFormData } from "../schemas/checkout.schema";
import {
  createCashOrder,
  createCheckoutSession,
} from "../services/orders.actions";
import { useCart } from "@/src/featurs/cart/hooks/useCart";
import { useIsAuthenticated } from "@/src/featurs/auth/hooks/useAuth";
import { clearCart } from "@/src/featurs/cart/slices/cart.slice";
import { AppDispatch } from "@/src/store/store";

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalCartPrice, numOfCartItems, cartId, isLoading, fetchCart } =
    useCart();
  const isAuthenticated = useIsAuthenticated();
  const [method, setMethod] = useState<"cash" | "online" | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  const onCash = async (data: CheckoutFormData) => {
    if (!cartId) {
      toast.error("Your cart is empty.");
      return;
    }

    setMethod("cash");
    const result = await createCashOrder(cartId, data);
    setMethod(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    dispatch(clearCart());
    toast.success(result.message);
    router.push("/my-orders");
  };

  const onOnline = async (data: CheckoutFormData) => {
    if (!cartId) {
      toast.error("Your cart is empty.");
      return;
    }

    setMethod("online");
    const returnUrl = `${window.location.origin}/my-orders`;
    const result = await createCheckoutSession(cartId, data, returnUrl);

    if (!result.success || !result.url) {
      setMethod(null);
      toast.error(result.message);
      return;
    }

    window.location.assign(result.url);
  };

  if (isLoading && items.length === 0) {
    return (
      <div className="bg-gray-50/40 min-h-screen py-16 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600 font-medium">
          <IconLoader2 className="size-5 animate-spin text-primary-600" />
          <span>Loading your cart…</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
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
            Add some products before checking out.
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
            <li>
              <Link
                href="/cart"
                className="hover:text-primary-600 transition-colors"
              >
                Cart
              </Link>
            </li>
            <li>
              <IconChevronRight stroke={2} className="size-3.5 text-gray-400" />
            </li>
            <li className="text-gray-900 font-semibold">Checkout</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Check<span className="text-primary-600">out</span>
          </h1>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping address */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Shipping address</h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="details" className="text-sm font-medium">
                Address details*
              </label>
              <input
                id="details"
                className="form-control"
                placeholder="Street, building, apartment…"
                {...register("details")}
              />
              {errors.details && (
                <span className="text-red-500 text-sm">
                  {errors.details.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm font-medium">
                  City*
                </label>
                <input
                  id="city"
                  className="form-control"
                  placeholder="Cairo"
                  {...register("city")}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="postalCode" className="text-sm font-medium">
                  Postal code*
                </label>
                <input
                  id="postalCode"
                  className="form-control"
                  placeholder="12345"
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <span className="text-red-500 text-sm">
                    {errors.postalCode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone number*
              </label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                placeholder="01000000000"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Payment buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button
                type="button"
                onClick={handleSubmit(onCash)}
                disabled={method !== null}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                {method === "cash" ? (
                  <IconLoader2 className="size-5 animate-spin" />
                ) : (
                  <IconTruckDelivery stroke={2} className="size-5" />
                )}
                <span>Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit(onOnline)}
                disabled={method !== null}
                className="w-full bg-slate-900 hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                {method === "online" ? (
                  <IconLoader2 className="size-5 animate-spin" />
                ) : (
                  <IconCreditCard stroke={2} className="size-5" />
                )}
                <span>Pay with Card</span>
              </button>

              <p className="text-xs text-gray-400 text-center">
                Card payments are handled by Stripe.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900">
                Order summary
              </h2>

              <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item._id} className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {item.count} × {item.price} EGP
                      </p>
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      {(item.count * item.price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
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
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-primary-600">
                    {totalCartPrice.toFixed(2)} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
