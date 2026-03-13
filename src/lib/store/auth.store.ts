"use client";

import { create } from "zustand";
import { authService } from "@/features/auth/services/auth.service";
import type { User, UserRole } from "@/features/auth/types/user.types";
import type {
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  hydrateSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  error: null,

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(payload);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Giriş başarısız.",
      });
      throw err;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(payload);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Kayıt başarısız.",
      });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  hydrateSession: async () => {
    if (get().isHydrated) return;
    set({ isLoading: true });
    try {
      const session = await authService.resolveSession();
      if (session) {
        set({
          user: session.user,
          token: session.token,
          isAuthenticated: true,
          isLoading: false,
          isHydrated: true,
        });
      } else {
        set({ isLoading: false, isHydrated: true });
      }
    } catch {
      set({ isLoading: false, isHydrated: true });
    }
  },

  clearError: () => set({ error: null }),
}));

// Helper selectors
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectIsAdmin = (state: AuthState) =>
  state.user?.role === "ADMIN";
export const selectUserRole = (state: AuthState): UserRole | null =>
  state.user?.role ?? null;
export const selectIsHydrated = (state: AuthState) => state.isHydrated;
