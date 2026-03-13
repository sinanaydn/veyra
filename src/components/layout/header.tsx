"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore, selectIsAuthenticated, selectIsAdmin } from "@/lib/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: ROUTES.FLEET, label: "Filo" },
  { href: ROUTES.ABOUT, label: "Hakkımızda" },
  { href: ROUTES.FAQ, label: "SSS" },
  { href: ROUTES.BLOG, label: "Blog" },
  { href: ROUTES.CONTACT, label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left — Logo + Nav */}
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right — Utilities + Auth */}
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            <CurrencySwitcher />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Auth area — skeleton until hydrated */}
          <div className="ml-2 flex items-center">
            {!isHydrated ? (
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
            ) : isAuthenticated ? (
              <UserMenu
                userName={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                isAdmin={isAdmin}
                onLogout={logout}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Link href={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Giriş
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER} className="hidden sm:block">
                  <Button size="sm">Kayıt Ol</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobil menü">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 border-t border-border pt-3 mt-3">
              <CurrencySwitcher />
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {!isAuthenticated && (
              <div className="flex gap-2 border-t border-border pt-3 mt-2">
                <Link href={ROUTES.LOGIN} className="flex-1">
                  <Button variant="outline" className="w-full">Giriş</Button>
                </Link>
                <Link href={ROUTES.REGISTER} className="flex-1">
                  <Button className="w-full">Kayıt Ol</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function UserMenu({
  userName,
  isAdmin,
  onLogout,
}: {
  userName: string;
  isAdmin: boolean;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline">{userName.trim()}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {isAdmin && (
          <>
            <DropdownMenuItem>
              <Link href={ROUTES.ADMIN} className="flex w-full items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Yönetim Paneli
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <Link href={ROUTES.ACCOUNT} className="flex w-full items-center gap-2">
            <User className="h-4 w-4" />
            Hesabım
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onLogout}>
          <div className="flex w-full items-center gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
