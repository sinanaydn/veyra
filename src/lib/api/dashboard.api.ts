import { apiClient } from "./client";
import type { Reservation } from "@/features/rentals/types/rental.types";
import type {
  DashboardKPIs,
  StatusDistribution,
  FleetAvailability,
  CityPerformance,
  RecentActivity,
} from "@/features/dashboard/services/dashboard.service";

export const dashboardApi = {
  getKPIs: (): Promise<DashboardKPIs> =>
    apiClient.get("/dashboard/kpis").then((r) => r.data),

  getStatusDistribution: (): Promise<StatusDistribution[]> =>
    apiClient.get("/dashboard/status-distribution").then((r) => r.data),

  getFleetAvailability: (): Promise<FleetAvailability[]> =>
    apiClient.get("/dashboard/fleet-availability").then((r) => r.data),

  getCityPerformance: (): Promise<CityPerformance[]> =>
    apiClient.get("/dashboard/city-performance").then((r) => r.data),

  getRecentReservations: (): Promise<Reservation[]> =>
    apiClient.get("/dashboard/recent-reservations").then((r) => r.data),

  getRecentActivity: (): Promise<RecentActivity[]> =>
    apiClient.get("/dashboard/recent-activity").then((r) => r.data),
};
