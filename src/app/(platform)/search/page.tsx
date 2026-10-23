import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Products</h1>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Toys"].map((term) => (
              <span
                key={term}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
