import { Plus } from "lucide-react";
import type { ExtraService } from "@/features/cars/types/car.types";

interface ExtrasBlockProps {
  extras: ExtraService[];
}

export function ExtrasBlock({ extras }: ExtrasBlockProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Plus className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Ekstra Hizmetler</h3>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {extras.map((extra) => (
          <div
            key={extra.id}
            className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{extra.name}</p>
              <p className="text-xs text-muted-foreground">{extra.description}</p>
            </div>
            <div className="ml-3 shrink-0 text-right">
              <p className="text-sm font-semibold text-primary">
                {extra.pricePerDay.toLocaleString("tr-TR")} ₺
              </p>
              <p className="text-[10px] text-muted-foreground">
                {extra.priceType === "PER_DAY" ? "/ gün" : "tek seferlik"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
