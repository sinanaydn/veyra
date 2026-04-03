import { apiClient } from "./client";
import type { CarModel } from "@/features/models/types/model.types";

export const modelsApi = {
  getAll: (): Promise<CarModel[]> =>
    apiClient.get("/carmodels").then((r) => r.data),

  getByBrandId: (brandId: string): Promise<CarModel[]> =>
    apiClient.get(`/carmodels/brand/${brandId}`).then((r) => r.data),

  getById: (id: string): Promise<CarModel> =>
    apiClient.get(`/carmodels/${id}`).then((r) => r.data),

  create: (data: Omit<CarModel, "id">): Promise<CarModel> =>
    apiClient.post("/carmodels", data).then((r) => r.data),

  update: (id: string, data: Partial<CarModel>): Promise<CarModel> =>
    apiClient.put(`/carmodels/${id}`, data).then((r) => r.data),

  remove: (id: string): Promise<void> =>
    apiClient.delete(`/carmodels/${id}`).then((r) => r.data),
};
