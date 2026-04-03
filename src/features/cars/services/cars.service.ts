import { carsApi } from "@/lib/api/cars.api";
import type { Car, CarFilters, CarSortOption } from "../types/car.types";

export const carsService = {
  async getAll(filters?: CarFilters, sort: CarSortOption = "RECOMMENDED"): Promise<Car[]> {
    return carsApi.getAll(filters, sort);
  },

  async getBySlug(slug: string): Promise<Car | null> {
    return carsApi.getBySlug(slug).catch(() => null);
  },

  async getById(id: string): Promise<Car | null> {
    return carsApi.getById(id).catch(() => null);
  },

  async getFeatured(limit: number = 4): Promise<Car[]> {
    return carsApi.getFeatured(limit);
  },

  async getSimilar(carId: string, limit: number = 3): Promise<Car[]> {
    return carsApi.getSimilar(carId, limit);
  },

  async create(data: Omit<Car, "id" | "slug">): Promise<Car> {
    return carsApi.create(data);
  },

  async update(id: string, data: Partial<Car>): Promise<Car> {
    return carsApi.update(id, data);
  },

  async remove(id: string): Promise<void> {
    return carsApi.remove(id);
  },
};
