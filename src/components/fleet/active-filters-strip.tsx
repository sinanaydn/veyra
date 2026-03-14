"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarFilters } from "@/features/cars/types/car.types";
import { useBrands } from "@/features/brands/hooks/useBrands";
import { useModels } from "@/features/models/hooks/useModels";
import {
  filterLabels,
  categoryLabels,
  transmissionLabels,
  fuelLabels,
  availabilityLabels,
} from "@/features/cars/hooks/useFleetFilters";

interface ActiveFiltersStripProps {
  filters: CarFilters;
  clearFilter: (key: keyof CarFilters) => void;
  clearAllFilters: () => void;
}

export function ActiveFiltersStrip({
  filters,
  clearFilter,
  clearAllFilters,
}: ActiveFiltersStripProps) {
  const { data: brands } = useBrands();
  const { data: models } = useModels();

  const activeEntries = Object.entries(filters).filter(
    ([, value]) => value !== undefined
  );

  if (activeEntries.length === 0) return null;

  function getDisplayValue(key: string, value: unknown): string {
    switch (key) {
      case "city":
        return String(value);
      case "brandId":
        return brands?.find((b) => b.id === value)?.name ?? String(value);
      case "modelId":
        return models?.find((m) => m.id === value)?.name ?? String(value);
      case "category":
        return categoryLabels[value as keyof typeof categoryLabels] ?? String(value);
      case "transmission":
        return transmissionLabels[value as keyof typeof transmissionLabels] ?? String(value);
      case "fuelType":
        return fuelLabels[value as keyof typeof fuelLabels] ?? String(value);
      case "availability":
        return availabilityLabels[value as keyof typeof availabilityLabels] ?? String(value);
      case "airportEligible":
        return value ? "Evet" : "Hayır";
      case "minSeats":
        return `${value}+ koltuk`;
      case "minBaggage":
        return `${value}+ bavul`;
      case "minPrice":
        return `${Number(value).toLocaleString("tr-TR")} ₺+`;
      case "maxPrice":
        return `≤ ${Number(value).toLocaleString("tr-TR")} ₺`;
      default:
        return String(value);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeEntries.map(([key, value]) => (
        <Badge
          key={key}
          variant="secondary"
          className="gap-1 pr-1 text-xs"
        >
          <span className="text-muted-foreground">
            {filterLabels[key as keyof CarFilters]}:
          </span>{" "}
          {getDisplayValue(key, value)}
          <button
            onClick={() => clearFilter(key as keyof CarFilters)}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {activeEntries.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="h-6 text-xs text-muted-foreground"
        >
          Tümünü temizle
        </Button>
      )}
    </div>
  );
}
