import { Skeleton } from "@/components/ui/skeleton";

export function DetailLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Skeleton className="mb-6 h-4 w-48" />

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left column */}
        <div className="min-w-0 flex-1 space-y-8">
          {/* Gallery */}
          <Skeleton className="aspect-[16/10] rounded-xl" />

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Spec badges */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg" />
            ))}
          </div>

          {/* Sections */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Right column — summary */}
        <div className="w-full shrink-0 lg:w-80">
          <Skeleton className="h-[450px] rounded-xl" />
        </div>
      </div>
    </section>
  );
}
