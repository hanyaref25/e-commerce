import Link from "next/link";
import {
  IconArrowRight,
  IconCalendar,
  IconHeart,
  IconMail,
  IconMapPin,
  IconPackage,
  IconPhone,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { Order } from "@/src/featurs/orders/types/orders.types";

interface ProfileOverviewScreenProps {
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  memberSince?: string;
  orders: Order[];
  wishlistCount: number;
  addressesCount: number;
}

const formatDate = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function ProfileOverviewScreen({
  name,
  email,
  phone,
  role,
  memberSince,
  orders,
  wishlistCount,
  addressesCount,
}: ProfileOverviewScreenProps) {
  const initial = name.charAt(0).toUpperCase() || "U";

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Identity */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="size-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-2xl font-bold shrink-0">
            {initial}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {name}
            </h2>
            <p className="text-sm text-gray-500">
              Member since {formatDate(memberSince)}
            </p>
          </div>

          {role && (
            <span className="ms-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              {role}
            </span>
          )}
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 text-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="size-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
              <IconMail stroke={1.8} className="size-4.5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-gray-400">Email</dt>
              <dd className="font-medium text-gray-800 truncate">
                {email || "—"}
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <span className="size-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
              <IconPhone stroke={1.8} className="size-4.5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-gray-400">Phone</dt>
              <dd className="font-medium text-gray-800 truncate">
                {phone || "—"}
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <span className="size-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
              <IconCalendar stroke={1.8} className="size-4.5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-gray-400">Member since</dt>
              <dd className="font-medium text-gray-800">
                {formatDate(memberSince)}
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <span className="size-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
              <IconTruckDelivery stroke={1.8} className="size-4.5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-gray-400">Total orders</dt>
              <dd className="font-medium text-gray-800">{orders.length}</dd>
            </div>
          </div>
        </dl>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/my-orders"
          className="group bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex items-center gap-4 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <span className="size-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <IconPackage stroke={1.8} className="size-5" />
          </span>
          <div>
            <p className="text-2xl font-black text-gray-900">{orders.length}</p>
            <p className="text-xs text-gray-500 font-medium">Orders</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="group bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex items-center gap-4 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <span className="size-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <IconHeart stroke={1.8} className="size-5" />
          </span>
          <div>
            <p className="text-2xl font-black text-gray-900">{wishlistCount}</p>
            <p className="text-xs text-gray-500 font-medium">Wishlist items</p>
          </div>
        </Link>

        <Link
          href="/profile/my-address"
          className="group bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex items-center gap-4 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <span className="size-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <IconMapPin stroke={1.8} className="size-5" />
          </span>
          <div>
            <p className="text-2xl font-black text-gray-900">
              {addressesCount}
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Saved addresses
            </p>
          </div>
        </Link>
      </section>

      {/* Recent orders */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent orders</h2>
          {orders.length > 0 && (
            <Link
              href="/my-orders"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1.5 group"
            >
              <span>View all</span>
              <IconArrowRight
                stroke={2}
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <div className="size-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <IconPackage stroke={1.5} className="size-7" />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2 rounded-xl transition-colors text-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <li
                key={order._id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(order.createdAt)} ·{" "}
                    {order.cartItems?.length ?? 0}{" "}
                    {(order.cartItems?.length ?? 0) === 1 ? "item" : "items"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      order.isDelivered
                        ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                        : "text-blue-700 bg-blue-50 border-blue-100"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {order.totalOrderPrice.toFixed(2)} EGP
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
