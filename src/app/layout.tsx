
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Providers from "../components/providers/providers";
import { Toaster } from "sonner";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { getToken, verifyToken } from "../featurs/auth/server/auth.action";
import { AuthState } from "../featurs/auth/slices/auth.slice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialAuth: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  try {
    const authData = await verifyToken();
    if (authData.isAuthenticated && authData.userInfo) {
      const token = await getToken();
      initialAuth = {
        isAuthenticated: true,
        user: authData.userInfo as any,
        token: token || null,
      };
    }
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE" || error?.message?.includes("Dynamic server usage")) {
      throw error;
    }
    console.error("Error verifying auth in RootLayout:", error);
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Set the theme before first paint so there is no light flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers initialAuth={initialAuth}>
          <Navbar />
          <Toaster richColors />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
