"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="size-10 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
    >
      <IconMoon stroke={1.8} className="size-5 dark:hidden" />
      <IconSun stroke={1.8} className="hidden size-5 dark:block" />
    </button>
  );
}
