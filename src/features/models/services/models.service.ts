import { mockModels } from "@/lib/mocks/models";
import type { CarModel } from "../types/model.types";

const delay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const modelsService = {
  async getAll(): Promise<CarModel[]> {
    await delay();
    return [...mockModels];
  },

  async getByBrandId(brandId: string): Promise<CarModel[]> {
    await delay();
    return mockModels.filter((m) => m.brandId === brandId);
  },

  async getById(id: string): Promise<CarModel | null> {
    await delay();
    return mockModels.find((m) => m.id === id) ?? null;
  },
};
