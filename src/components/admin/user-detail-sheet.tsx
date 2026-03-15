"use client";

import {
  Mail,
  Phone,
  Shield,
  Globe,
  Banknote,
  CalendarRange,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserReservations } from "@/features/users/hooks/useUsers";
import type { AdminUser } from "@/features/users/services/users.service";

const roleLabels: Record<string, { label: string; color: string }> = {
  ADMIN: {
    label: "Yönetici",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  USER: {
    label: "Kullanıcı",
    color: "bg-primary/10 text-primary border-primary/20",
  },
};

const langLabels: Record<string, string> = { tr: "Türkçe", en: "English" };
const currLabels: Record<string, string> = {
  TRY: "Türk Lirası (₺)",
  EUR: "Euro (€)",
  USD: "Dolar ($)",
};

const statusLabels: Record<string, string> = {
  PENDING: "Beklemede",
  CONFIRMED: "Onaylandı",
  ACTIVE: "Aktif",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};

function formatCurrency(val: number) {
  return val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface UserDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUser | null;
}

export function UserDetailSheet({
  open,
  onOpenChange,
  user,
}: UserDetailSheetProps) {
  const { data: reservations, isLoading: resLoading } = useUserReservations(
    user?.id ?? ""
  );

  if (!user) return null;

  const roleCfg = roleLabels[user.role] ?? roleLabels.USER;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div>
              <SheetTitle>
                {user.firstName} {user.lastName}
              </SheetTitle>
              <SheetDescription>{user.email}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* Contact */}
          <section>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              İletişim
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                {user.phone}
              </div>
            </div>
          </section>

          {/* Role & Status */}
          <section>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Hesap
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <Badge variant="outline" className={roleCfg.color}>
                  {roleCfg.label}
                </Badge>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Aktif
              </Badge>
            </div>
          </section>

          {/* Preferences */}
          <section>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Tercihler
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                {langLabels[user.preferredLanguage] ?? user.preferredLanguage}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Banknote className="h-3.5 w-3.5 text-muted-foreground" />
                {currLabels[user.preferredCurrency] ?? user.preferredCurrency}
              </div>
            </div>
          </section>

          {/* Summary */}
          <section>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Özet
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/50 p-3 text-center">
                <p className="text-lg font-semibold tabular-nums">
                  {user.reservationCount}
                </p>
                <p className="text-xs text-muted-foreground">Rezervasyon</p>
              </div>
              <div className="rounded-lg border border-border/50 p-3 text-center">
                <p className="text-lg font-semibold tabular-nums">
                  {formatCurrency(user.totalSpent)}
                </p>
                <p className="text-xs text-muted-foreground">Toplam Harcama</p>
              </div>
            </div>
          </section>

          {/* Recent Reservations */}
          <section>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <CalendarRange className="h-3.5 w-3.5" />
              Son Rezervasyonlar
            </div>
            {resLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : !reservations || reservations.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border/50 p-4 text-center">
                <p className="text-xs text-muted-foreground/60 italic">
                  Henüz rezervasyon yok.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {reservations.slice(0, 5).map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">
                        {r.reservationCode}
                      </p>
                      <p className="text-sm font-medium">
                        {r.carBrandName} {r.carModelName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatShortDate(r.pickupDateTime)} —{" "}
                        {formatShortDate(r.returnDateTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs mb-1">
                        {statusLabels[r.status] ?? r.status}
                      </Badge>
                      <p className="text-xs font-medium tabular-nums">
                        {formatCurrency(r.grandTotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
