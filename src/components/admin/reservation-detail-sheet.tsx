"use client";

import {
  MapPin,
  Calendar,
  User,
  Car,
  CreditCard,
  Clock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUpdateReservationStatus } from "@/features/rentals/hooks/useRentalMutations";
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

const statusTransitions: Record<ReservationStatus, ReservationStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["ACTIVE", "CANCELLED"],
  ACTIVE: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(val: number) {
  return val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

interface ReservationDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: AdminReservation | null;
}

export function ReservationDetailSheet({
  open,
  onOpenChange,
  reservation,
}: ReservationDetailSheetProps) {
  const updateStatus = useUpdateReservationStatus();
  const r = reservation;

  if (!r) return null;

  const transitions = statusTransitions[r.status];
  const cfg = statusConfig[r.status];

  function handleStatusChange(newStatus: ReservationStatus) {
    updateStatus.mutate(
      { id: r!.id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            `Durum "${statusConfig[newStatus].label}" olarak güncellendi.`
          );
        },
        onError: () => toast.error("Durum güncellenirken bir hata oluştu."),
      }
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <SheetTitle className="font-mono text-lg">
              {r.reservationCode}
            </SheetTitle>
            <Badge variant="outline" className={cfg.color}>
              {cfg.label}
            </Badge>
          </div>
          <SheetDescription>
            Oluşturma: {formatDate(r.createdAt)}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* Status Actions */}
          {transitions.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                Durum Güncelle
              </p>
              <div className="flex flex-wrap gap-2">
                {transitions.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={s === "CANCELLED" ? "destructive" : "default"}
                    onClick={() => handleStatusChange(s)}
                    disabled={updateStatus.isPending}
                  >
                    {updateStatus.isPending ? (
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    ) : null}
                    {statusConfig[s].label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Car Info */}
          <section>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Car className="h-3.5 w-3.5" />
              Araç Bilgisi
            </div>
            <div className="rounded-lg border border-border/50 p-3">
              <p className="text-sm font-medium">
                {r.carBrandName} {r.carModelName}
              </p>
              <p className="text-xs text-muted-foreground">
                Araç ID: {r.carId}
              </p>
            </div>
          </section>

          {/* User Info */}
          <section>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              Müşteri Bilgisi
            </div>
            <div className="rounded-lg border border-border/50 p-3">
              <p className="text-sm font-medium">{r.userName}</p>
              <p className="text-xs text-muted-foreground">{r.userEmail}</p>
            </div>
          </section>

          {/* Pickup / Return */}
          <section>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Alış / Dönüş
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-border/50 p-3">
                <p className="text-xs text-muted-foreground">Alış</p>
                <p className="text-sm font-medium">{r.pickupLocation}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(r.pickupDateTime)}
                </p>
              </div>
              <div className="rounded-lg border border-border/50 p-3">
                <p className="text-xs text-muted-foreground">Dönüş</p>
                <p className="text-sm font-medium">{r.returnLocation}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(r.returnDateTime)}
                </p>
              </div>
            </div>
          </section>

          {/* Duration */}
          <section>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Süre
            </div>
            <p className="text-sm">
              {r.days} gün
            </p>
          </section>

          {/* Pricing */}
          <section>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5" />
              Fiyat Kırılımı
            </div>
            <div className="rounded-lg border border-border/50 divide-y divide-border/30">
              <div className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="text-muted-foreground">
                  Araç Ücreti ({r.days} gün)
                </span>
                <span>{formatCurrency(r.subtotal)}</span>
              </div>
              {r.extrasTotal > 0 && (
                <div className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Ekstralar</span>
                  <span>{formatCurrency(r.extrasTotal)}</span>
                </div>
              )}
              <div className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="text-muted-foreground">Depozito</span>
                <span className="text-muted-foreground">
                  {formatCurrency(r.deposit)}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold">
                <span>Toplam</span>
                <span>{formatCurrency(r.grandTotal)}</span>
              </div>
            </div>
          </section>

          {/* Notes placeholder */}
          <section>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Notlar
            </p>
            <div className="rounded-lg border border-dashed border-border/50 p-3">
              <p className="text-xs text-muted-foreground/60 italic">
                Henüz not eklenmemiş.
              </p>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
