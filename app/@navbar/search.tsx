"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";

type SearchBarProps = {
  searchParams?: {
    query?: string;
    category?: string;
  };
};

const useSearchParams = ({ searchParams }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(searchParams?.query);
  const queryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUrl = new URLSearchParams(searchParams);
    query && newUrl.set("query", query);
    router.push(`/?${newUrl.toString()}`);
  };
  return { query, queryOnChange, searchHandler };
};

const SearchBar = ({ searchParams }: SearchBarProps) => {
  const { query, queryOnChange, searchHandler } = useSearchParams({ searchParams });
  return (
    <form className="flex items-center rounded-full bg-purple-50" onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Je cherche"
        className="py-3 pl-5 bg-transparent rounded-full"
        name="query"
        value={query}
        onChange={queryOnChange}
      />
      <button type="submit" className="p-3 rounded-full shadow-xl bg-violet-200">
        <HiSearch className="w-6 h-6 text-violet-500" />
      </button>
    </form>
  );
};

export default SearchBar;
