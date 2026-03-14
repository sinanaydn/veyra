import { mockBrands } from "@/lib/mocks/brands";
import { mockModels } from "@/lib/mocks/models";
import { mockCars } from "@/lib/mocks/cars";
import type { Brand } from "../types/brand.types";

const delay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface BrandWithStats extends Brand {
  modelCount: number;
  carCount: number;
}

export const brandsService = {
  async getAll(): Promise<Brand[]> {
    await delay();
    return [...mockBrands];
  },

  async getAllWithStats(): Promise<BrandWithStats[]> {
    await delay();
    return mockBrands.map((b) => ({
      ...b,
      modelCount: mockModels.filter((m) => m.brandId === b.id).length,
      carCount: mockCars.filter((c) => c.brandId === b.id).length,
    }));
  },

  async getById(id: string): Promise<Brand | null> {
    await delay();
    return mockBrands.find((b) => b.id === id) ?? null;
  },

  async create(data: Omit<Brand, "id">): Promise<Brand> {
    await delay(400);
    const id = `brand-${Date.now()}`;
    const newBrand: Brand = { ...data, id };
    mockBrands.push(newBrand);
    return newBrand;
  },

  async update(id: string, data: Partial<Brand>): Promise<Brand> {
    await delay(400);
    const index = mockBrands.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Marka bulunamadı.");
    mockBrands[index] = { ...mockBrands[index], ...data };
    return mockBrands[index];
  },

  async remove(id: string): Promise<void> {
    await delay(300);
    const index = mockBrands.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Marka bulunamadı.");
    mockBrands.splice(index, 1);
  },
};
