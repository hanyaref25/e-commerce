"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

interface NavbarSearchProps {
  className?: string;
  onNavigate?: () => void;
}

export default function NavbarSearch({
  className = "",
  onNavigate,
}: NavbarSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const keyword = value.trim();
    if (!keyword) return;

    router.push(`/shop?keyword=${encodeURIComponent(keyword)}`);
    setValue("");
    onNavigate?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`relative ${className}`}
    >
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search for products..."
        aria-label="Search products"
        className="form-control w-full pl-10 pr-4"
      />
      <IconSearch
        stroke={2}
        className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none"
      />
    </form>
  );
}
