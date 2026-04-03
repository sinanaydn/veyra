import { apiClient } from "./client";
import type { Brand } from "@/features/brands/types/brand.types";

export const brandsApi = {
  getAll: (): Promise<Brand[]> =>
    apiClient.get("/brands").then((r) => r.data),

  getAllWithStats: (): Promise<any[]> =>
    apiClient.get("/brands").then((r) => r.data),

  getById: (id: string): Promise<Brand> =>
    apiClient.get(`/brands/${id}`).then((r) => r.data),

  create: (data: Omit<Brand, "id">): Promise<Brand> =>
    apiClient.post("/brands", data).then((r) => r.data),

  update: (id: string, data: Partial<Brand>): Promise<Brand> =>
    apiClient.put(`/brands/${id}`, data).then((r) => r.data),

  remove: (id: string): Promise<void> =>
    apiClient.delete(`/brands/${id}`).then((r) => r.data),
};
