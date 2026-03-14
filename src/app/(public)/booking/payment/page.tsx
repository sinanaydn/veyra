"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useBookingStore } from "@/lib/store/booking.store";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { BookingCarSummary } from "@/components/booking/booking-car-summary";
import { PaymentForm } from "@/components/booking/payment-form";
import { PriceBreakdown } from "@/components/booking/price-breakdown";
import type { PaymentFormValues } from "@/features/booking/schemas/booking.schemas";

export default function PaymentPage() {
  const router = useRouter();
  const car = useBookingStore((s) => s.car);
  const driverInfo = useBookingStore((s) => s.driverInfo);
  const setPaymentInfo = useBookingStore((s) => s.setPaymentInfo);
  const setStep = useBookingStore((s) => s.setStep);
  const setBookingResult = useBookingStore((s) => s.setBookingResult);
  const isProcessing = useBookingStore((s) => s.isProcessing);
  const setProcessing = useBookingStore((s) => s.setProcessing);

  // Redirect if prerequisites missing
  useEffect(() => {
    if (!car || !driverInfo) {
      router.replace(car ? ROUTES.BOOKING : ROUTES.FLEET);
    }
  }, [car, driverInfo, router]);

  if (!car || !driverInfo) return null;

  const handleSubmitClick = () => {
    const form = document.getElementById("payment-form") as HTMLFormElement;
    form?.requestSubmit();
  };

  const onPaymentSubmit = async (values: PaymentFormValues) => {
    setPaymentInfo(values);
    setProcessing(true);

    // Mock payment processing
    await new Promise((r) => setTimeout(r, 2000));

    // Mock booking result
    const code = `VYR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setBookingResult({
      reservationId: crypto.randomUUID(),
      reservationCode: code,
      createdAt: new Date().toISOString(),
    });

    setProcessing(false);
    setStep("confirmation");
    router.push(ROUTES.BOOKING_CONFIRMATION);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href={ROUTES.HOME} className="hover:text-foreground transition-colors">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={ROUTES.BOOKING} className="hover:text-foreground transition-colors">
          Rezervasyon
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">Ödeme</span>
      </nav>

      {/* Stepper */}
      <BookingStepper currentStep="payment" />

      <div className="space-y-8">
        {/* Car summary (compact) */}
        <BookingCarSummary />

        {/* Price breakdown */}
        <PriceBreakdown />

        {/* Payment form */}
        <PaymentForm id="payment-form" onSubmit={onPaymentSubmit} />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => {
              setStep("summary");
              router.push(ROUTES.BOOKING);
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Geri
          </Button>

          <Button
            size="lg"
            className="gap-2"
            onClick={handleSubmitClick}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                İşleniyor...
              </>
            ) : (
              "Ödemeyi Tamamla"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
