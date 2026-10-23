import Image from "next/image";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { Brand } from "../types/brands.types";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-primary-300 transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer relative overflow-hidden"
    >
      {/* Brand Logo Container */}
      <div className="relative aspect-square w-24 h-24 sm:w-28 sm:h-28 mb-3 rounded-2xl bg-gray-50/80 p-3 flex items-center justify-center overflow-hidden border border-gray-50 group-hover:scale-105 group-hover:bg-white group-hover:shadow-2xs transition-all duration-300">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="(max-width: 640px) 120px, 140px"
          className="object-contain p-2"
        />
      </div>

      {/* Brand Info */}
      <div className="w-full">
        <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-primary-600 transition-colors line-clamp-1">
          {brand.name}
        </h3>
        <div className="flex items-center justify-center gap-1 text-xs text-gray-400 group-hover:text-primary-600 transition-colors mt-1 font-medium">
          <span>Explore</span>
          <IconChevronRight
            stroke={2}
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
