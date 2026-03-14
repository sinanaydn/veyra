import { mockModels } from "@/lib/mocks/models";
import { mockBrands } from "@/lib/mocks/brands";
import { mockCars } from "@/lib/mocks/cars";
import type { CarModel } from "../types/model.types";

const delay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface CarModelWithStats extends CarModel {
  brandName: string;
  carCount: number;
}

export const modelsService = {
  async getAll(): Promise<CarModel[]> {
    await delay();
    return [...mockModels];
  },

  async getAllWithStats(): Promise<CarModelWithStats[]> {
    await delay();
    return mockModels.map((m) => ({
      ...m,
      brandName:
        mockBrands.find((b) => b.id === m.brandId)?.name ?? "Bilinmeyen",
      carCount: mockCars.filter((c) => c.modelId === m.id).length,
    }));
  },

  async getByBrandId(brandId: string): Promise<CarModel[]> {
    await delay();
    return mockModels.filter((m) => m.brandId === brandId);
  },

  async getById(id: string): Promise<CarModel | null> {
    await delay();
    return mockModels.find((m) => m.id === id) ?? null;
  },

  async create(data: Omit<CarModel, "id">): Promise<CarModel> {
    await delay(400);
    const id = `model-${Date.now()}`;
    const newModel: CarModel = { ...data, id };
    mockModels.push(newModel);
    return newModel;
  },

  async update(id: string, data: Partial<CarModel>): Promise<CarModel> {
    await delay(400);
    const index = mockModels.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Model bulunamadı.");
    mockModels[index] = { ...mockModels[index], ...data };
    return mockModels[index];
  },

  async remove(id: string): Promise<void> {
    await delay(300);
    const index = mockModels.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Model bulunamadı.");
    mockModels.splice(index, 1);
  },
};
