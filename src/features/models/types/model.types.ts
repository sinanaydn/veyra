export type CarCategory =
  | "ECONOMY"
  | "SEDAN"
  | "SUV"
  | "EXECUTIVE"
  | "VIP";

export interface CarModel {
  id: string;
  brandId: string;
  name: string;
  category: CarCategory;
}
