"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { StatusDistribution as StatusDistItem } from "@/features/dashboard/services/dashboard.service";
import type { ReservationStatus } from "@/features/rentals/types/rental.types";
import { cn } from "@/lib/utils";

const statusColors: Record<ReservationStatus, string> = {
  PENDING: "bg-warning",
  CONFIRMED: "bg-success",
  ACTIVE: "bg-primary",
  COMPLETED: "bg-muted-foreground/40",
  CANCELLED: "bg-destructive/60",
};

interface StatusDistributionProps {
  data?: StatusDistItem[];
  isLoading?: boolean;
}

export function StatusDistribution({ data, isLoading }: StatusDistributionProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 rounded" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-3">
      {/* Bar */}
      <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
        {data.map((item) =>
          item.count > 0 ? (
            <div
              key={item.status}
              className={cn("transition-all", statusColors[item.status])}
              style={{ width: `${item.percentage}%` }}
            />
          ) : null
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {data.map((item) => (
          <div key={item.status} className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "inline-block h-2.5 w-2.5 rounded-full",
                statusColors[item.status]
              )}
            />
            <span className="text-muted-foreground">{item.label}</span>
            <span className="ml-auto font-medium tabular-nums">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
