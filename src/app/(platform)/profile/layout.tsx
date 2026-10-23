import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyToken } from "@/src/featurs/auth/server/auth.action";
import { getUserProfile } from "@/src/featurs/profile/services/profile.service";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await verifyToken();

  if (!auth.isAuthenticated || !auth.userInfo?.id) {
    redirect("/login");
  }

  const profile = await getUserProfile(String(auth.userInfo.id));

  const displayName = profile?.name || auth.userInfo?.name || "Guest";
  const displayEmail = profile?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold">{initial}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {displayName}
                    </h3>
                    {displayEmail && (
                      <p className="text-sm text-gray-600 truncate">
                        {displayEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile/my-address"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      My Addresses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile/settings"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-orders"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      Wishlist
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
