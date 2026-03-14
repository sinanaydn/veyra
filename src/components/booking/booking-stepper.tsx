"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingStep } from "@/lib/store/booking.store";

const STEPS: { key: BookingStep; label: string }[] = [
  { key: "summary", label: "Rezervasyon" },
  { key: "payment", label: "Ödeme" },
  { key: "confirmation", label: "Onay" },
];

const stepIndex = (step: BookingStep) =>
  STEPS.findIndex((s) => s.key === step);

interface BookingStepperProps {
  currentStep: BookingStep;
}

export function BookingStepper({ currentStep }: BookingStepperProps) {
  const current = stepIndex(currentStep);

  return (
    <nav className="mx-auto mb-8 flex max-w-lg items-center justify-between">
      {STEPS.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;

        return (
          <div key={step.key} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isDone &&
                    "border-primary bg-primary text-primary-foreground",
                  isActive &&
                    "border-primary bg-primary/10 text-primary",
                  !isDone &&
                    !isActive &&
                    "border-muted-foreground/30 text-muted-foreground/50"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive && "text-primary",
                  isDone && "text-foreground",
                  !isDone && !isActive && "text-muted-foreground/50"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-0.5 w-16 rounded-full sm:w-24",
                  i < current ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
