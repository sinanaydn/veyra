"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Car,
  ArrowLeft,
  Clock,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReservationCard } from "@/components/account/reservation-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuthStore } from "@/lib/store/auth.store";
import { useUserRentals } from "@/features/rentals/hooks/useRentals";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";
import type { Reservation, ReservationStatus } from "@/features/rentals/types/rental.types";

const statusMap: Record<
  ReservationStatus,
  { variant: "confirmed" | "pending" | "active" | "completed" | "cancelled"; label: string }
> = {
  PENDING: { variant: "pending", label: "Beklemede" },
  CONFIRMED: { variant: "confirmed", label: "Onaylandı" },
  ACTIVE: { variant: "active", label: "Aktif" },
  COMPLETED: { variant: "completed", label: "Tamamlandı" },
  CANCELLED: { variant: "cancelled", label: "İptal Edildi" },
};

type FilterTab = "all" | "active" | "past";

export default function ReservationsPage() {
  const user = useAuthStore((s) => s.user);
  const { data: rentals, isLoading } = useUserRentals(user?.id ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<FilterTab>("all");

  const filtered = useMemo(() => {
    if (!rentals) return [];
    switch (tab) {
      case "active":
        return rentals.filter(
          (r) => r.status === "PENDING" || r.status === "CONFIRMED" || r.status === "ACTIVE"
        );
      case "past":
        return rentals.filter(
          (r) => r.status === "COMPLETED" || r.status === "CANCELLED"
        );
      default:
        return rentals;
    }
  }, [rentals, tab]);

  const selectedReservation = useMemo(
    () => rentals?.find((r) => r.id === selectedId) ?? null,
    [rentals, selectedId]
  );

  if (selectedReservation) {
    return <ReservationDetail reservation={selectedReservation} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rezervasyonlarım</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tüm rezervasyonlarınızı görüntüleyin ve yönetin.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="past">Geçmiş</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[140px] rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="Rezervasyon bulunamadı"
              description={
                tab === "active"
                  ? "Aktif veya yaklaşan rezervasyonunuz bulunmuyor."
                  : tab === "past"
                  ? "Geçmiş rezervasyonunuz bulunmuyor."
                  : "Henüz bir rezervasyonunuz bulunmuyor."
              }
              action={
                <Link href={ROUTES.FLEET}>
                  <Button>Araç Kirala</Button>
                </Link>
              }
              className="rounded-xl border border-dashed border-border/60 py-12"
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onDetailClick={() => setSelectedId(reservation.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReservationDetail({
  reservation,
  onBack,
}: {
  reservation: Reservation;
  onBack: () => void;
}) {
  const { variant, label } = statusMap[reservation.status];

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Rezervasyonlara Dön
      </button>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          {reservation.carBrandName} {reservation.carModelName}
        </h1>
        <StatusBadge status={variant} label={label} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Reservation Info */}
        <div className="rounded-xl border border-border/60 bg-card p-4 ring-1 ring-foreground/5 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Rezervasyon Bilgileri
          </h3>
          <DetailRow icon={Hash} label="Kod" value={reservation.reservationCode} />
          <DetailRow
            icon={Calendar}
            label="Alış"
            value={formatDate(reservation.pickupDateTime, "d MMMM yyyy, HH:mm")}
          />
          <DetailRow
            icon={Calendar}
            label="Teslim"
            value={formatDate(reservation.returnDateTime, "d MMMM yyyy, HH:mm")}
          />
          <DetailRow icon={Clock} label="Süre" value={`${reservation.days} gün`} />
        </div>

        {/* Location Info */}
        <div className="rounded-xl border border-border/60 bg-card p-4 ring-1 ring-foreground/5 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Lokasyon
          </h3>
          <DetailRow icon={MapPin} label="Alış Noktası" value={reservation.pickupLocation} />
          <DetailRow icon={MapPin} label="Teslim Noktası" value={reservation.returnLocation} />
          <DetailRow icon={Car} label="Araç" value={`${reservation.carBrandName} ${reservation.carModelName}`} />
        </div>
      </div>

      {/* Price Summary */}
      <div className="rounded-xl border border-border/60 bg-card p-4 ring-1 ring-foreground/5">
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Fiyat Özeti
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Araç Ücreti</span>
            <span>{formatCurrency(reservation.subtotal)}</span>
          </div>
          {reservation.extrasTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ek Hizmetler</span>
              <span>{formatCurrency(reservation.extrasTotal)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Depozito</span>
            <span>{formatCurrency(reservation.deposit)}</span>
          </div>
          <div className="flex justify-between border-t border-border/40 pt-2 font-semibold">
            <span>Toplam</span>
            <span className="text-primary">{formatCurrency(reservation.grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
