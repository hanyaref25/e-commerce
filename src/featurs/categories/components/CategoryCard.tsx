import Image from "next/image";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { Category } from "../types/categories.types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category._id}`}
      className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-primary-200 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
    >
      {/* Category Image */}
      <div className="relative size-24 sm:size-28 rounded-full overflow-hidden bg-gray-50/80 mb-3 group-hover:scale-105 transition-transform duration-200">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-contain p-2"
        />
      </div>

      {/* Category Info */}
      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
        {category.name}
      </h3>
      <div className="flex items-center justify-center gap-1 text-xs text-gray-400 group-hover:text-primary-600 transition-colors mt-1 font-medium">
        <span>Explore</span>
        <IconChevronRight
          stroke={2}
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
