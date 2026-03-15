"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Car,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { KPICard } from "@/components/admin/kpi-card";
import { AdminSection } from "@/components/admin/admin-section";
import { StatusDistribution } from "@/components/admin/status-distribution";
import { FleetAvailabilityCard } from "@/components/admin/fleet-availability";
import { RecentReservationsTable } from "@/components/admin/recent-reservations-table";
import { CityPerformance } from "@/components/admin/city-performance";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { QuickActions } from "@/components/admin/quick-actions";
import {
  useDashboardKPIs,
  useStatusDistribution,
  useFleetAvailability,
  useCityPerformance,
  useRecentReservations,
  useRecentActivity,
} from "@/features/dashboard/hooks/useDashboard";
import { formatCurrency } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";

export default function AdminDashboardPage() {
  const { data: kpis, isLoading: kpisLoading } = useDashboardKPIs();
  const { data: statusDist, isLoading: statusLoading } = useStatusDistribution();
  const { data: fleetAvail, isLoading: fleetLoading } = useFleetAvailability();
  const { data: cities, isLoading: citiesLoading } = useCityPerformance();
  const { data: recentRes, isLoading: recentLoading } = useRecentReservations();
  const { data: activity, isLoading: activityLoading } = useRecentActivity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Operasyonel özet ve temel metrikler
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpisLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[88px] rounded-xl" />
          ))
        ) : (
          <>
            <KPICard
              icon={CalendarCheck}
              label="Toplam Rezervasyon"
              value={kpis?.totalReservations ?? 0}
            />
            <KPICard
              icon={TrendingUp}
              label="Aktif Rezervasyon"
              value={kpis?.activeReservations ?? 0}
              subtitle="onaylı + aktif"
            />
            <KPICard
              icon={Clock}
              label="Bekleyen"
              value={kpis?.pendingReservations ?? 0}
              subtitle="onay bekliyor"
            />
            <KPICard
              icon={TrendingUp}
              label="Toplam Gelir"
              value={formatCurrency(kpis?.totalRevenue ?? 0)}
            />
            <KPICard
              icon={Car}
              label="Filo"
              value={kpis?.totalCars ?? 0}
              subtitle="toplam araç"
            />
            <KPICard
              icon={Users}
              label="Kullanıcı"
              value={kpis?.totalUsers ?? 0}
              subtitle="kayıtlı"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <AdminSection title="Hızlı İşlemler">
        <QuickActions />
      </AdminSection>

      {/* Two column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Reservations */}
          <AdminSection
            title="Son Rezervasyonlar"
            action={
              <Link
                href={ROUTES.ADMIN_RESERVATIONS}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Tümünü Gör
                <ArrowRight className="h-3 w-3" />
              </Link>
            }
          >
            <div className="rounded-xl border border-border/70 bg-card ring-1 ring-border/50">
              <RecentReservationsTable
                data={recentRes}
                isLoading={recentLoading}
              />
            </div>
          </AdminSection>

          {/* Status Distribution */}
          <AdminSection title="Rezervasyon Durum Dağılımı">
            <div className="rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50">
              <StatusDistribution
                data={statusDist}
                isLoading={statusLoading}
              />
            </div>
          </AdminSection>

          {/* Fleet Availability */}
          <AdminSection title="Filo Durumu">
            <FleetAvailabilityCard
              data={fleetAvail}
              isLoading={fleetLoading}
            />
          </AdminSection>
        </div>

        {/* Right — 1/3 */}
        <div className="space-y-6">
          {/* City Performance */}
          <AdminSection title="Şehir Performansı">
            <div className="rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50">
              <CityPerformance
                data={cities}
                isLoading={citiesLoading}
              />
            </div>
          </AdminSection>

          {/* Recent Activity */}
          <AdminSection title="Son Hareketler">
            <div className="rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50">
              <ActivityFeed
                data={activity}
                isLoading={activityLoading}
              />
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
