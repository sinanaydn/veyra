import { mockReservations } from "@/lib/mocks/reservations";
import { mockCars } from "@/lib/mocks/cars";
import { mockUsers } from "@/lib/mocks/users";
import type { Reservation, ReservationStatus } from "@/features/rentals/types/rental.types";
import type { AvailabilityStatus } from "@/features/cars/types/car.types";

const delay = (ms: number = 250) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
    await delay();
    const all = mockReservations;
    return {
      totalReservations: all.length,
      activeReservations: all.filter(
        (r) => r.status === "ACTIVE" || r.status === "CONFIRMED"
      ).length,
      totalRevenue: all
        .filter((r) => r.status !== "CANCELLED")
        .reduce((sum, r) => sum + r.grandTotal, 0),
      totalCars: mockCars.length,
      totalUsers: mockUsers.filter((u) => u.role === "USER").length,
      pendingReservations: all.filter((r) => r.status === "PENDING").length,
    };
  },

  async getStatusDistribution(): Promise<StatusDistribution[]> {
    await delay(150);
    const all = mockReservations;
    const total = all.length;
    const statuses: { status: ReservationStatus; label: string }[] = [
      { status: "PENDING", label: "Beklemede" },
      { status: "CONFIRMED", label: "Onaylandı" },
      { status: "ACTIVE", label: "Aktif" },
      { status: "COMPLETED", label: "Tamamlandı" },
      { status: "CANCELLED", label: "İptal" },
    ];

    return statuses.map(({ status, label }) => {
      const count = all.filter((r) => r.status === status).length;
      return {
        status,
        label,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      };
    });
  },

  async getFleetAvailability(): Promise<FleetAvailability[]> {
    await delay(150);
    const statusLabels: { status: AvailabilityStatus; label: string }[] = [
      { status: "AVAILABLE", label: "Müsait" },
      { status: "RESERVED", label: "Rezerveli" },
      { status: "MAINTENANCE", label: "Bakımda" },
    ];
    return statusLabels.map(({ status, label }) => ({
      status,
      label,
      count: mockCars.filter((c) => c.availability === status).length,
    }));
  },

  async getCityPerformance(): Promise<CityPerformance[]> {
    await delay(200);
    const cityMap = new Map<string, { carCount: number; reservationCount: number }>();

    for (const car of mockCars) {
      const entry = cityMap.get(car.city) ?? { carCount: 0, reservationCount: 0 };
      entry.carCount++;
      cityMap.set(car.city, entry);
    }

    for (const res of mockReservations) {
      // Extract city from pickup location
      const city = res.pickupLocation.split(" ")[0];
      if (cityMap.has(city)) {
        cityMap.get(city)!.reservationCount++;
      }
    }

    return Array.from(cityMap.entries())
      .map(([city, data]) => ({ city, ...data }))
      .sort((a, b) => b.carCount - a.carCount);
  },

  async getRecentReservations(): Promise<Reservation[]> {
    await delay(200);
    return [...mockReservations]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    await delay(200);
    const activities: RecentActivity[] = [];

    // Recent reservations as activities
    const sortedRes = [...mockReservations]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);

    for (const r of sortedRes) {
      const user = mockUsers.find((u) => u.id === r.userId);
      activities.push({
        id: r.id,
        type: "reservation",
        title: `${r.carBrandName} ${r.carModelName} — ${r.reservationCode}`,
        subtitle: user
          ? `${user.firstName} ${user.lastName}`
          : "Bilinmeyen Kullanıcı",
        timestamp: r.createdAt,
      });
    }

    return activities;
  },
};
