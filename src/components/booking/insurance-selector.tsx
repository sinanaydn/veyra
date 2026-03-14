"use client";

import { Check, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { InsurancePackage } from "@/features/cars/types/car.types";
import { useBookingStore } from "@/lib/store/booking.store";

interface InsuranceSelectorProps {
  packages: InsurancePackage[];
}

export function InsuranceSelector({ packages }: InsuranceSelectorProps) {
  const selected = useBookingStore((s) => s.selectedInsurance);
  const setInsurance = useBookingStore((s) => s.setInsurance);
  const rentalDays = useBookingStore((s) => s.rentalDays);

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Shield className="h-4 w-4 text-primary" />
        Sigorta Paketi
      </h3>

      <div className="grid gap-3 sm:grid-cols-3">
        {packages.map((pkg, i) => {
          const isSelected = selected?.id === pkg.id;
          const isRecommended = i === 1;

          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setInsurance(pkg)}
              className={cn(
                "relative rounded-xl border p-4 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              {isRecommended && (
                <Badge className="absolute -top-2.5 right-3 text-[10px]">
                  Önerilen
                </Badge>
              )}

              <p className="font-semibold text-sm">{pkg.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {pkg.description}
              </p>

              <ul className="mt-3 space-y-1">
                {pkg.coverageItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-sm font-bold text-primary">
                {pkg.pricePerDay === 0
                  ? "Ücretsiz"
                  : `${(pkg.pricePerDay * rentalDays).toLocaleString("tr-TR")}₺`}
              </p>
              {pkg.pricePerDay > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  {pkg.pricePerDay.toLocaleString("tr-TR")}₺ / gün
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
