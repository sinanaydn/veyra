import { modelsApi } from "@/lib/api/models.api";
import type { CarModel } from "../types/model.types";

export interface CarModelWithStats extends CarModel {
  brandName: string | null;
  carCount: number | null;
}

export const modelsService = {
  async getAll(): Promise<CarModel[]> {
    return modelsApi.getAll();
  },

  async getAllWithStats(): Promise<CarModelWithStats[]> {
    const models = await modelsApi.getAll();
    return models.map((m) => ({ ...m, brandName: null, carCount: null }));
  },

  async getByBrandId(brandId: string): Promise<CarModel[]> {
    return modelsApi.getByBrandId(brandId);
  },

  async getById(id: string): Promise<CarModel | null> {
    return modelsApi.getById(id).catch(() => null);
  },

  async create(data: Omit<CarModel, "id">): Promise<CarModel> {
    return modelsApi.create(data);
  },

  async update(id: string, data: Partial<CarModel>): Promise<CarModel> {
    return modelsApi.update(id, data);
  },

  async remove(id: string): Promise<void> {
    return modelsApi.remove(id);
  },
};
