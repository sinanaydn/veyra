import { apiClient } from "./client";
import type { Reservation, ReservationStatus } from "@/features/rentals/types/rental.types";

export interface CreateRentalPayload {
  carId: string;
  pickupLocation: string;
  pickupDateTime: string;
  returnLocation: string;
  returnDateTime: string;
  days: number;
  subtotal: number;
  deposit: number;
  extrasTotal: number;
  grandTotal: number;
}

export interface RentalStatsResponse {
  total: number;
  pending: number;
  confirmed: number;
  active: number;
  completed: number;
  cancelled: number;
  totalRevenue: number;
}

export const rentalsApi = {
  getAll: (): Promise<Reservation[]> =>
    apiClient.get("/rentals").then((r) => r.data),

  getById: (id: string): Promise<Reservation> =>
    apiClient.get(`/rentals/${id}`).then((r) => r.data),

  getByUserId: (userId: string): Promise<Reservation[]> =>
    apiClient.get(`/rentals/user/${userId}`).then((r) => r.data),

  getStats: (): Promise<RentalStatsResponse> =>
    apiClient.get("/rentals/stats").then((r) => r.data),

  create: (data: CreateRentalPayload): Promise<Reservation> =>
    apiClient.post("/rentals", data).then((r) => r.data),

  updateStatus: (id: string, status: ReservationStatus): Promise<Reservation> =>
    apiClient.put(`/rentals/${id}/status`, { status }).then((r) => r.data),
};
