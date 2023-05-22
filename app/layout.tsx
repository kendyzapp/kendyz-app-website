import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

import "./globals.css";

export const metadata = {
  title: "Kendyz",
};

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
