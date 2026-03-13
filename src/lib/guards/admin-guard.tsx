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

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Admin route guard.
 * Giriş yapmamış kullanıcıları /login'e,
 * yetkisiz (USER) kullanıcıları /account'a yönlendirir.
 */
export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const isHydrated = useAuthStore(selectIsHydrated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (!isAdmin) {
      router.replace(ROUTES.ACCOUNT);
    }
  }, [isHydrated, isAuthenticated, isAdmin, router]);

  if (!isHydrated || isLoading) {
    return fallback ?? (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
