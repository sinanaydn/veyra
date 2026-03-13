"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/lib/store/ui.store";
import type { Currency } from "@/lib/constants/config";

const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: "TRY", label: "Türk Lirası", symbol: "₺" },
  { value: "EUR", label: "Euro", symbol: "€" },
  { value: "USD", label: "US Dollar", symbol: "$" },
];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useUIStore();
  const current =
    CURRENCIES.find((c) => c.value === currency) ?? CURRENCIES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 items-center justify-center rounded-md px-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        aria-label="Para birimi seçin"
        title={current.label}
      >
        {current.symbol} {current.value}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {CURRENCIES.map((cur) => (
          <DropdownMenuItem
            key={cur.value}
            onSelect={() => setCurrency(cur.value)}
            className={currency === cur.value ? "bg-accent" : ""}
          >
            <span className="mr-2 font-medium">{cur.symbol}</span>
            <span>{cur.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
