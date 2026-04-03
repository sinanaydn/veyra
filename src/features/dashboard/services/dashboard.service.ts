import { dashboardApi } from "@/lib/api/dashboard.api";
import type { Reservation, ReservationStatus } from "@/features/rentals/types/rental.types";
import type { AvailabilityStatus } from "@/features/cars/types/car.types";

export interface DashboardKPIs {
  totalReservations: number;
  activeReservations: number;
  totalRevenue: number;
  totalCars: number;
  totalUsers: number;
  pendingReservations: number;
}

export interface StatusDistribution {
  status: ReservationStatus;
  label: string;
  count: number;
  percentage: number;
}

export interface FleetAvailability {
  status: AvailabilityStatus;
  label: string;
  count: number;
}

export interface CityPerformance {
  city: string;
  carCount: number;
  reservationCount: number;
}

export interface RecentActivity {
  id: string;
  type: "reservation" | "user";
  title: string;
  subtitle: string;
  timestamp: string;
}

export const dashboardService = {
  async getKPIs(): Promise<DashboardKPIs> {
    return dashboardApi.getKPIs();
  },

  async getStatusDistribution(): Promise<StatusDistribution[]> {
    return dashboardApi.getStatusDistribution();
  },

  async getFleetAvailability(): Promise<FleetAvailability[]> {
    return dashboardApi.getFleetAvailability();
  },

  async getCityPerformance(): Promise<CityPerformance[]> {
    return dashboardApi.getCityPerformance();
  },

  async getRecentReservations(): Promise<Reservation[]> {
    return dashboardApi.getRecentReservations();
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    return dashboardApi.getRecentActivity();
  },
};
