"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FleetFilters } from "./fleet-filters";
import type { CarFilters } from "@/features/cars/types/car.types";
import { useState } from "react";

interface MobileFiltersProps {
  filters: CarFilters;
  updateFilter: <K extends keyof CarFilters>(
    key: K,
    value: CarFilters[K]
  ) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function MobileFilters({
  filters,
  updateFilter,
  clearAllFilters,
  hasActiveFilters,
  activeFilterCount,
}: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-input bg-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filtreler
        {activeFilterCount > 0 && (
          <span className="ml-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {activeFilterCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="w-[320px] p-5">
        <SheetHeader className="sr-only">
          <SheetTitle>Filtreler</SheetTitle>
        </SheetHeader>
        <FleetFilters
          filters={filters}
          updateFilter={updateFilter}
          clearAllFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
          onDone={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
