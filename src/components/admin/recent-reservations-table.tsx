"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/shared/status-badge";
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
  CANCELLED: { variant: "cancelled", label: "İptal" },
};

interface RecentReservationsTableProps {
  data?: Reservation[];
  isLoading?: boolean;
}

export function RecentReservationsTable({
  data,
  isLoading,
}: RecentReservationsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Henüz rezervasyon bulunmuyor.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Kod</TableHead>
            <TableHead className="min-w-[140px]">Araç</TableHead>
            <TableHead className="min-w-[100px]">Tarih</TableHead>
            <TableHead className="min-w-[90px]">Durum</TableHead>
            <TableHead className="min-w-[80px] text-right">Tutar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((res) => {
            const { variant, label } = statusMap[res.status];
            return (
              <TableRow key={res.id}>
                <TableCell className="font-mono text-xs">
                  {res.reservationCode}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">
                    {res.carBrandName} {res.carModelName}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatDate(res.pickupDateTime, "d MMM yyyy")}
                </TableCell>
                <TableCell>
                  <StatusBadge status={variant} label={label} />
                </TableCell>
                <TableCell className="text-right text-sm font-medium tabular-nums">
                  {formatCurrency(res.grandTotal)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
