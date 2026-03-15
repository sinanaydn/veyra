import { mockCars } from "@/lib/mocks/cars";
import { delay } from "@/lib/utils";
import type { Car, CarFilters, CarSortOption } from "../types/car.types";

function applySorting(cars: Car[], sort: CarSortOption): Car[] {
  const sorted = [...cars];
  switch (sort) {
    case "PRICE_ASC":
      return sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    case "PRICE_DESC":
      return sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    case "NEWEST":
      return sorted.sort((a, b) => b.year - a.year);
    case "PREMIUM_FIRST": {
      const order = { VIP: 0, EXECUTIVE: 1, SUV: 2, SEDAN: 3, ECONOMY: 4 };
      return sorted.sort(
        (a, b) => (order[a.category] ?? 5) - (order[b.category] ?? 5)
      );
    }
    case "RECOMMENDED":
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
  }
}

export const carsService = {
  async getAll(
    filters?: CarFilters,
    sort: CarSortOption = "RECOMMENDED"
  ): Promise<Car[]> {
    await delay(300);
    let result = [...mockCars];

    if (filters) {
      if (filters.city) {
        result = result.filter((c) => c.city === filters.city);
      }
      if (filters.brandId) {
        result = result.filter((c) => c.brandId === filters.brandId);
      }
      if (filters.modelId) {
        result = result.filter((c) => c.modelId === filters.modelId);
      }
      if (filters.transmission) {
        result = result.filter((c) => c.transmission === filters.transmission);
      }
      if (filters.fuelType) {
        result = result.filter((c) => c.fuelType === filters.fuelType);
      }
      if (filters.category) {
        result = result.filter((c) => c.category === filters.category);
      }
      if (filters.minSeats) {
        result = result.filter((c) => c.seats >= filters.minSeats!);
      }
      if (filters.minBaggage) {
        result = result.filter((c) => c.baggage >= filters.minBaggage!);
      }
      if (filters.minPrice) {
        result = result.filter((c) => c.pricePerDay >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        result = result.filter((c) => c.pricePerDay <= filters.maxPrice!);
      }
      if (filters.airportEligible !== undefined) {
        result = result.filter(
          (c) => c.airportEligible === filters.airportEligible
        );
      }
      if (filters.availability) {
        result = result.filter(
          (c) => c.availability === filters.availability
        );
      }
    }

    return applySorting(result, sort);
  },

  async getBySlug(slug: string): Promise<Car | null> {
    await delay(300);
    return mockCars.find((c) => c.slug === slug) ?? null;
  },

  async getById(id: string): Promise<Car | null> {
    await delay(300);
    return mockCars.find((c) => c.id === id) ?? null;
  },

  async getFeatured(limit: number = 4): Promise<Car[]> {
    await delay(300);
    return [...mockCars]
      .filter((c) => c.availability === "AVAILABLE")
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },

  async getSimilar(carId: string, limit: number = 3): Promise<Car[]> {
    await delay(300);
    const car = mockCars.find((c) => c.id === carId);
    if (!car) return [];
    return mockCars
      .filter(
        (c) =>
          c.id !== carId &&
          (c.category === car.category || c.city === car.city)
      )
      .slice(0, limit);
  },

  // --- Admin mutations (mock) ---

  async create(data: Omit<Car, "id" | "slug">): Promise<Car> {
    await delay(500);
    const id = `car-${Date.now()}`;
    const slug = `${data.brandName}-${data.modelName}-${data.year}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    const newCar: Car = { ...data, id, slug };
    mockCars.push(newCar);
    return newCar;
  },

  async update(id: string, data: Partial<Car>): Promise<Car> {
    await delay(500);
    const index = mockCars.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Araç bulunamadı.");
    mockCars[index] = { ...mockCars[index], ...data };
    return mockCars[index];
  },

  async remove(id: string): Promise<void> {
    await delay(400);
    const index = mockCars.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Araç bulunamadı.");
    mockCars.splice(index, 1);
  },
};
