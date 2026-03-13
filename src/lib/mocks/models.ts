import type { CarModel } from "@/features/models/types/model.types";

export const mockModels: CarModel[] = [
  // BMW
  { id: "model-1", brandId: "brand-1", name: "3 Serisi", category: "SEDAN" },
  { id: "model-2", brandId: "brand-1", name: "5 Serisi", category: "EXECUTIVE" },
  { id: "model-3", brandId: "brand-1", name: "X3", category: "SUV" },
  { id: "model-4", brandId: "brand-1", name: "7 Serisi", category: "VIP" },
  // Mercedes-Benz
  { id: "model-5", brandId: "brand-2", name: "C Serisi", category: "SEDAN" },
  { id: "model-6", brandId: "brand-2", name: "E Serisi", category: "EXECUTIVE" },
  { id: "model-7", brandId: "brand-2", name: "S Serisi", category: "VIP" },
  { id: "model-8", brandId: "brand-2", name: "GLC", category: "SUV" },
  // Audi
  { id: "model-9", brandId: "brand-3", name: "A4", category: "SEDAN" },
  { id: "model-10", brandId: "brand-3", name: "A6", category: "EXECUTIVE" },
  { id: "model-11", brandId: "brand-3", name: "Q5", category: "SUV" },
  // Toyota
  { id: "model-12", brandId: "brand-4", name: "Corolla", category: "SEDAN" },
  { id: "model-13", brandId: "brand-4", name: "Yaris", category: "ECONOMY" },
  { id: "model-14", brandId: "brand-4", name: "RAV4", category: "SUV" },
  // Fiat
  { id: "model-15", brandId: "brand-5", name: "Egea", category: "ECONOMY" },
  { id: "model-16", brandId: "brand-5", name: "500", category: "ECONOMY" },
  // Renault
  { id: "model-17", brandId: "brand-6", name: "Clio", category: "ECONOMY" },
  { id: "model-18", brandId: "brand-6", name: "Megane", category: "SEDAN" },
  // Volkswagen
  { id: "model-19", brandId: "brand-7", name: "Golf", category: "ECONOMY" },
  { id: "model-20", brandId: "brand-7", name: "Passat", category: "SEDAN" },
  { id: "model-21", brandId: "brand-7", name: "Tiguan", category: "SUV" },
  // Volvo
  { id: "model-22", brandId: "brand-8", name: "XC60", category: "SUV" },
  { id: "model-23", brandId: "brand-8", name: "S90", category: "EXECUTIVE" },
];
