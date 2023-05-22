import Image from "next/image";
import kendyzLogo from "../public/logo.png";
import { PropsWithChildren } from "react";
import { OrganizationSwitcher, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type NavBarProps = {
  actions?: JSX.Element;
} & PropsWithChildren;

const NavBar = ({ children, actions }: NavBarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <Link href="/prestations">
        <Image src={kendyzLogo} alt="Kendyz Logo" className="w-24" />
      </Link>
      {children}
      <div className="flex items-center gap-4">
        {actions}
        <SignedIn>
          <OrganizationSwitcher />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;
