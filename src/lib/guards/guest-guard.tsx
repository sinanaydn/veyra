"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useAuthStore,
  selectIsAuthenticated,
  selectIsAdmin,
  selectIsHydrated,
} from "@/lib/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";

interface GuestGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Guest guard — login/register sayfaları için.
 * Zaten giriş yapmış kullanıcıları role'e göre yönlendirir.
 * ADMIN → /admin, USER → /account
 */
export function GuestGuard({ children, fallback }: GuestGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const isHydrated = useAuthStore(selectIsHydrated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isHydrated) return;

    if (isAuthenticated) {
      router.replace(isAdmin ? ROUTES.ADMIN : ROUTES.ACCOUNT);
    }
  }, [isHydrated, isAuthenticated, isAdmin, router]);

  if (!isHydrated || isLoading) {
    return fallback ?? (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
