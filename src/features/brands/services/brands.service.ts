import { brandsApi } from "@/lib/api/brands.api";
import type { Brand } from "../types/brand.types";

export interface BrandWithStats extends Brand {
  modelCount: number | null;
  carCount: number | null;
}

export const brandsService = {
  async getAll(): Promise<Brand[]> {
    return brandsApi.getAll();
  },

  async getAllWithStats(): Promise<BrandWithStats[]> {
    const brands = await brandsApi.getAll();
    return brands.map((b) => ({ ...b, modelCount: null, carCount: null }));
  },

  async getById(id: string): Promise<Brand | null> {
    return brandsApi.getById(id).catch(() => null);
  },

  async create(data: Omit<Brand, "id">): Promise<Brand> {
    return brandsApi.create(data);
  },

  async update(id: string, data: Partial<Brand>): Promise<Brand> {
    return brandsApi.update(id, data);
  },

  async remove(id: string): Promise<void> {
    return brandsApi.remove(id);
  },
};
