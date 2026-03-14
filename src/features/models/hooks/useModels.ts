import { useQuery } from "@tanstack/react-query";
import { modelsService } from "../services/models.service";

export const modelKeys = {
  all: ["models"] as const,
  withStats: ["models", "stats"] as const,
  byBrand: (brandId: string) => ["models", "brand", brandId] as const,
};

export function useModels() {
  return useQuery({
    queryKey: modelKeys.all,
    queryFn: () => modelsService.getAll(),
  });
}

export function useModelsWithStats() {
  return useQuery({
    queryKey: modelKeys.withStats,
    queryFn: () => modelsService.getAllWithStats(),
  });
}

export function useModelsByBrand(brandId: string) {
  return useQuery({
    queryKey: modelKeys.byBrand(brandId),
    queryFn: () => modelsService.getByBrandId(brandId),
    enabled: !!brandId,
  });
}
