"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  logout,
  selectIsAuthenticated,
} from "@/src/featurs/auth/slices/auth.slice";
import {
  clearCart,
  selectCartCount,
} from "@/src/featurs/cart/slices/cart.slice";
import { useCart } from "@/src/featurs/cart/hooks/useCart";
import { useWishlist } from "@/src/featurs/wishlist/hooks/useWishlist";
import { clearWishlist } from "@/src/featurs/wishlist/slices/wishlist.slice";
import { deleteToken } from "@/src/featurs/auth/server/auth.action";
import ThemeToggle from "@/src/components/Layout/ThemeToggle";
import NavbarSearch from "@/src/components/Layout/NavbarSearch";
import {
  IconBabyCarriage,
  IconChevronDown,
  IconDotsVertical,
  IconHeart,
  IconId,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPhone,
  IconProgressBolt,
  IconReportMedical,
  IconShirtSport,
  IconShoppingCart,
  IconUser,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartCount = useSelector(selectCartCount);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchCart } = useCart();
  const { fetchWishlist } = useWishlist();

  // Hydrate the cart badge and the saved wishlist once the user is signed in.
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    }
  }, [isAuthenticated, fetchCart, fetchWishlist]);

  const handleLogout = async () => {
    try {
      await deleteToken();
    } catch (error) {
      console.error("Failed to delete token on server:", error);
    }
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    toast.success("Logged out successfully");
    setIsMobileMenuOpen(false);
    router.push("/login");
  };
  return (
    <>
      <header>
        <div className="container mx-auto">
          {/* Top Navbar */}
          <div className="hidden lg:flex border-b text-sm border-gray-500/10 py-2  justify-between items-center *:flex *:gap-6">
            <ul className="*:flex *:gap-2 *:items-center">
              <li>
                <IconPhone stroke={2} />
                <a href="tel:+18001234567">+20 1096810921</a>
              </li>
              <li>
                <IconMail stroke={2} />
                <a href="mailto:support@freshcart.com">hanyaref25@gmail.com</a>
              </li>
            </ul>

            <ul>
              <li>
                <Link href={`/track-order`}>Track Order</Link>
              </li>
              <li>
                <Link href={`/about`}>About</Link>
              </li>
              <li>
                <Link href={`/contact`}>Contact</Link>
              </li>
              <li>
                <select>
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </li>
              <li>
                <select>
                  <option>العربية</option>
                  <option>English</option>
                </select>
              </li>
            </ul>
          </div>
          {/* Main Navigation */}
          <nav className="py-4 flex justify-between items-center">
            <h1>
              <Link href={`/`}>
                <Image src={logo} alt="FreshCart" className="logo-mark" />
              </Link>
            </h1>

            <NavbarSearch className="hidden lg:block w-96" />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden btn size-10 flex justify-center items-center bg-primary-600 text-white hover:bg-primary-700"
            >
              {isMobileMenuOpen ? <IconX stroke={2} /> : <IconMenu2 stroke={2} />}
            </button>

            <menu className="hidden lg:flex gap-6 items-center *:hover:text-primary-500 *:transition-colors *:duration-200">
              <li>
                <ThemeToggle />
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href={`/profile`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconUser stroke={2} />
                      <span className="text-sm">Account</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/cart`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <div className="relative">
                        <IconShoppingCart stroke={2} />

                        <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                          {cartCount}
                        </span>
                      </div>
                      <span className="text-sm">Cart</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/wishlist`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconHeart stroke={2} />
                      <span className="text-sm">Wishlist</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex flex-col gap-2 items-center cursor-pointer hover:text-red-600 transition-colors"
                    >
                      <IconLogout stroke={2} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={`/wishlist`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconHeart stroke={2} />
                      <span className="text-sm">Wishlist</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/cart`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <div className="relative">
                        <IconShoppingCart stroke={2} />

                        <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                          {cartCount}
                        </span>
                      </div>
                      <span className="text-sm">Cart</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/login`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconId stroke={2} />
                      <span className="text-sm">Signin</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/signup`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconUserPlus stroke={2} />
                      <span className="text-sm">Signup</span>
                    </Link>
                  </li>
                </>
              )}
            </menu>
          </nav>
        </div>
        {/* Category Navigation */}
        <nav className="hidden lg:block bg-gray-100 py-4">
          <div className="container flex gap-6 items-center">
            <div className="group/categories relative">
              <button className="btn bg-primary-600 text-white flex gap-2 items-center">
                <IconMenu2 stroke={2} />
                <span>All Categories</span>
                <IconChevronDown stroke={2} />
              </button>

              <ul className="hidden group-hover/categories:flex flex-col absolute z-50 top-11 left-0 w-64 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-xl divide-y divide-gray-100">
                <li>
                  <Link
                    href={`/category/6439d5b90049ad0b52b90048`}
                    className="p-3 flex gap-3 items-center text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconUser stroke={2} className="size-4.5" />

                    <span>Men&apos;s Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d58a0049ad0b52b9003f`}
                    className="p-3 flex gap-3 items-center text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconShirtSport stroke={2} className="size-4.5" />

                    <span>Women&apos;s Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d40367d9aa4ca97064cc`}
                    className="p-3 flex gap-3 items-center text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconBabyCarriage stroke={2} className="size-4.5" />

                    <span>Baby &amp; Toys</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d30b67d9aa4ca97064b1`}
                    className="p-3 flex gap-3 items-center text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconReportMedical stroke={2} className="size-4.5" />

                    <span>Beauty &amp; Health</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d2d167d9aa4ca970649f`}
                    className="p-3 flex gap-3 items-center text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconProgressBolt stroke={2} className="size-4.5" />

                    <span>Electronics</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/categories`}
                    className="p-3 flex gap-3 items-center font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <IconDotsVertical stroke={2} className="size-4.5" />

                    <span>View All Categories</span>
                  </Link>
                </li>
              </ul>
            </div>

            <menu className="flex gap-4">
              <li>
                <Link
                  href={`/`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`/recently-added`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Recently Added
                </Link>
              </li>
              <li>
                <Link
                  href={`/featured`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Featured Products
                </Link>
              </li>
              <li>
                <Link
                  href={`/offers`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  href={`/brands`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Brands
                </Link>
              </li>
            </menu>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="fixed w-80 top-0 bottom-0 left-0 bg-white shadow-2xl z-50 overflow-y-auto flex flex-col p-5 lg:hidden">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src={logo}
                    alt="FreshCart"
                    className="h-8 w-auto logo-mark"
                  />
                </Link>

                <div className="flex items-center gap-2">
                  <ThemeToggle />

                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <IconX stroke={2} className="size-6 text-gray-700" />
                  </button>
                </div>
              </div>

              <NavbarSearch
                className="my-4"
                onNavigate={() => setIsMobileMenuOpen(false)}
              />

              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mt-4 mb-2">
                Menu
              </h2>
              <ul className="space-y-2 border-b border-gray-200 pb-4">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                  >
                    Brands
                  </Link>
                </li>
              </ul>

              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mt-4 mb-2">
                User
              </h2>
              <ul className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconUser stroke={2} className="size-5" />
                        <span>Account</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconShoppingCart stroke={2} className="size-5" />
                        <span>Cart</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/wishlist"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconHeart stroke={2} className="size-5" />
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 font-medium text-left cursor-pointer transition-colors"
                      >
                        <IconLogout stroke={2} className="size-5" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/wishlist"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconHeart stroke={2} className="size-5" />
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconShoppingCart stroke={2} className="size-5" />
                        <span>Cart</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconId stroke={2} className="size-5" />
                        <span>Signin</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                      >
                        <IconUserPlus stroke={2} className="size-5" />
                        <span>Signup</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </header>
    </>
  );
}
