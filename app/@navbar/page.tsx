"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import kendyzLogo from "@/public/logo.png";
import SearchBar from "./search";

type NavBarProps = {
  searchParams?: {
    query?: string;
    category?: string;
  };
};

const NavBar = async ({ searchParams }: NavBarProps) => {
  const { status } = useSession();
  return (
    <div className="flex items-center justify-between gap-4 lg:px-24 px-12 py-4">
      <Link href="/">
        <Image src={kendyzLogo} alt="Kendyz Logo" className="w-24" />
      </Link>
      <SearchBar searchParams={searchParams} />
      <div>
        {status === "authenticated" ? (
          <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full">
            Profile
          </button>
        ) : (
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
