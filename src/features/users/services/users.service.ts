import { usersApi } from "@/lib/api/users.api";
import { rentalsApi } from "@/lib/api/rentals.api";
import type { User } from "@/features/auth/types/user.types";

export interface AdminUser extends User {
  reservationCount: number;
  totalSpent: number;
}

export const usersService = {
  async getAllWithStats(): Promise<AdminUser[]> {
    return usersApi.getAllWithStats();
  },

  async getById(id: string): Promise<AdminUser | null> {
    return usersApi.getById(id).catch(() => null);
  },

  async getUserReservations(userId: string) {
    return rentalsApi.getByUserId(userId);
  },
};
