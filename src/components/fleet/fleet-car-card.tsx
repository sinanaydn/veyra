"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Fuel,
  Users,
  Briefcase,
  Cog,
  Plane,
  ShieldCheck,
  ArrowRight,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import type { Car } from "@/features/cars/types/car.types";
import {
  categoryLabels,
  transmissionLabels,
  fuelLabels,
  availabilityLabels,
} from "@/features/cars/hooks/useFleetFilters";

interface FleetCarCardProps {
  car: Car;
  className?: string;
}

const availabilityColors: Record<string, string> = {
  AVAILABLE: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  RESERVED: "bg-amber-500/10 text-amber-600 border-amber-200",
  MAINTENANCE: "bg-red-500/10 text-red-600 border-red-200",
};

export function FleetCarCard({ car, className }: FleetCarCardProps) {
  const isAvailable = car.availability === "AVAILABLE";

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:shadow-md",
        !isAvailable && "opacity-75",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted sm:aspect-auto sm:w-64 md:w-72 lg:w-80 shrink-0">
          <Image
            src={car.imageUrls[0] || "/images/car-placeholder.svg"}
            alt={`${car.brandName} ${car.modelName}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 320px"
          />

          {/* Category badge */}
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 bg-card/90 text-xs backdrop-blur-sm"
          >
            {categoryLabels[car.category]}
          </Badge>

          {/* Airport badge */}
          {car.airportEligible && (
            <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm">
              <Plane className="h-3.5 w-3.5" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Top row: title + rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-lg font-semibold leading-tight">
                {car.brandName} {car.modelName}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {car.year} · {car.city}
              </p>
            </div>
            {car.rating > 0 && (
              <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                <Star className="h-3 w-3 fill-current" />
                {car.rating.toFixed(1)}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Cog className="h-3.5 w-3.5" />
              {transmissionLabels[car.transmission]}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="h-3.5 w-3.5" />
              {fuelLabels[car.fuelType]}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {car.seats} koltuk
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              {car.baggage} bavul
            </span>
          </div>

          {/* Benefit line */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-primary/80">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Kasko dahil · Ücretsiz iptal</span>
          </div>

          {/* Bottom row */}
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div className="flex items-baseline gap-2">
              {/* Availability */}
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px]",
                  availabilityColors[car.availability]
                )}
              >
                {availabilityLabels[car.availability]}
              </Badge>
            </div>

            <div className="flex items-end gap-3">
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">
                  {car.pricePerDay.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[10px] text-muted-foreground">
                  / gün · {car.depositAmount.toLocaleString("tr-TR")} ₺
                  depozito
                </p>
              </div>

              <Link href={ROUTES.CAR_DETAIL(car.slug)}>
                <Button
                  size="sm"
                  disabled={!isAvailable}
                  className="gap-1"
                >
                  Detay
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
