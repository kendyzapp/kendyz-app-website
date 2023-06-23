import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";
import { getServerSession } from "next-auth";
import { SignInButton, SignOutButton } from "./auth";

export const navbar = async () => {
  const session = await getServerSession();
  return (
    <div className="flex flex-row py-8 px-12 items-center">
      <Link href="/">
        <Image src={logo} alt="logo Kendyz" width={100} />
      </Link>
      <div className="flex-1" />
      <div className="flex gap-4 items-center">
        <p className="font-medium underline">Je suis un profesionnel</p>
        {!session ? <SignInButton /> : <SignOutButton />}
      </div>
    </div>
  );
};

export default navbar;
