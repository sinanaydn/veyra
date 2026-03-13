"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, selectIsAuthenticated, selectIsHydrated } from "@/lib/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Account route guard.
 * Giriş yapmamış kullanıcıları /login'e yönlendirir.
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isHydrated = useAuthStore(selectIsHydrated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || isLoading) {
    return fallback ?? (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
