import { PropsWithChildren, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import AuthProvider from "./api/auth/provider";

type RootLayoutProps = {
  navbar: ReactNode;
} & PropsWithChildren;

export const metadata = {
  title: "Kendyz",
  description:
    "Kendyz, la plateforme de mise en relation entre professionnels et particuliers",
  image: "https://kendyz.fr/logo.png",
  url: "https://kendyz.fr",
};

export const RootLayout = ({ navbar, children }: RootLayoutProps) => {
  return (
    <html lang="fr">
      <body>
        {navbar}
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
