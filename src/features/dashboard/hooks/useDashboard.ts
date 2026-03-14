import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

const dashboardKeys = {
  kpis: ["dashboard", "kpis"] as const,
  statusDistribution: ["dashboard", "statusDistribution"] as const,
  fleetAvailability: ["dashboard", "fleetAvailability"] as const,
  cityPerformance: ["dashboard", "cityPerformance"] as const,
  recentReservations: ["dashboard", "recentReservations"] as const,
  recentActivity: ["dashboard", "recentActivity"] as const,
};

export function useDashboardKPIs() {
  return useQuery({
    queryKey: dashboardKeys.kpis,
    queryFn: () => dashboardService.getKPIs(),
  });
}

export function useStatusDistribution() {
  return useQuery({
    queryKey: dashboardKeys.statusDistribution,
    queryFn: () => dashboardService.getStatusDistribution(),
  });
}

export function useFleetAvailability() {
  return useQuery({
    queryKey: dashboardKeys.fleetAvailability,
    queryFn: () => dashboardService.getFleetAvailability(),
  });
}

export function useCityPerformance() {
  return useQuery({
    queryKey: dashboardKeys.cityPerformance,
    queryFn: () => dashboardService.getCityPerformance(),
  });
}

export function useRecentReservations() {
  return useQuery({
    queryKey: dashboardKeys.recentReservations,
    queryFn: () => dashboardService.getRecentReservations(),
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: dashboardKeys.recentActivity,
    queryFn: () => dashboardService.getRecentActivity(),
  });
}
