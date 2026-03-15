"use client";

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
      <div className="flex min-h-svh flex-col bg-background">
        {/* Minimal branded header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-4 sm:px-6">
          <Logo />
          <ThemeToggle />
        </header>

        {/* Centered form area */}
        <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-[420px]">{children}</div>
        </main>

        {/* Minimal footer */}
        <footer className="flex shrink-0 items-center justify-center border-t border-border/50 px-4 py-4">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Veyra. Tüm hakları saklıdır.
          </p>
        </footer>
      </div>
    </GuestGuard>
  );
}
