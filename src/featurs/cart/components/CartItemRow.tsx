"use client";

import Image from "next/image";
import Link from "next/link";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { CartItem } from "../types/cart.types";

interface CartItemRowProps {
  item: CartItem;
  isLoading: boolean;
  onUpdateQuantity: (productId: string, count: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemRow({
  item,
  isLoading,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const lineTotal = item.price * item.count;

  return (
    <div className="flex gap-4 p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-2xs hover:shadow-xs transition-shadow">
      {/* Product Image */}
      <Link
        href={`/products/${item.product._id}`}
        className="shrink-0 size-20 sm:size-24 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center relative"
      >
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {item.product.category && (
              <span className="text-[11px] text-gray-400 font-medium capitalize block mb-0.5">
                {item.product.category.name}
              </span>
            )}
            <Link
              href={`/products/${item.product._id}`}
              className="text-sm sm:text-base font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
            >
              {item.product.title}
            </Link>
            <p className="text-xs text-gray-500 mt-0.5">
              Unit price:{" "}
              <strong className="text-gray-700">{item.price} EGP</strong>
            </p>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(item.product._id)}
            disabled={isLoading}
            className="shrink-0 size-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Remove item"
          >
            <IconTrash stroke={1.8} className="size-4.5" />
          </button>
        </div>

        {/* Quantity + Line Total */}
        <div className="flex items-center justify-between gap-4">
          {/* Qty Stepper */}
          <div className="inline-flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product._id, item.count - 1)}
              disabled={isLoading || item.count <= 1}
              className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <IconMinus stroke={2} className="size-3.5" />
            </button>
            <span className="px-3 py-1.5 font-semibold text-gray-800 text-sm min-w-[32px] text-center select-none">
              {item.count}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product._id, item.count + 1)}
              disabled={isLoading}
              className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <IconPlus stroke={2} className="size-3.5" />
            </button>
          </div>

          {/* Line Total */}
          <span className="font-bold text-gray-900 text-sm sm:text-base">
            {lineTotal.toFixed(2)} EGP
          </span>
        </div>
      </div>
    </div>
  );
}
