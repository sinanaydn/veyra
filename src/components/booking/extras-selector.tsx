"use client";

import { Package, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExtraService } from "@/features/cars/types/car.types";
import { useBookingStore } from "@/lib/store/booking.store";

interface ExtrasSelectorProps {
  extras: ExtraService[];
}

export function ExtrasSelector({ extras }: ExtrasSelectorProps) {
  const selectedExtras = useBookingStore((s) => s.selectedExtras);
  const toggleExtra = useBookingStore((s) => s.toggleExtra);
  const rentalDays = useBookingStore((s) => s.rentalDays);

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Package className="h-4 w-4 text-primary" />
        Ekstra Hizmetler
      </h3>

      <div className="grid gap-2 sm:grid-cols-2">
        {extras.map((extra) => {
          const isSelected = selectedExtras.some((e) => e.id === extra.id);
          const total =
            extra.priceType === "PER_DAY"
              ? extra.pricePerDay * rentalDays
              : extra.pricePerDay;

          return (
            <button
              key={extra.id}
              type="button"
              onClick={() => toggleExtra(extra)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isSelected ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{extra.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {extra.description}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold">
                  {total.toLocaleString("tr-TR")}₺
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {extra.priceType === "PER_DAY"
                    ? `${extra.pricePerDay.toLocaleString("tr-TR")}₺/gün`
                    : "tek seferlik"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
