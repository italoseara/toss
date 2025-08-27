"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function ServerSessionProvider({
  children,
  ...props
}: { children: React.ReactNode } & SessionProviderProps) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
