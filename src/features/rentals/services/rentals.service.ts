import { mockReservations } from "@/lib/mocks/reservations";
import type { Reservation, ReservationStatus } from "../types/rental.types";

const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const rentalsService = {
  async getAll(): Promise<Reservation[]> {
    await delay();
    return [...mockReservations].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getByUserId(userId: string): Promise<Reservation[]> {
    await delay();
    return mockReservations
      .filter((r) => r.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  async getById(id: string): Promise<Reservation | null> {
    await delay();
    return mockReservations.find((r) => r.id === id) ?? null;
  },

  async getByStatus(status: ReservationStatus): Promise<Reservation[]> {
    await delay();
    return mockReservations.filter((r) => r.status === status);
  },

  async getRecent(limit: number = 5): Promise<Reservation[]> {
    await delay();
    return [...mockReservations]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  },

  async getStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    active: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    await delay();
    const all = mockReservations;
    return {
      total: all.length,
      pending: all.filter((r) => r.status === "PENDING").length,
      confirmed: all.filter((r) => r.status === "CONFIRMED").length,
      active: all.filter((r) => r.status === "ACTIVE").length,
      completed: all.filter((r) => r.status === "COMPLETED").length,
      cancelled: all.filter((r) => r.status === "CANCELLED").length,
      totalRevenue: all
        .filter((r) => r.status !== "CANCELLED")
        .reduce((sum, r) => sum + r.grandTotal, 0),
    };
  },
};
