import { Skeleton } from "@/components/ui/skeleton";

export function FleetCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col sm:flex-row">
        <Skeleton className="aspect-[16/10] sm:aspect-auto sm:h-auto sm:w-64 md:w-72 lg:w-80 shrink-0" />
        <div className="flex-1 space-y-3 p-4 sm:p-5">
          <div className="flex justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-12 rounded-md" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-14" />
          </div>
          <Skeleton className="h-3.5 w-32" />
          <div className="flex items-end justify-between pt-2">
            <Skeleton className="h-5 w-14" />
            <div className="flex items-end gap-3">
              <div className="space-y-1">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FleetLoading({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <FleetCardSkeleton key={i} />
      ))}
    </div>
  );
}
