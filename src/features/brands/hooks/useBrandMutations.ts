import { useMutation, useQueryClient } from "@tanstack/react-query";
import { brandsService } from "../services/brands.service";
import { brandKeys } from "./useBrands";
import type { Brand } from "../types/brand.types";

export function useCreateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Brand, "id">) => brandsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: brandKeys.all });
    },
  });
}

export function useUpdateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Brand> }) =>
      brandsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: brandKeys.all });
    },
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => brandsService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: brandKeys.all });
    },
  });
}
