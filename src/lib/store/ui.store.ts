import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale, Currency } from "@/lib/constants/config";

interface UIState {
  locale: Locale;
  currency: Currency;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: Currency) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      locale: "tr",
      currency: "TRY",
      sidebarOpen: true,
      mobileMenuOpen: false,
      setLocale: (locale) => set({ locale }),
      setCurrency: (currency) => set({ currency }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      name: "veyra-ui",
      partialize: (state) => ({
        locale: state.locale,
        currency: state.currency,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
