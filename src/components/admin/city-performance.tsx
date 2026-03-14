"use client";

import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { CityPerformance as CityItem } from "@/features/dashboard/services/dashboard.service";

interface CityPerformanceProps {
  data?: CityItem[];
  isLoading?: boolean;
}

export function CityPerformance({ data, isLoading }: CityPerformanceProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Şehir verisi bulunmuyor.
      </p>
    );
  }

  const maxCars = Math.max(...data.map((d) => d.carCount));

  return (
    <div className="space-y-2.5">
      {data.map((city) => (
        <div key={city.city} className="flex items-center gap-3">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{city.city}</span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {city.carCount} araç · {city.reservationCount} rez.
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/60 transition-all"
                style={{
                  width: `${maxCars > 0 ? (city.carCount / maxCars) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
