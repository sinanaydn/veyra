import { useCallback, useMemo, useState } from "react";
import type {
  CarFilters,
  CarSortOption,
  Transmission,
  FuelType,
  AvailabilityStatus,
} from "../types/car.types";
import type { CarCategory } from "@/features/models/types/model.types";

const INITIAL_FILTERS: CarFilters = {};
const INITIAL_SORT: CarSortOption = "RECOMMENDED";

export function useFleetFilters() {
  const [filters, setFilters] = useState<CarFilters>(INITIAL_FILTERS);
  const [sort, setSort] = useState<CarSortOption>(INITIAL_SORT);

  const updateFilter = useCallback(
    <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => {
      setFilters((prev) => {
        if (value === undefined || value === "" || value === null) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return { ...prev, [key]: value };
      });
    },
    []
  );

  const clearFilter = useCallback((key: keyof CarFilters) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const resetSort = useCallback(() => {
    setSort(INITIAL_SORT);
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

  const hasActiveFilters = activeFilterCount > 0;

  return {
    filters,
    sort,
    setSort,
    updateFilter,
    clearFilter,
    clearAllFilters,
    resetSort,
    activeFilterCount,
    hasActiveFilters,
  };
}

// Label maps for the UI
export const sortLabels: Record<CarSortOption, string> = {
  RECOMMENDED: "Önerilen",
  PRICE_ASC: "Fiyat (Artan)",
  PRICE_DESC: "Fiyat (Azalan)",
  NEWEST: "En Yeni",
  PREMIUM_FIRST: "Premium Önce",
};

export const categoryLabels: Record<CarCategory, string> = {
  ECONOMY: "Ekonomik",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

export const transmissionLabels: Record<Transmission, string> = {
  AUTOMATIC: "Otomatik",
  MANUAL: "Manuel",
};

export const fuelLabels: Record<FuelType, string> = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  HYBRID: "Hibrit",
  ELECTRIC: "Elektrik",
};

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  AVAILABLE: "Müsait",
  RESERVED: "Rezerve",
  MAINTENANCE: "Bakımda",
};

export const filterLabels: Record<keyof CarFilters, string> = {
  city: "Şehir",
  brandId: "Marka",
  modelId: "Model",
  transmission: "Vites",
  fuelType: "Yakıt",
  category: "Segment",
  minSeats: "Min. Yolcu",
  minBaggage: "Min. Bagaj",
  minPrice: "Min. Fiyat",
  maxPrice: "Maks. Fiyat",
  airportEligible: "Havalimanı",
  availability: "Müsaitlik",
};
