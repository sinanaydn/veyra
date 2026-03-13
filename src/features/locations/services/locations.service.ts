import { mockLocations } from "@/lib/mocks/locations";
import type { Location, LocationType } from "../types/location.types";

const delay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const locationsService = {
  async getAll(): Promise<Location[]> {
    await delay();
    return [...mockLocations];
  },

  async getByCity(city: string): Promise<Location[]> {
    await delay();
    return mockLocations.filter((l) => l.city === city);
  },

  async getByType(type: LocationType): Promise<Location[]> {
    await delay();
    return mockLocations.filter((l) => l.type === type);
  },

  async getCities(): Promise<string[]> {
    await delay();
    return [...new Set(mockLocations.map((l) => l.city))];
  },

  async getById(id: string): Promise<Location | null> {
    await delay();
    return mockLocations.find((l) => l.id === id) ?? null;
  },
};
