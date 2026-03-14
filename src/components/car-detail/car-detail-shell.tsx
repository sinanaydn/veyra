"use client";

import Link from "next/link";
import { ChevronRight, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/constants/routes";
import { useCarBySlug } from "@/features/cars/hooks/useCars";

import { CarGallery } from "./car-gallery";
import { SpecBadges } from "./spec-badges";
import { InsurancePackages } from "./insurance-packages";
import { ExtrasBlock } from "./extras-block";
import { CarFeatures } from "./car-features";
import { RentalConditions } from "./rental-conditions";
import { BookingSummary } from "./booking-summary";
import { RelatedCars } from "./related-cars";
import { DetailLoading } from "./detail-loading";
import { DetailNotFound } from "./detail-not-found";

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomik",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

interface CarDetailShellProps {
  slug: string;
}

export function CarDetailShell({ slug }: CarDetailShellProps) {
  const { data: car, isLoading } = useCarBySlug(slug);

  if (isLoading) return <DetailLoading />;
  if (!car) return <DetailNotFound />;

  const fullName = `${car.brandName} ${car.modelName}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href={ROUTES.HOME} className="hover:text-foreground transition-colors">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={ROUTES.FLEET} className="hover:text-foreground transition-colors">
          Filo
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{fullName}</span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left column — content */}
        <div className="min-w-0 flex-1 space-y-8">
          {/* Gallery */}
          <CarGallery images={car.imageUrls} alt={fullName} />

          {/* Title block */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold sm:text-3xl">
                {fullName}
              </h1>
              <Badge variant="secondary">
                {categoryLabels[car.category]}
              </Badge>
              {car.airportEligible && (
                <Badge
                  variant="outline"
                  className="gap-1 border-primary/20 bg-primary/5 text-primary"
                >
                  <Plane className="h-3 w-3" />
                  Havalimanı
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {car.year} · {car.city} · {car.reviewCount} değerlendirme
            </p>
          </div>

          {/* Spec badges */}
          <SpecBadges car={car} />

          <Separator />

          {/* Car features */}
          <CarFeatures
            features={car.features}
            description={car.description}
          />

          <Separator />

          {/* Rental conditions */}
          <RentalConditions car={car} />

          <Separator />

          {/* Insurance packages */}
          <InsurancePackages packages={car.insurancePackages} />

          <Separator />

          {/* Extras */}
          <ExtrasBlock extras={car.extras} />

          {/* Related cars */}
          <RelatedCars carId={car.id} />
        </div>

        {/* Right column — sticky summary */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="sticky top-24">
            <BookingSummary car={car} />
          </div>
        </div>
      </div>
    </section>
  );
}
