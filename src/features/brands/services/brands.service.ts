import { mockBrands } from "@/lib/mocks/brands";
import type { Brand } from "../types/brand.types";

const delay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const brandsService = {
  async getAll(): Promise<Brand[]> {
    await delay();
    return [...mockBrands];
  },

  async getById(id: string): Promise<Brand | null> {
    await delay();
    return mockBrands.find((b) => b.id === id) ?? null;
  },
};
