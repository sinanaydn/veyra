"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthStore } from "@/lib/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";
import type { UserRole } from "../types/user.types";

/**
 * Login/register sonrası role bazlı yönlendirme.
 */
export function useAuthRedirect() {
  const router = useRouter();

  const redirectByRole = useCallback(
    (role: UserRole) => {
      if (role === "ADMIN") {
        router.replace(ROUTES.ADMIN);
      } else {
        router.replace(ROUTES.ACCOUNT);
      }
    },
    [router]
  );

  return { redirectByRole };
}
