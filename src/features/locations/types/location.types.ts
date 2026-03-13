export type LocationType = "OFFICE" | "AIRPORT";

export interface Location {
  id: string;
  city: string;
  label: string;
  type: LocationType;
  address: string;
  phone: string;
}
