import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carsService } from "../services/cars.service";
import { carKeys } from "./useCars";
import type { Car } from "../types/car.types";

export function useCreateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Car, "id" | "slug">) => carsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}

export function useUpdateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Car> }) =>
      carsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}

export function useDeleteCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => carsService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}
