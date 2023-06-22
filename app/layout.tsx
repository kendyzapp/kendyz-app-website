"use client";

import { PropsWithChildren, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";

import "./globals.css";

type RootLayoutProps = {
  categories: ReactNode;
  navbar: ReactNode;
} & PropsWithChildren;

export const RootLayout = ({
  children,
  categories,
  navbar,
}: RootLayoutProps) => {
  return (
    <html lang="fr">
      <SessionProvider session={null}>
        <body>
          {navbar}
          {categories}
          {children}
          <Analytics />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
