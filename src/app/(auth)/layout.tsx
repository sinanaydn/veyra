"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { GuestGuard } from "@/lib/guards/guest-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Minimal header */}
        <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <ThemeToggle />
        </header>

        {/* Centered content */}
        <main className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">{children}</div>
        </main>

        {/* Minimal footer */}
        <footer className="py-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Veyra. Tüm hakları saklıdır.
        </footer>
      </div>
    </GuestGuard>
  );
}
