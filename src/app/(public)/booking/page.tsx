"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useBookingStore } from "@/lib/store/booking.store";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { BookingCarSummary } from "@/components/booking/booking-car-summary";
import { InsuranceSelector } from "@/components/booking/insurance-selector";
import { ExtrasSelector } from "@/components/booking/extras-selector";
import { DriverForm } from "@/components/booking/driver-form";
import { PriceBreakdown } from "@/components/booking/price-breakdown";
import type { DriverFormValues } from "@/features/booking/schemas/booking.schemas";

export default function BookingPage() {
  const router = useRouter();
  const car = useBookingStore((s) => s.car);
  const driverInfo = useBookingStore((s) => s.driverInfo);
  const setDriverInfo = useBookingStore((s) => s.setDriverInfo);
  const setStep = useBookingStore((s) => s.setStep);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Redirect if no car selected (direct URL access)
  useEffect(() => {
    if (!car) {
      router.replace(ROUTES.FLEET);
    }
  }, [car, router]);

  if (!car) return null;

  const handleContinue = () => {
    // Trigger form submit programmatically
    const form = document.getElementById("driver-form") as HTMLFormElement;
    form?.requestSubmit();
  };

  const onDriverSubmit = (values: DriverFormValues) => {
    setDriverInfo(values);
    setStep("payment");
    router.push(ROUTES.BOOKING_PAYMENT);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link
          href={ROUTES.HOME}
          className="hover:text-foreground transition-colors"
        >
          Ana Sayfa
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={ROUTES.FLEET}
          className="hover:text-foreground transition-colors"
        >
          Filo
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={ROUTES.CAR_DETAIL(car.slug)}
          className="hover:text-foreground transition-colors"
        >
          {car.brandName} {car.modelName}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">Rezervasyon</span>
      </nav>

      {/* Stepper */}
      <BookingStepper currentStep="summary" />

      <div className="space-y-8">
        {/* Car summary */}
        <BookingCarSummary />

        {/* Insurance */}
        <InsuranceSelector packages={car.insurancePackages} />

        {/* Extras */}
        <ExtrasSelector extras={car.extras} />

        {/* Driver form */}
        <DriverForm
          id="driver-form"
          defaultValues={driverInfo ?? undefined}
          onSubmit={onDriverSubmit}
        />

        {/* Price breakdown */}
        <PriceBreakdown />

        {/* CTA */}
        <div className="flex justify-end">
          <Button
            size="lg"
            className="gap-2"
            onClick={handleContinue}
          >
            Ödemeye Geç
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
