"use client";

import { useMemo } from "react";
import { Receipt } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useBookingStore, computePriceBreakdown } from "@/lib/store/booking.store";

export function PriceBreakdown() {
  const car = useBookingStore((s) => s.car);
  const rentalDays = useBookingStore((s) => s.rentalDays);
  const selectedInsurance = useBookingStore((s) => s.selectedInsurance);
  const selectedExtras = useBookingStore((s) => s.selectedExtras);

  const lines = useMemo(
    () => (car ? computePriceBreakdown(car, rentalDays, selectedInsurance, selectedExtras) : []),
    [car, rentalDays, selectedInsurance, selectedExtras]
  );

  if (lines.length === 0) return null;

  const depositLine = lines.find((l) => l.type === "deposit");
  const totalLine = lines.find((l) => l.type === "total");
  const detailLines = lines.filter(
    (l) => l.type !== "deposit" && l.type !== "total"
  );

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Receipt className="h-4 w-4 text-primary" />
        Fiyat Özeti
      </h3>

      <div className="rounded-xl border bg-card p-4 space-y-2">
        {detailLines.map((line, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{line.label}</span>
            <span className="font-medium">
              {line.amount.toLocaleString("tr-TR")}₺
            </span>
          </div>
        ))}

        {depositLine && (
          <>
            <Separator className="my-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {depositLine.label}
              </span>
              <span className="font-medium text-amber-600">
                {depositLine.amount.toLocaleString("tr-TR")}₺
              </span>
            </div>
          </>
        )}

        {totalLine && (
          <>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Toplam Tutar</span>
              <span className="text-lg font-bold text-primary">
                {totalLine.amount.toLocaleString("tr-TR")}₺
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
