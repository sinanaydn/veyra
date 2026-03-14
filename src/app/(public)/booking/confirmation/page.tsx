"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useBookingStore } from "@/lib/store/booking.store";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { ConfirmationCard } from "@/components/booking/confirmation-card";

export default function ConfirmationPage() {
  const router = useRouter();
  const bookingResult = useBookingStore((s) => s.bookingResult);
  const reset = useBookingStore((s) => s.reset);

  // Redirect if no result
  useEffect(() => {
    if (!bookingResult) {
      router.replace(ROUTES.FLEET);
    }
  }, [bookingResult, router]);

  if (!bookingResult) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Stepper */}
      <BookingStepper currentStep="confirmation" />

      {/* Confirmation card */}
      <ConfirmationCard />

      {/* Bottom actions */}
      <div className="mt-8 flex justify-center gap-3">
        <Link href={ROUTES.FLEET}>
          <Button
            variant="outline"
            onClick={() => reset()}
          >
            Filoya Dön
          </Button>
        </Link>
        <Link href={ROUTES.HOME}>
          <Button onClick={() => reset()}>Ana Sayfaya Git</Button>
        </Link>
      </div>
    </section>
  );
}
