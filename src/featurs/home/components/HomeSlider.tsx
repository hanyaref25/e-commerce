"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slider1 from "@/src/assets/images/home-slider-1.png";

export default function HomeSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="pt-6 pb-2">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group">
          {/* Swiper Slider */}
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            onSwiper={setSwiperInstance}
            className="w-full h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px]"
          >
            {/* Slide 1 */}
            <SwiperSlide className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slider1}
                  alt="Fresh vegetables banner"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-emerald-600/75 to-emerald-500/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

                <div className="absolute inset-0 z-10 flex items-center px-8 sm:px-16 lg:px-24">
                  <div className="max-w-xl text-white">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-4 drop-shadow-sm tracking-tight">
                      Premium Quality
                      <br />
                      Guaranteed
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium mb-8 drop-shadow-sm">
                      Fresh from farm to your table
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href="/shop"
                        className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Shop Now
                      </Link>
                      <Link
                        href="/about"
                        className="border-2 border-white text-white hover:bg-white/20 font-semibold px-7 py-3 rounded-full transition-all duration-200 backdrop-blur-xs"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slider1}
                  alt="Organic daily essentials"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-emerald-600/75 to-emerald-500/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

                <div className="absolute inset-0 z-10 flex items-center px-8 sm:px-16 lg:px-24">
                  <div className="max-w-xl text-white">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-4 drop-shadow-sm tracking-tight">
                      100% Organic
                      <br />
                      Daily Essentials
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium mb-8 drop-shadow-sm">
                      Hand-picked vegetables & seasonal fruits
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href="/shop"
                        className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Shop Now
                      </Link>
                      <Link
                        href="/about"
                        className="border-2 border-white text-white hover:bg-white/20 font-semibold px-7 py-3 rounded-full transition-all duration-200 backdrop-blur-xs"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slider1}
                  alt="Exclusive deals banner"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-emerald-600/75 to-emerald-500/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

                <div className="absolute inset-0 z-10 flex items-center px-8 sm:px-16 lg:px-24">
                  <div className="max-w-xl text-white">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-4 drop-shadow-sm tracking-tight">
                      Exclusive Deals
                      <br />
                      Save Up to 30%
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium mb-8 drop-shadow-sm">
                      Best prices on all household groceries
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href="/shop"
                        className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Shop Now
                      </Link>
                      <Link
                        href="/about"
                        className="border-2 border-white text-white hover:bg-white/20 font-semibold px-7 py-3 rounded-full transition-all duration-200 backdrop-blur-xs"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-50 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <IconChevronLeft stroke={2.5} className="size-5 md:size-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-50 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <IconChevronRight stroke={2.5} className="size-5 md:size-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
