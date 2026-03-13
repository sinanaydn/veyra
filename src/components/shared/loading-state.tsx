import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  variant?: "card" | "table" | "list" | "page";
  count?: number;
  className?: string;
}

export function LoadingState({
  variant = "card",
  count = 3,
  className,
}: LoadingStateProps) {
  if (variant === "page") {
    return (
      <div className={cn("space-y-6 p-6", className)}>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-3", className)}>
        <Skeleton className="h-10 w-full rounded-lg" />
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-3 w-2/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // card variant
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border p-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
