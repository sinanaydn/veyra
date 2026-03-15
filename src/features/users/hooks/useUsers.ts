import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => ["users", id] as const,
  reservations: (id: string) => ["users", id, "reservations"] as const,
};

export function useAdminUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => usersService.getAllWithStats(),
  });
}

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });
}

export function useUserReservations(userId: string) {
  return useQuery({
    queryKey: userKeys.reservations(userId),
    queryFn: () => usersService.getUserReservations(userId),
    enabled: !!userId,
  });
}
