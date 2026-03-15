import { mockReservations } from "@/lib/mocks/reservations";
import { mockUsers } from "@/lib/mocks/users";
import { delay } from "@/lib/utils";
import type { Reservation, ReservationStatus } from "../types/rental.types";

export interface AdminReservation extends Reservation {
  userName: string;
  userEmail: string;
}

export const rentalsService = {
  async getAll(): Promise<Reservation[]> {
    await delay(300);
    return [...mockReservations].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getByUserId(userId: string): Promise<Reservation[]> {
    await delay(300);
    return mockReservations
      .filter((r) => r.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  async getById(id: string): Promise<Reservation | null> {
    await delay(300);
    return mockReservations.find((r) => r.id === id) ?? null;
  },

  async getByStatus(status: ReservationStatus): Promise<Reservation[]> {
    await delay(300);
    return mockReservations.filter((r) => r.status === status);
  },

  async getRecent(limit: number = 5): Promise<Reservation[]> {
    await delay(300);
    return [...mockReservations]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  },

  async getUpcoming(userId: string): Promise<Reservation[]> {
    await delay(200);
    const now = new Date();
    return mockReservations
      .filter(
        (r) =>
          r.userId === userId &&
          (r.status === "CONFIRMED" || r.status === "PENDING") &&
          new Date(r.pickupDateTime) > now
      )
      .sort(
        (a, b) =>
          new Date(a.pickupDateTime).getTime() -
          new Date(b.pickupDateTime).getTime()
      );
  },

  async getUserStats(userId: string): Promise<{
    total: number;
    active: number;
    completed: number;
    totalSpent: number;
  }> {
    await delay(150);
    const userRes = mockReservations.filter((r) => r.userId === userId);
    return {
      total: userRes.length,
      active: userRes.filter(
        (r) =>
          r.status === "CONFIRMED" ||
          r.status === "ACTIVE" ||
          r.status === "PENDING"
      ).length,
      completed: userRes.filter((r) => r.status === "COMPLETED").length,
      totalSpent: userRes
        .filter((r) => r.status === "COMPLETED")
        .reduce((sum, r) => sum + r.grandTotal, 0),
    };
  },

  async getAllForAdmin(): Promise<AdminReservation[]> {
    await delay(300);
    return [...mockReservations]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map((r) => {
        const user = mockUsers.find((u) => u.id === r.userId);
        return {
          ...r,
          userName: user
            ? `${user.firstName} ${user.lastName}`
            : "Bilinmeyen",
          userEmail: user?.email ?? "",
        };
      });
  },

  async updateStatus(
    id: string,
    status: ReservationStatus
  ): Promise<Reservation> {
    await delay(400);
    const index = mockReservations.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Rezervasyon bulunamadı.");
    mockReservations[index] = { ...mockReservations[index], status };
    return mockReservations[index];
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
    await delay(300);
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
