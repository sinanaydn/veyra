"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

import { useBrands } from "@/features/brands/hooks/useBrands";
import { useModelsByBrand } from "@/features/models/hooks/useModels";
import { useCities } from "@/features/locations/hooks/useLocations";
import type { CarFilters } from "@/features/cars/types/car.types";
import type { CarCategory } from "@/features/models/types/model.types";
import {
  categoryLabels,
  transmissionLabels,
  fuelLabels,
  availabilityLabels,
} from "@/features/cars/hooks/useFleetFilters";

interface FleetFiltersProps {
  filters: CarFilters;
  updateFilter: <K extends keyof CarFilters>(
    key: K,
    value: CarFilters[K]
  ) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  onDone?: () => void; // for mobile drawer close
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </Label>
      {children}
    </div>
  );
}

export function FleetFilters({
  filters,
  updateFilter,
  clearAllFilters,
  hasActiveFilters,
  onDone,
}: FleetFiltersProps) {
  const { data: cities } = useCities();
  const { data: brands } = useBrands();
  const { data: models } = useModelsByBrand(filters.brandId ?? "");

  const categories: CarCategory[] = [
    "ECONOMY",
    "SEDAN",
    "SUV",
    "EXECUTIVE",
    "VIP",
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-4">
        <h3 className="font-heading text-sm font-semibold">Filtreler</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 gap-1 text-xs text-muted-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Temizle
          </Button>
        )}
      </div>

      <Separator />

      <ScrollArea className="flex-1 py-4">
        <div className="space-y-5 pr-3">
          {/* City */}
          <FilterSection title="Şehir">
            <Select
              value={filters.city ?? ""}
              onValueChange={(val) =>
                updateFilter("city", val || undefined)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tüm şehirler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm şehirler</SelectItem>
                {cities?.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Brand */}
          <FilterSection title="Marka">
            <Select
              value={filters.brandId ?? ""}
              onValueChange={(val) => {
                updateFilter("brandId", val || undefined);
                if (!val) updateFilter("modelId", undefined);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tüm markalar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm markalar</SelectItem>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Model — only if brand selected */}
          {filters.brandId && (
            <FilterSection title="Model">
              <Select
                value={filters.modelId ?? ""}
                onValueChange={(val) =>
                  updateFilter("modelId", val || undefined)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tüm modeller" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tüm modeller</SelectItem>
                  {models?.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterSection>
          )}

          {/* Category/Segment */}
          <FilterSection title="Segment">
            <Select
              value={filters.category ?? ""}
              onValueChange={(val) =>
                updateFilter(
                  "category",
                  (val as CarCategory) || undefined
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tüm segmentler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm segmentler</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryLabels[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Transmission */}
          <FilterSection title="Vites">
            <Select
              value={filters.transmission ?? ""}
              onValueChange={(val) =>
                updateFilter(
                  "transmission",
                  (val as CarFilters["transmission"]) || undefined
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tümü</SelectItem>
                {(
                  Object.entries(transmissionLabels) as [string, string][]
                ).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Fuel Type */}
          <FilterSection title="Yakıt Tipi">
            <Select
              value={filters.fuelType ?? ""}
              onValueChange={(val) =>
                updateFilter(
                  "fuelType",
                  (val as CarFilters["fuelType"]) || undefined
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tümü</SelectItem>
                {(Object.entries(fuelLabels) as [string, string][]).map(
                  ([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Seats */}
          <FilterSection title="Minimum Yolcu">
            <Select
              value={String(filters.minSeats ?? "")}
              onValueChange={(val) =>
                updateFilter(
                  "minSeats",
                  val ? Number(val) : undefined
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Fark etmez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Fark etmez</SelectItem>
                <SelectItem value="2">2+ koltuk</SelectItem>
                <SelectItem value="4">4+ koltuk</SelectItem>
                <SelectItem value="5">5+ koltuk</SelectItem>
                <SelectItem value="7">7+ koltuk</SelectItem>
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Baggage */}
          <FilterSection title="Minimum Bagaj">
            <Select
              value={String(filters.minBaggage ?? "")}
              onValueChange={(val) =>
                updateFilter(
                  "minBaggage",
                  val ? Number(val) : undefined
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Fark etmez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Fark etmez</SelectItem>
                <SelectItem value="1">1+ bavul</SelectItem>
                <SelectItem value="2">2+ bavul</SelectItem>
                <SelectItem value="3">3+ bavul</SelectItem>
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Fiyat Aralığı (₺/gün)">
            <div className="px-1 pt-2">
              <Slider
                min={0}
                max={10000}
                step={250}
                value={[
                  filters.minPrice ?? 0,
                  filters.maxPrice ?? 10000,
                ]}
                onValueChange={(values: number[]) => {
                  updateFilter(
                    "minPrice",
                    values[0] > 0 ? values[0] : undefined
                  );
                  updateFilter(
                    "maxPrice",
                    values[1] < 10000 ? values[1] : undefined
                  );
                }}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>
                  {(filters.minPrice ?? 0).toLocaleString("tr-TR")} ₺
                </span>
                <span>
                  {(filters.maxPrice ?? 10000).toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Müsaitlik">
            <Select
              value={filters.availability ?? ""}
              onValueChange={(val) =>
                updateFilter(
                  "availability",
                  (val as CarFilters["availability"]) || undefined
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tümü</SelectItem>
                {(
                  Object.entries(availabilityLabels) as [string, string][]
                ).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Airport Eligible */}
          <FilterSection title="Havalimanı Uygunluğu">
            <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2.5">
              <span className="text-sm">Sadece havalimanı araçları</span>
              <Switch
                checked={filters.airportEligible === true}
                onCheckedChange={(checked) =>
                  updateFilter(
                    "airportEligible",
                    checked ? true : undefined
                  )
                }
              />
            </div>
          </FilterSection>
        </div>
      </ScrollArea>

      {/* Mobile done button */}
      {onDone && (
        <>
          <Separator />
          <div className="pt-4">
            <Button onClick={onDone} className="w-full">
              Sonuçları Gör
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
