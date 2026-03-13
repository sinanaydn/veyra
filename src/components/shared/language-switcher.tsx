"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/lib/store/ui.store";
import type { Locale } from "@/lib/constants/config";

const LANGUAGES: { value: Locale; label: string; flag: string }[] = [
  { value: "tr", label: "Türkçe", flag: "🇹🇷" },
  { value: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useUIStore();
  const current = LANGUAGES.find((l) => l.value === locale) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        aria-label="Dil seçin"
        title={current.label}
      >
        <Languages className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onSelect={() => setLocale(lang.value)}
            className={locale === lang.value ? "bg-accent" : ""}
          >
            <span className="mr-2 text-base">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
