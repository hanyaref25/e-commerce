import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconCheck,
  IconChevronRight,
  IconClock,
  IconCreditCard,
  IconHome,
  IconPackage,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { Order } from "../types/orders.types";

interface MyOrdersScreenProps {
  orders: Order[];
}

const formatDate = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function MyOrdersScreen({ orders }: MyOrdersScreenProps) {
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
            <li className="text-gray-900 font-semibold">My Orders</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            My <span className="text-primary-600">Orders</span>
            <span className="text-base font-normal text-gray-400 ml-2">
              ({orders.length} {orders.length === 1 ? "order" : "orders"})
            </span>
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <IconPackage stroke={1.5} className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No orders yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Your completed orders will appear here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              <span>Start Shopping</span>
              <IconArrowRight stroke={2} className="size-4.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border text-gray-700 bg-gray-100 border-gray-200">
                      {order.paymentMethodType === "cash" ? (
                        <IconTruckDelivery stroke={2} className="size-3.5" />
                      ) : (
                        <IconCreditCard stroke={2} className="size-3.5" />
                      )}
                      {order.paymentMethodType === "cash" ? "Cash" : "Card"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        order.isPaid
                          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                          : "text-amber-700 bg-amber-50 border-amber-100"
                      }`}
                    >
                      {order.isPaid ? (
                        <IconCheck stroke={2.5} className="size-3.5" />
                      ) : (
                        <IconClock stroke={2} className="size-3.5" />
                      )}
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        order.isDelivered
                          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                          : "text-blue-700 bg-blue-50 border-blue-100"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <ul className="divide-y divide-gray-100">
                  {order.cartItems?.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center gap-4 px-5 sm:px-6 py-3"
                    >
                      <div className="relative size-14 shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                        <Image
                          src={item.product?.imageCover}
                          alt={item.product?.title ?? "Product"}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${item.product?._id}`}
                          className="text-sm font-semibold text-gray-800 hover:text-primary-600 transition-colors line-clamp-1"
                        >
                          {item.product?.title}
                        </Link>
                        <p className="text-xs text-gray-400">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>

                      <span className="text-sm font-bold text-gray-900">
                        {(item.count * item.price).toFixed(2)} EGP
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Ship to{" "}
                    <strong className="text-gray-700">
                      {order.shippingAddress?.city}
                    </strong>
                    {order.shippingAddress?.phone
                      ? ` · ${order.shippingAddress.phone}`
                      : ""}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Total</span>
                    <span className="text-lg font-black text-primary-600">
                      {order.totalOrderPrice.toFixed(2)} EGP
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
