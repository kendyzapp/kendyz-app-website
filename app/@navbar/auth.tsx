"use client";

import { signIn, signOut } from "next-auth/react";

export const SignInButton = () => {
  return (
    <button
      className="px-4 py-2 bg-violet-400 rounded-full text-white"
      onClick={() => signIn()}
    >
      Se connecter
    </button>
  );
};

export const SignOutButton = () => {
  return (
    <button
      className="px-4 py-2 bg-violet-400 rounded-full text-white"
      onClick={() => signOut()}
    >
      Se déconnecter
    </button>
  );
};
