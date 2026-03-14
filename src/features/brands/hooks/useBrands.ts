import { useQuery } from "@tanstack/react-query";
import { brandsService } from "../services/brands.service";

export const brandKeys = {
  all: ["brands"] as const,
  withStats: ["brands", "stats"] as const,
  detail: (id: string) => ["brands", id] as const,
};

export function useBrands() {
  return useQuery({
    queryKey: brandKeys.all,
    queryFn: () => brandsService.getAll(),
  });
}

export function useBrandsWithStats() {
  return useQuery({
    queryKey: brandKeys.withStats,
    queryFn: () => brandsService.getAllWithStats(),
  });
}
