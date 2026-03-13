import type { CarCategory } from "@/features/models/types/model.types";

export type Transmission = "AUTOMATIC" | "MANUAL";
export type FuelType = "GASOLINE" | "DIESEL" | "HYBRID" | "ELECTRIC";
export type FuelPolicy = "FULL_TO_FULL" | "SAME_TO_SAME" | "PRE_PURCHASE";
export type AvailabilityStatus = "AVAILABLE" | "RESERVED" | "MAINTENANCE";

export interface InsurancePackage {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  coverageItems: string[];
}

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  priceType: "PER_DAY" | "ONE_TIME";
}

export interface Car {
  id: string;
  slug: string;
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  year: number;
  category: CarCategory;
  city: string;
  pickupLocations: string[];
  returnLocations: string[];
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  baggage: number;
  doors: number;
  imageUrls: string[];
  pricePerDay: number;
  depositAmount: number;
  mileageLimit: number;
  fuelPolicy: FuelPolicy;
  availability: AvailabilityStatus;
  airportEligible: boolean;
  description: string;
  features: string[];
  insurancePackages: InsurancePackage[];
  extras: ExtraService[];
  rating: number;
  reviewCount: number;
}

export interface CarFilters {
  city?: string;
  brandId?: string;
  modelId?: string;
  transmission?: Transmission;
  fuelType?: FuelType;
  category?: CarCategory;
  minSeats?: number;
  minBaggage?: number;
  minPrice?: number;
  maxPrice?: number;
  airportEligible?: boolean;
  availability?: AvailabilityStatus;
}

export type CarSortOption =
  | "RECOMMENDED"
  | "PRICE_ASC"
  | "PRICE_DESC"
  | "NEWEST"
  | "PREMIUM_FIRST";
