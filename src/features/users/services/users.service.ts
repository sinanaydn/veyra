import { mockUsers } from "@/lib/mocks/users";
import { mockReservations } from "@/lib/mocks/reservations";
import { delay } from "@/lib/utils";
import type { User } from "@/features/auth/types/user.types";

export interface AdminUser extends User {
  reservationCount: number;
  totalSpent: number;
}

export const usersService = {
  async getAllWithStats(): Promise<AdminUser[]> {
    await delay();
    return mockUsers.map((u) => {
      const userRes = mockReservations.filter((r) => r.userId === u.id);
      return {
        ...u,
        reservationCount: userRes.length,
        totalSpent: userRes
          .filter((r) => r.status === "COMPLETED")
          .reduce((sum, r) => sum + r.grandTotal, 0),
      };
    });
  },

  async getById(id: string): Promise<AdminUser | null> {
    await delay();
    const user = mockUsers.find((u) => u.id === id);
    if (!user) return null;
    const userRes = mockReservations.filter((r) => r.userId === id);
    return {
      ...user,
      reservationCount: userRes.length,
      totalSpent: userRes
        .filter((r) => r.status === "COMPLETED")
        .reduce((sum, r) => sum + r.grandTotal, 0),
    };
  },

  async getUserReservations(userId: string) {
    await delay();
    return mockReservations
      .filter((r) => r.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },
};
