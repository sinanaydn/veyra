"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useCars } from "@/features/cars/hooks/useCars";
import { useFleetFilters } from "@/features/cars/hooks/useFleetFilters";
import { FleetFilters } from "./fleet-filters";
import { FleetSortBar } from "./fleet-sort-bar";
import { ActiveFiltersStrip } from "./active-filters-strip";
import { FleetCarCard } from "./fleet-car-card";
import { FleetLoading } from "./fleet-loading";

export function FleetShell() {
  const {
    filters,
    sort,
    setSort,
    updateFilter,
    clearFilter,
    clearAllFilters,
    activeFilterCount,
    hasActiveFilters,
  } = useFleetFilters();

  const { data: cars, isLoading } = useCars(filters, sort);
  const resultCount = cars?.length ?? 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          Araç Filomuz
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          İhtiyacınıza uygun aracı filtreleyin ve hemen rezervasyon yapın.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FleetFilters
              filters={filters}
              updateFilter={updateFilter}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </aside>

        {/* Main content area */}
        <div className="min-w-0 flex-1">
          {/* Sort bar (includes mobile filter trigger) */}
          <div className="sticky top-16 z-10 -mx-4 bg-background/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
            <FleetSortBar
              resultCount={resultCount}
              sort={sort}
              setSort={setSort}
              filters={filters}
              updateFilter={updateFilter}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Active filters strip */}
          {hasActiveFilters && (
            <div className="mt-3">
              <ActiveFiltersStrip
                filters={filters}
                clearFilter={clearFilter}
                clearAllFilters={clearAllFilters}
              />
            </div>
          )}

          {/* Results */}
          <div className="mt-5">
            {isLoading ? (
              <FleetLoading count={4} />
            ) : resultCount === 0 ? (
              <EmptyState
                icon={SearchX}
                title="Araç bulunamadı"
                description="Seçtiğiniz filtre kriterlerine uygun araç bulunamadı. Filtreleri değiştirmeyi veya temizlemeyi deneyin."
                action={
                  hasActiveFilters ? (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                    >
                      Filtreleri Temizle
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <div className="space-y-4">
                {cars?.map((car) => (
                  <FleetCarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
