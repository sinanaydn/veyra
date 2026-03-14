"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MobileFilters } from "./mobile-filters";
import type { CarFilters, CarSortOption } from "@/features/cars/types/car.types";
import { sortLabels } from "@/features/cars/hooks/useFleetFilters";

interface FleetSortBarProps {
  resultCount: number;
  sort: CarSortOption;
  setSort: (sort: CarSortOption) => void;
  // pass-through for mobile filters
  filters: CarFilters;
  updateFilter: <K extends keyof CarFilters>(
    key: K,
    value: CarFilters[K]
  ) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function FleetSortBar({
  resultCount,
  sort,
  setSort,
  filters,
  updateFilter,
  clearAllFilters,
  hasActiveFilters,
  activeFilterCount,
}: FleetSortBarProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Mobile filter trigger */}
        <MobileFilters
          filters={filters}
          updateFilter={updateFilter}
          clearAllFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
        />

        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultCount}</span>{" "}
          araç bulundu
        </p>
      </div>

      <Select
        value={sort}
        onValueChange={(val) => setSort(val as CarSortOption)}
      >
        <SelectTrigger className="w-auto gap-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {(Object.entries(sortLabels) as [CarSortOption, string][]).map(
            ([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
