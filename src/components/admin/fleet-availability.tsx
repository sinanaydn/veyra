"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { FleetAvailability as FleetItem } from "@/features/dashboard/services/dashboard.service";
import type { AvailabilityStatus } from "@/features/cars/types/car.types";
import { cn } from "@/lib/utils";

const availColors: Record<AvailabilityStatus, string> = {
  AVAILABLE: "bg-success text-success",
  RESERVED: "bg-warning text-warning",
  MAINTENANCE: "bg-destructive text-destructive",
};

interface FleetAvailabilityCardProps {
  data?: FleetItem[];
  isLoading?: boolean;
}

export function FleetAvailabilityCard({ data, isLoading }: FleetAvailabilityCardProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.status}
          className="flex items-center gap-3 rounded-lg border border-border/40 p-3"
        >
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg bg-opacity-10",
              availColors[item.status].split(" ")[0] + "/10"
            )}
          >
            <span className={cn("text-base font-bold tabular-nums", availColors[item.status].split(" ")[1])}>
              {item.count}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">
              {total > 0 ? Math.round((item.count / total) * 100) : 0}% filo
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
