"use client";

import Link from "next/link";
import Image from "next/image";
import { Fuel, Users, Briefcase, Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import type { Car } from "@/features/cars/types/car.types";

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomik",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

const fuelLabels: Record<string, string> = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  HYBRID: "Hibrit",
  ELECTRIC: "Elektrik",
};

const transmissionLabels: Record<string, string> = {
  AUTOMATIC: "Otomatik",
  MANUAL: "Manuel",
};

interface CarCardProps {
  car: Car;
  className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
  return (
    <Link
      href={ROUTES.CAR_DETAIL(car.slug)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-border/80",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={car.imageUrls[0] || "/images/car-placeholder.svg"}
          alt={`${car.brandName} ${car.modelName}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 bg-card/90 backdrop-blur-sm text-xs"
        >
          {categoryLabels[car.category] ?? car.category}
        </Badge>
        {car.airportEligible && (
          <Badge
            variant="outline"
            className="absolute right-3 top-3 border-primary/20 bg-primary/5 text-primary text-xs backdrop-blur-sm"
          >
            Havalimanı
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-foreground">
          {car.brandName} {car.modelName}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{car.year}</p>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
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

        {/* Bottom row */}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-lg font-bold text-foreground">
              {car.pricePerDay.toLocaleString("tr-TR")} ₺
            </p>
            <p className="text-xs text-muted-foreground">/ gün</p>
          </div>
          <Button size="sm" className="text-xs">
            İncele
          </Button>
        </div>
      </div>
    </Link>
  );
}
