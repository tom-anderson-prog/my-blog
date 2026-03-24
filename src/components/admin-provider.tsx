"use client";

import { NuqsAdapter } from "nuqs/adapters/react";
import SideBar from "./side-bar";
import { usePathname } from "next/navigation";

interface AdminProviders {
  children: React.ReactNode;
}

export function AdminProviders({ children }: AdminProviders) {
  const pathname = usePathname();
  const isLoginPage =
    pathname === "/login" || pathname.startsWith("/login") ? true : false;

  return (
    <NuqsAdapter>
      {!isLoginPage && (
        <aside className="h-full border-r border-slate-200 bg-white">
          <SideBar />
        </aside>
      )}
      {children}
    </NuqsAdapter>
  );
}
