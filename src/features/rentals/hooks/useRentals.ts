import { useQuery } from "@tanstack/react-query";
import { rentalsService } from "../services/rentals.service";
import type { ReservationStatus } from "../types/rental.types";

export const rentalKeys = {
  all: ["rentals"] as const,
  admin: ["rentals", "admin"] as const,
  byUser: (userId: string) => ["rentals", "user", userId] as const,
  detail: (id: string) => ["rentals", id] as const,
  byStatus: (status: ReservationStatus) =>
    ["rentals", "status", status] as const,
  recent: (limit?: number) => ["rentals", "recent", limit] as const,
  upcoming: (userId: string) => ["rentals", "upcoming", userId] as const,
  stats: ["rentals", "stats"] as const,
  userStats: (userId: string) => ["rentals", "userStats", userId] as const,
};

export function useRentals() {
  return useQuery({
    queryKey: rentalKeys.all,
    queryFn: () => rentalsService.getAll(),
  });
}

export function useAdminRentals() {
  return useQuery({
    queryKey: rentalKeys.admin,
    queryFn: () => rentalsService.getAllForAdmin(),
  });
}

export function useUserRentals(userId: string) {
  return useQuery({
    queryKey: rentalKeys.byUser(userId),
    queryFn: () => rentalsService.getByUserId(userId),
    enabled: !!userId,
  });
}

export function useRentalById(id: string) {
  return useQuery({
    queryKey: rentalKeys.detail(id),
    queryFn: () => rentalsService.getById(id),
    enabled: !!id,
  });
}

export function useRecentRentals(limit?: number) {
  return useQuery({
    queryKey: rentalKeys.recent(limit),
    queryFn: () => rentalsService.getRecent(limit),
  });
}

export function useUpcomingRentals(userId: string) {
  return useQuery({
    queryKey: rentalKeys.upcoming(userId),
    queryFn: () => rentalsService.getUpcoming(userId),
    enabled: !!userId,
  });
}

export function useUserStats(userId: string) {
  return useQuery({
    queryKey: rentalKeys.userStats(userId),
    queryFn: () => rentalsService.getUserStats(userId),
    enabled: !!userId,
  });
}

export function useRentalStats() {
  return useQuery({
    queryKey: rentalKeys.stats,
    queryFn: () => rentalsService.getStats(),
  });
}
