"use client";

import { ShieldCheck, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { InsurancePackage } from "@/features/cars/types/car.types";

interface InsurancePackagesProps {
  packages: InsurancePackage[];
}

export function InsurancePackages({ packages }: InsurancePackagesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Sigorta Paketleri</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="relative flex flex-col rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm"
          >
            {index === 1 && (
              <Badge className="absolute -top-2.5 right-3 bg-primary text-[10px]">
                Önerilen
              </Badge>
            )}

            <div className="mb-3 flex items-baseline justify-between">
              <h4 className="font-heading text-sm font-semibold">{pkg.name}</h4>
              <span className="text-sm font-bold text-primary">
                {pkg.pricePerDay === 0
                  ? "Ücretsiz"
                  : `${pkg.pricePerDay.toLocaleString("tr-TR")} ₺/gün`}
              </span>
            </div>

            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              {pkg.description}
            </p>

            <ul className="mt-auto space-y-1.5">
              {pkg.coverageItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-xs text-foreground/80"
                >
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
