import { format, formatDistance } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import type { Currency, Locale } from "@/lib/constants/config";

const dateLocales = {
  tr,
  en: enUS,
} as const;

export function formatCurrency(
  amount: number,
  currency: Currency = "TRY",
  locale: Locale = "tr"
): string {
  const localeMap: Record<Locale, string> = {
    tr: "tr-TR",
    en: "en-US",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  pattern: string = "d MMMM yyyy",
  locale: Locale = "tr"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, pattern, { locale: dateLocales[locale] });
}

export function formatDateRelative(
  date: Date | string,
  locale: Locale = "tr"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistance(d, new Date(), {
    addSuffix: true,
    locale: dateLocales[locale],
  });
}
