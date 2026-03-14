import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modelsService } from "../services/models.service";
import { modelKeys } from "./useModels";
import type { CarModel } from "../types/model.types";

export function useCreateModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<CarModel, "id">) => modelsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: modelKeys.all });
    },
  });
}

export function useUpdateModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CarModel> }) =>
      modelsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: modelKeys.all });
    },
  });
}

export function useDeleteModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => modelsService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: modelKeys.all });
    },
  });
}
