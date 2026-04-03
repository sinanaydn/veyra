import { rentalsApi } from "@/lib/api/rentals.api";
import type { Reservation, ReservationStatus } from "../types/rental.types";

export interface AdminReservation extends Reservation {
  userName: string | null;
  userEmail: string | null;
}

export const rentalsService = {
  async getAll(): Promise<Reservation[]> {
    return rentalsApi.getAll();
  },

  async getByUserId(userId: string): Promise<Reservation[]> {
    return rentalsApi.getByUserId(userId);
  },

  async getById(id: string): Promise<Reservation | null> {
    return rentalsApi.getById(id).catch(() => null);
  },

  async getByStatus(status: ReservationStatus): Promise<Reservation[]> {
    const all = await rentalsApi.getAll();
    return all.filter((r) => r.status === status);
  },

  async getRecent(limit: number = 5): Promise<Reservation[]> {
    const all = await rentalsApi.getAll();
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },

  async getUpcoming(userId: string): Promise<Reservation[]> {
    const now = new Date();
    const userRes = await rentalsApi.getByUserId(userId);
    return userRes
      .filter(
        (r) =>
          (r.status === "CONFIRMED" || r.status === "PENDING") &&
          new Date(r.pickupDateTime) > now
      )
      .sort(
        (a, b) =>
          new Date(a.pickupDateTime).getTime() - new Date(b.pickupDateTime).getTime()
      );
  },

  async getUserStats(userId: string): Promise<{
    total: number;
    active: number;
    completed: number;
    totalSpent: number;
  }> {
    const userRes = await rentalsApi.getByUserId(userId);
    return {
      total: userRes.length,
      active: userRes.filter(
        (r) => r.status === "CONFIRMED" || r.status === "ACTIVE" || r.status === "PENDING"
      ).length,
      completed: userRes.filter((r) => r.status === "COMPLETED").length,
      totalSpent: userRes
        .filter((r) => r.status === "COMPLETED")
        .reduce((sum, r) => sum + r.grandTotal, 0),
    };
  },

  async getAllForAdmin(): Promise<AdminReservation[]> {
    const all = await rentalsApi.getAll();
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((r) => ({ ...r, userName: null, userEmail: null }));
  },

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation> {
    return rentalsApi.updateStatus(id, status);
  },

  async getStats() {
    return rentalsApi.getStats();
  },
};
