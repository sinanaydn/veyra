"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Star,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import type { Car } from "@/features/cars/types/car.types";
import { useBookingStore } from "@/lib/store/booking.store";
import { ROUTES } from "@/lib/constants/routes";

const availabilityLabels: Record<string, string> = {
  AVAILABLE: "Müsait",
  RESERVED: "Rezerve",
  MAINTENANCE: "Bakımda",
};

const availabilityColors: Record<string, string> = {
  AVAILABLE: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  RESERVED: "bg-amber-500/10 text-amber-600 border-amber-200",
  MAINTENANCE: "bg-red-500/10 text-red-600 border-red-200",
};

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomik",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

interface BookingSummaryProps {
  car: Car;
}

export function BookingSummary({ car }: BookingSummaryProps) {
  const router = useRouter();
  const initBooking = useBookingStore((s) => s.initBooking);
  const isAvailable = car.availability === "AVAILABLE";

  // Demo: 3-day rental
  const days = 3;
  const subtotal = car.pricePerDay * days;
  const insuranceDaily = 0; // Temel kasko
  const insuranceTotal = insuranceDaily * days;
  const total = subtotal + insuranceTotal;

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="p-5">
        {/* Price + Category */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold">
              {car.pricePerDay.toLocaleString("tr-TR")} ₺
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / gün
              </span>
            </p>
            <Badge
              variant="secondary"
              className="mt-1.5 text-[10px]"
            >
              {categoryLabels[car.category]}
            </Badge>
          </div>

          {car.rating > 0 && (
            <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              <Star className="h-3 w-3 fill-current" />
              {car.rating.toFixed(1)}
              <span className="text-muted-foreground">
                ({car.reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="mt-4">
          <Badge
            variant="outline"
            className={availabilityColors[car.availability]}
          >
            {availabilityLabels[car.availability]}
          </Badge>
        </div>

        <Separator className="my-4" />

        {/* Trip details placeholder */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Kiralama Özeti
          </p>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Süre:</span>
              <span className="ml-auto font-medium">{days} gün</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Lokasyon:</span>
              <span className="ml-auto font-medium">{car.city}</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Price breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {car.pricePerDay.toLocaleString("tr-TR")} ₺ × {days} gün
            </span>
            <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Temel Kasko</span>
            <span className="text-emerald-600">Ücretsiz</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ekstra hizmetler</span>
            <span className="text-muted-foreground">—</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between">
            <span className="font-medium">Toplam</span>
            <span className="text-lg font-bold text-primary">
              {total.toLocaleString("tr-TR")} ₺
            </span>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Depozito (bloke)</span>
            <span>{car.depositAmount.toLocaleString("tr-TR")} ₺</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          className="mt-5 w-full gap-1.5"
          size="lg"
          disabled={!isAvailable}
          onClick={() => {
            if (!isAvailable) return;
            initBooking({
              car,
              pickupLocation: {
                id: "demo-pickup",
                label: `${car.city} Ofis`,
              },
              returnLocation: {
                id: "demo-return",
                label: `${car.city} Ofis`,
              },
              dates: {
                pickupDate: "18.03.2026",
                pickupTime: "10:00",
                returnDate: "21.03.2026",
                returnTime: "10:00",
              },
              rentalDays: days,
            });
            router.push(ROUTES.BOOKING);
          }}
        >
          {isAvailable ? (
            <>
              Rezervasyona Devam Et
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            "Şu an müsait değil"
          )}
        </Button>

        {/* Trust indicators */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Ücretsiz iptal · Gizli ücret yok
        </div>
      </div>
    </div>
  );
}
