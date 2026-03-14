"use client";

import { CalendarCheck, UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateRelative } from "@/lib/utils/format";
import type { RecentActivity } from "@/features/dashboard/services/dashboard.service";

interface ActivityFeedProps {
  data?: RecentActivity[];
  isLoading?: boolean;
}

export function ActivityFeed({ data, isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Henüz aktivite bulunmuyor.
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {data.map((activity) => {
        const Icon = activity.type === "reservation" ? CalendarCheck : UserPlus;
        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{activity.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{activity.subtitle}</span>
                <span>·</span>
                <span>{formatDateRelative(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
