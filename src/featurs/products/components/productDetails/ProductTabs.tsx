"use client";

import { useState } from "react";
import {
  IconCheck,
  IconFileDescription,
  IconMessageCircle,
  IconStarFilled,
  IconUser,
} from "@tabler/icons-react";
import { SingleProduct } from "../../types/productDetails.types";

interface ProductTabsProps {
  product: SingleProduct;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  const reviews = product.reviews || [];
  const reviewsCount = reviews.length;

  // Calculate rating breakdown
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden mt-8">
      {/* Tab Navigation Headers */}
      <div className="flex border-b border-gray-100 px-6 sm:px-8 pt-4 gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold transition-all relative cursor-pointer ${
            activeTab === "details"
              ? "text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <IconFileDescription stroke={1.8} className="size-5" />
          <span>Product Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold transition-all relative cursor-pointer ${
            activeTab === "reviews"
              ? "text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <IconMessageCircle stroke={1.8} className="size-5" />
          <span>Customer Reviews ({reviewsCount})</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        {/* Tab 1: Product Details */}
        {activeTab === "details" && (
          <div className="space-y-8">
            {/* Description Paragraph */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                About this product
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Specifications Table */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {product.brand && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-semibold text-gray-800">
                      {product.brand.name}
                    </span>
                  </div>
                )}
                {product.category && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-gray-800">
                      {product.category.name}
                    </span>
                  </div>
                )}
                {product.subcategory && product.subcategory.length > 0 && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-500">Subcategory</span>
                    <span className="font-semibold text-gray-800">
                      {product.subcategory[0].name}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                  <span className="text-gray-500">In Stock</span>
                  <span className="font-semibold text-gray-800">
                    {product.quantity} units
                  </span>
                </div>
                {product.sold !== undefined && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-500">Total Sold</span>
                    <span className="font-semibold text-gray-800">
                      {product.sold} items
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                  <span className="text-gray-500">Average Rating</span>
                  <span className="font-semibold text-gray-800">
                    {product.ratingsAverage} / 5.0
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-semibold text-emerald-600">
                    Free over 500 EGP
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                  <span className="text-gray-500">Returns</span>
                  <span className="font-semibold text-gray-800">
                    30-Day Hassle-Free
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Reviews Summary Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-50/70 p-6 rounded-2xl border border-gray-100">
              {/* Overall Score */}
              <div className="md:col-span-4 text-center md:border-r border-gray-200/70 md:pr-6">
                <div className="text-5xl font-black text-gray-900 mb-2">
                  {product.ratingsAverage}
                </div>
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStarFilled
                      key={star}
                      className={`size-5 ${
                        star <= Math.round(product.ratingsAverage || 0)
                          ? "text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Based on {reviewsCount || product.ratingsQuantity || 0} reviews
                </p>
              </div>

              {/* Star Progress Bars */}
              <div className="md:col-span-8 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingCounts[rating as 1 | 2 | 3 | 4 | 5] || 0;
                  const percentage =
                    reviewsCount > 0
                      ? Math.round((count / reviewsCount) * 100)
                      : 0;
                  return (
                    <div key={rating} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-gray-600 font-medium">
                        {rating} stars
                      </span>
                      <div className="grow bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-gray-500">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Cards List */}
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="p-5 rounded-2xl border border-gray-100 bg-white shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Reviewer Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-100">
                            {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : <IconUser className="size-4" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {rev.user?.name || "Customer"}
                              </h4>
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                                <IconCheck className="size-3" />
                                Verified
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400">
                              {new Date(rev.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <IconStarFilled
                              key={star}
                              className={`size-3.5 ${
                                star <= rev.rating
                                  ? "text-amber-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Comment */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {rev.review || "Great quality product!"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <IconMessageCircle stroke={1.5} className="size-12 mx-auto mb-2 opacity-50" />
                <p>No customer reviews yet for this product.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
