import Link from "next/link";
import {
  IconHeadset,
  IconPackage,
  IconTruckDelivery,
  IconArrowBackUp,
  IconShieldCheck,
  IconArrowRight,
} from "@tabler/icons-react";

const links = [
  {
    href: "/my-orders",
    icon: IconPackage,
    title: "Track an order",
    body: "See the status of every order you have placed.",
  },
  {
    href: "/shipping-policy",
    icon: IconTruckDelivery,
    title: "Shipping & delivery",
    body: "Delivery times, fees and what happens if you miss the courier.",
  },
  {
    href: "/returns",
    icon: IconArrowBackUp,
    title: "Returns & refunds",
    body: "How to send something back and when the refund arrives.",
  },
  {
    href: "/privacy-policy",
    icon: IconShieldCheck,
    title: "Privacy & security",
    body: "What we store, and how your account and payments are protected.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white rounded-2xl border border-gray-100 shadow-xs p-6 hover:border-primary-200 hover:shadow-sm transition-all"
              >
                <span className="size-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                  <Icon stroke={1.8} className="size-5" />
                </span>
                <h2 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">{item.body}</p>
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="size-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <IconHeadset stroke={1.8} className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-gray-900">
                Still need a hand?
              </h2>
              <p className="text-sm text-gray-600">
                Our support team answers every message, every day.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <span>Contact us</span>
            <IconArrowRight stroke={2} className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
