"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Eye,
  CalendarRange,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReservationDetailSheet } from "@/components/admin/reservation-detail-sheet";
import { useAdminRentals } from "@/features/rentals/hooks/useRentals";
import type { AdminReservation } from "@/features/rentals/services/rentals.service";
import type { ReservationStatus } from "@/features/rentals/types/rental.types";

const statusConfig: Record<
  ReservationStatus,
  { label: string; color: string }
> = {
  PENDING: {
    label: "Beklemede",
    color: "bg-warning/10 text-warning border-warning/20",
  },
  CONFIRMED: {
    label: "Onaylandı",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  ACTIVE: {
    label: "Aktif",
    color: "bg-success/10 text-success border-success/20",
  },
  COMPLETED: {
    label: "Tamamlandı",
    color: "bg-muted text-muted-foreground",
  },
  CANCELLED: {
    label: "İptal",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const statusFilters: { value: string; label: string }[] = [
  { value: "", label: "Tüm Durumlar" },
  { value: "PENDING", label: "Beklemede" },
  { value: "CONFIRMED", label: "Onaylandı" },
  { value: "ACTIVE", label: "Aktif" },
  { value: "COMPLETED", label: "Tamamlandı" },
  { value: "CANCELLED", label: "İptal" },
];

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
  });
}

function formatCurrency(val: number) {
  return val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

export default function AdminReservationsPage() {
  const { data: reservations, isLoading } = useAdminRentals();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedRes, setSelectedRes] = useState<AdminReservation | null>(null);

  const filtered = useMemo(() => {
    if (!reservations) return [];
    let result = [...reservations];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.reservationCode.toLowerCase().includes(q) ||
          r.userName.toLowerCase().includes(q) ||
          r.userEmail.toLowerCase().includes(q) ||
          `${r.carBrandName} ${r.carModelName}`.toLowerCase().includes(q)
      );
    }

    if (statusFilter) {
      result = result.filter((r) => r.status === statusFilter);
    }

    return result;
  }, [reservations, search, statusFilter]);

  function handleDetail(res: AdminReservation) {
    setSelectedRes(res);
    setSheetOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Rezervasyon Yönetimi
        </h1>
        <p className="text-sm text-muted-foreground">
          Tüm rezervasyonları görüntüleyin, durumlarını yönetin ve detaylarını
          inceleyin.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Kod, müşteri veya araç ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {statusFilters.map((sf) => (
              <option key={sf.value} value={sf.value}>
                {sf.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} rezervasyon listeleniyor
          {(search || statusFilter) && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
              }}
              className="ml-2 text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Filtreleri temizle
            </button>
          )}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 py-16">
          <CalendarRange className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search || statusFilter
              ? "Filtrelere uygun rezervasyon bulunamadı."
              : "Henüz rezervasyon bulunmuyor."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[110px]">Kod</TableHead>
                <TableHead className="min-w-[130px]">Müşteri</TableHead>
                <TableHead className="min-w-[130px]">Araç</TableHead>
                <TableHead className="min-w-[120px]">Alış</TableHead>
                <TableHead className="min-w-[120px]">Dönüş</TableHead>
                <TableHead className="min-w-[90px] text-right">Tutar</TableHead>
                <TableHead className="min-w-[100px] text-center">
                  Durum
                </TableHead>
                <TableHead className="min-w-[60px] text-right">
                  <FileText className="ml-auto h-3.5 w-3.5" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((res) => {
                const cfg = statusConfig[res.status];
                return (
                  <TableRow key={res.id} className="group">
                    <TableCell>
                      <span className="font-mono text-xs">
                        {res.reservationCode}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {res.userName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {res.userEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {res.carBrandName} {res.carModelName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {formatShortDate(res.pickupDateTime)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {res.pickupLocation}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {formatShortDate(res.returnDateTime)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {res.returnLocation}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium tabular-nums">
                        {formatCurrency(res.grandTotal)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`text-xs ${cfg.color}`}>
                        {cfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDetail(res)}
                        title="Detay"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <ReservationDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        reservation={selectedRes}
      />
    </div>
  );
}
