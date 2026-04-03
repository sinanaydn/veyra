import { apiClient } from "./client";
import type { Car, CarFilters, CarSortOption } from "@/features/cars/types/car.types";

export const carsApi = {
  getAll: (filters?: CarFilters, sort?: CarSortOption): Promise<Car[]> =>
    apiClient.get("/cars", { params: { ...filters, sort } }).then((r) => r.data),

  getBySlug: (slug: string): Promise<Car> =>
    apiClient.get(`/cars/${slug}`).then((r) => r.data),

  getById: (id: string): Promise<Car> =>
    apiClient.get(`/cars/id/${id}`).then((r) => r.data),

  getFeatured: (limit = 4): Promise<Car[]> =>
    apiClient.get("/cars/featured", { params: { limit } }).then((r) => r.data),

  getSimilar: (carId: string, limit = 3): Promise<Car[]> =>
    apiClient.get("/cars", { params: { limit } }).then((r) => r.data),

  create: (data: Omit<Car, "id" | "slug">): Promise<Car> =>
    apiClient.post("/cars", data).then((r) => r.data),

  update: (id: string, data: Partial<Car>): Promise<Car> =>
    apiClient.put(`/cars/${id}`, data).then((r) => r.data),

  remove: (id: string): Promise<void> =>
    apiClient.delete(`/cars/${id}`).then((r) => r.data),
};
