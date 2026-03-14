"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { CarCard } from "@/components/fleet/car-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSimilarCars } from "@/features/cars/hooks/useCars";

interface RelatedCarsProps {
  carId: string;
}

export function RelatedCars({ carId }: RelatedCarsProps) {
  const { data: cars, isLoading } = useSimilarCars(carId);

  if (!isLoading && (!cars || cars.length === 0)) return null;

  return (
    <section className="mt-12">
      <SectionHeading
        title="Benzer Araçlar"
        subtitle="Bu araca benzer diğer seçenekleri inceleyin."
        align="left"
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
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
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cars?.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </section>
  );
}
