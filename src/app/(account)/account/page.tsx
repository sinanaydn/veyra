"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Car,
  CreditCard,
  Headphones,
  Plus,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/account/stat-card";
import { ReservationCard } from "@/components/account/reservation-card";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuthStore } from "@/lib/store/auth.store";
import { useUpcomingRentals, useUserStats } from "@/features/rentals/hooks/useRentals";
import { formatCurrency } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";
import { APP_CONFIG } from "@/lib/constants/config";

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.id ?? "";

  const { data: stats, isLoading: statsLoading } = useUserStats(userId);
  const { data: upcoming, isLoading: upcomingLoading } = useUpcomingRentals(userId);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Hoş geldin, {user?.firstName ?? "Kullanıcı"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hesap özetinizi ve yaklaşan rezervasyonlarınızı buradan takip edebilirsiniz.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statsLoading ? (
          <>
            <Skeleton className="h-[76px] rounded-xl" />
            <Skeleton className="h-[76px] rounded-xl" />
            <Skeleton className="h-[76px] rounded-xl" />
          </>
        ) : (
          <>
            <StatCard
              icon={CalendarCheck}
              label="Toplam Rezervasyon"
              value={stats?.total ?? 0}
            />
            <StatCard
              icon={Car}
              label="Aktif / Yaklaşan"
              value={stats?.active ?? 0}
            />
            <StatCard
              icon={CreditCard}
              label="Toplam Harcama"
              value={formatCurrency(stats?.totalSpent ?? 0)}
            />
          </>
        )}
      </div>

      {/* Upcoming Reservation */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Yaklaşan Rezervasyon</h2>
          {upcoming && upcoming.length > 0 && (
            <Link
              href={ROUTES.ACCOUNT_RESERVATIONS}
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Tümünü Gör
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {upcomingLoading ? (
          <Skeleton className="h-[140px] rounded-xl" />
        ) : upcoming && upcoming.length > 0 ? (
          <ReservationCard reservation={upcoming[0]} />
        ) : (
          <EmptyState
            icon={CalendarCheck}
            title="Yaklaşan rezervasyonunuz yok"
            description="Hemen bir araç kiralayarak yolculuğunuzu planlayın."
            action={
              <Link href={ROUTES.FLEET}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Araç Kirala
                </Button>
              </Link>
            }
            className="rounded-xl border border-dashed border-border/70 py-12"
          />
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Hızlı İşlemler</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={ROUTES.FLEET}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Yeni Rezervasyon</p>
              <p className="text-xs text-muted-foreground">
                Filomuzu inceleyin ve hemen kiralayın
              </p>
            </div>
          </Link>
          <Link
            href={ROUTES.ACCOUNT_RESERVATIONS}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <ListChecks className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Rezervasyonlarım</p>
              <p className="text-xs text-muted-foreground">
                Tüm rezervasyonlarınızı görüntüleyin
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Support */}
      <section className="rounded-xl border border-border/70 bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Headphones className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Yardıma mı ihtiyacınız var?</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              7/24 müşteri hizmetlerimize ulaşabilirsiniz.
            </p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs">
              <a
                href={`tel:${APP_CONFIG.contact.phone}`}
                className="font-medium text-primary hover:underline"
              >
                {APP_CONFIG.contact.phone}
              </a>
              <a
                href={`mailto:${APP_CONFIG.contact.email}`}
                className="font-medium text-primary hover:underline"
              >
                {APP_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
