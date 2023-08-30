"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import SearchButton from "./SearchButton";
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import Avatar from "react-avatar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SORT_BY_MAP = {
  r: "Default",
  rv: "By review",
  p: "By Price (low to high)",
  pd: "By Price (high to low",
};

function Header() {
  const [pages, setPages] = useState("");
  const [sortBy, setSortBy] = useState("r");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  return (
    <header className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 px-2 pt-10 pb-5 md:p-10 md:p-5">
      <Link href="/">
        <Image
          src="https://links.papareact.com/208"
          alt="Logo"
          width={150}
          height={150}
          className="object-contain mr-10"
        />
      </Link>

      <div className="w-full md:max-w-2xl">
        {/* FORM */}
        <form
          action={(formData) => {
            const searchTerm = formData.get("searchTerm");

            if (!formData.get("searchTerm")) return;

            const params = new URLSearchParams();

            if (pages) params.set("pages", pages.toString());
            if (sortBy) params.set("sort_by", sortBy.toString());
            if (minPrice) params.set("min_price", minPrice.toString());
            if (maxPrice) params.set("max_price", maxPrice.toString());

            router.push(`/search/${searchTerm}?${params.toString()}`);

            // /search?pages=10

            // /search/hello%20world?pages=2&sort_by=pd&min_price=100&max_price=1000%2B
          }}
        >
          <div className="flex items-center gap-2 w-full px-4">
            <div className="flex items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-6 py-4 flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="searchTerm"
                placeholder="Search..."
                className="outline-none flex-1"
              />
            </div>

            {/* Search Button */}
            <SearchButton />
          </div>

          <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto items-center">
            <SearchSelect
              onValueChange={(value) => setPages(value)}
              className="min-w-4"
              placeholder="# of pages"
            >
              {[...Array(100)].map((_, i) => (
                <SearchSelectItem key={i} value={(i + 1).toString()}>
                  {(i + 1).toString()} pages
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <Select
              onValueChange={(value) => setSortBy(value)}
              className="min-w-4"
              placeholder="Sort"
            >
              {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </Select>

            <SearchSelect
              onValueChange={(value) => setMinPrice(value)}
              className="min-w-4"
              placeholder="Min Price..."
            >
              {["", "100", "250", "500", "750", "900", "1000"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Minimum" : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <SearchSelect
              onValueChange={(value) => setMaxPrice(value)}
              className="min-w-4"
              placeholder="Max Price..."
            >
              {["", "100", "250", "500", "750", "900", "1000+"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Maximum" : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>
          </div>
        </form>
      </div>

      <div className="hidden lg:flex flex-1 justify-end">
        <Avatar name="Sohom Pal" round size="50" />
      </div>
    </header>
  );
}

export default Header;
