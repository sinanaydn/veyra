"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBookingStore } from "@/lib/store/booking.store";

export function BookingCarSummary() {
  const car = useBookingStore((s) => s.car);
  const pickupLocation = useBookingStore((s) => s.pickupLocation);
  const returnLocation = useBookingStore((s) => s.returnLocation);
  const dates = useBookingStore((s) => s.dates);
  const rentalDays = useBookingStore((s) => s.rentalDays);

  if (!car || !dates) return null;

  const fullName = `${car.brandName} ${car.modelName}`;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex gap-4">
        {/* Car thumbnail */}
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
          {car.imageUrls[0] && (
            <Image
              src={car.imageUrls[0]}
              alt={fullName}
              fill
              className="object-cover"
              sizes="112px"
            />
          )}
        </div>

        {/* Car info */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{fullName}</h3>
          <p className="text-xs text-muted-foreground">
            {car.year} · {car.transmission === "AUTOMATIC" ? "Otomatik" : "Manuel"} ·{" "}
            {car.seats} koltuk
          </p>
          <Badge variant="secondary" className="mt-1.5 text-[10px]">
            {rentalDays} gün
          </Badge>
        </div>
      </div>

      {/* Pickup / Return info */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 rounded-lg bg-muted/50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Alış
          </p>
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">{pickupLocation?.label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            <span>{dates.pickupDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{dates.pickupTime}</span>
          </div>
        </div>

        <div className="space-y-1 rounded-lg bg-muted/50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            İade
          </p>
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">{returnLocation?.label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            <span>{dates.returnDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{dates.returnTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
