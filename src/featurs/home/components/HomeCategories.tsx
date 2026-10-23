import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllCategories } from "@/src/featurs/categories/services/getAllCategories";
import { Category } from "@/src/featurs/categories/types/categories.types";

export default async function HomeCategories() {
  let categories: Category[] = [];

  try {
    const categoriesResponse = await getAllCategories();
    categories = categoriesResponse?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-7 bg-primary-600 rounded-full inline-block" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Shop By <span className="text-primary-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Categories</span>
            <IconArrowRight
              stroke={2}
              className="size-4.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category._id}`}
              className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-primary-200 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="size-20 sm:size-24 rounded-full overflow-hidden bg-gray-50/80 flex items-center justify-center p-2 mb-3 relative group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
