"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { PropsWithChildren } from "react";

type AuthProviderProps = PropsWithChildren & SessionProviderProps;

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
