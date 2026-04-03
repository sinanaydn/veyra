import { apiClient } from "./client";
import type { User } from "@/features/auth/types/user.types";

export interface AdminUserResponse extends User {
  reservationCount: number;
  totalSpent: number;
}

export const usersApi = {
  getAllWithStats: (): Promise<AdminUserResponse[]> =>
    apiClient.get("/users").then((r) => r.data),

  getById: (id: string): Promise<AdminUserResponse> =>
    apiClient.get(`/users/${id}`).then((r) => r.data),
};
