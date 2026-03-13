import { useQuery } from "@tanstack/react-query";
import { locationsService } from "../services/locations.service";
import type { LocationType } from "../types/location.types";

export const locationKeys = {
  all: ["locations"] as const,
  byCity: (city: string) => ["locations", "city", city] as const,
  byType: (type: LocationType) => ["locations", "type", type] as const,
  cities: ["locations", "cities"] as const,
};

export function useLocations() {
  return useQuery({
    queryKey: locationKeys.all,
    queryFn: () => locationsService.getAll(),
  });
}

export function useLocationsByCity(city: string) {
  return useQuery({
    queryKey: locationKeys.byCity(city),
    queryFn: () => locationsService.getByCity(city),
    enabled: !!city,
  });
}

export function useCities() {
  return useQuery({
    queryKey: locationKeys.cities,
    queryFn: () => locationsService.getCities(),
  });
}
