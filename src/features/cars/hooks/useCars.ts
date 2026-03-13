import { useQuery } from "@tanstack/react-query";
import { carsService } from "../services/cars.service";
import type { CarFilters, CarSortOption } from "../types/car.types";

export const carKeys = {
  all: ["cars"] as const,
  list: (filters?: CarFilters, sort?: CarSortOption) =>
    ["cars", "list", filters, sort] as const,
  detail: (slug: string) => ["cars", "detail", slug] as const,
  featured: (limit?: number) => ["cars", "featured", limit] as const,
  similar: (carId: string) => ["cars", "similar", carId] as const,
};

export function useCars(filters?: CarFilters, sort?: CarSortOption) {
  return useQuery({
    queryKey: carKeys.list(filters, sort),
    queryFn: () => carsService.getAll(filters, sort),
  });
}

export function useCarBySlug(slug: string) {
  return useQuery({
    queryKey: carKeys.detail(slug),
    queryFn: () => carsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedCars(limit?: number) {
  return useQuery({
    queryKey: carKeys.featured(limit),
    queryFn: () => carsService.getFeatured(limit),
  });
}

export function useSimilarCars(carId: string) {
  return useQuery({
    queryKey: carKeys.similar(carId),
    queryFn: () => carsService.getSimilar(carId),
    enabled: !!carId,
  });
}
