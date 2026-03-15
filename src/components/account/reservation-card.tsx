"use client";

import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Car,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils/format";
import { formatDate } from "@/lib/utils/format";
import type {
  Reservation,
  ReservationStatus,
} from "@/features/rentals/types/rental.types";
import { cn } from "@/lib/utils";

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

interface ReservationCardProps {
  reservation: Reservation;
  compact?: boolean;
  onDetailClick?: () => void;
  className?: string;
}

export function ReservationCard({
  reservation,
  compact = false,
  onDetailClick,
  className,
}: ReservationCardProps) {
  const { variant, label } = statusMap[reservation.status];

  return (
    <div
      className={cn(
        "group rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50 transition-colors hover:border-border",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="font-medium">
              {reservation.carBrandName} {reservation.carModelName}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {reservation.reservationCode}
          </p>
        </div>
        <StatusBadge status={variant} label={label} />
      </div>

      {!compact && (
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>
              {formatDate(reservation.pickupDateTime, "d MMM yyyy")}
              {" — "}
              {formatDate(reservation.returnDateTime, "d MMM yyyy")}
            </span>
            <span className="text-xs">({reservation.days} gün)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{reservation.pickupLocation}</span>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
        <span className="text-sm font-semibold">
          {formatCurrency(reservation.grandTotal)}
        </span>
{onDetailClick ? (
          <button
            type="button"
            onClick={onDetailClick}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Detaylar
            <ArrowRight className="h-3 w-3" />
          </button>
        ) : (
          <Link
            href={`/account/reservations?detail=${reservation.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Detaylar
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
