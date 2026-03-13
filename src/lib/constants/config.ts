export const APP_CONFIG = {
  name: "Veyra",
  tagline: "Premium Araç Kiralama",
  description: "Dakik, premium ve hızlı araç kiralama.",
  defaultLocale: "tr" as const,
  locales: ["tr", "en"] as const,
  defaultCurrency: "TRY" as const,
  currencies: ["TRY", "EUR", "USD"] as const,
  contact: {
    phone: "+90 850 123 4567",
    whatsapp: "+90 532 123 4567",
    email: "info@veyra.com.tr",
  },
} as const;

export type Locale = (typeof APP_CONFIG.locales)[number];
export type Currency = (typeof APP_CONFIG.currencies)[number];
