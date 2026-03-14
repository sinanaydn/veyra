"use client";

import { create } from "zustand";
import type { Car, InsurancePackage, ExtraService } from "@/features/cars/types/car.types";
import type { DriverFormValues, PaymentFormValues } from "@/features/booking/schemas/booking.schemas";

export type BookingStep = "summary" | "payment" | "confirmation";

export interface BookingDates {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

export interface BookingLocation {
  id: string;
  label: string;
}

export interface PriceLine {
  label: string;
  amount: number;
  type: "base" | "insurance" | "extra" | "deposit" | "total";
}

export interface BookingResult {
  reservationId: string;
  reservationCode: string;
  createdAt: string;
}

interface BookingState {
  /* ── Core booking data ── */
  car: Car | null;
  pickupLocation: BookingLocation | null;
  returnLocation: BookingLocation | null;
  dates: BookingDates | null;
  rentalDays: number;

  /* ── Selections ── */
  selectedInsurance: InsurancePackage | null;
  selectedExtras: ExtraService[];

  /* ── Forms ── */
  driverInfo: DriverFormValues | null;
  paymentInfo: PaymentFormValues | null;

  /* ── Flow ── */
  currentStep: BookingStep;
  isProcessing: boolean;

  /* ── Result ── */
  bookingResult: BookingResult | null;

  /* ── Actions ── */
  initBooking: (params: {
    car: Car;
    pickupLocation: BookingLocation;
    returnLocation: BookingLocation;
    dates: BookingDates;
    rentalDays: number;
  }) => void;

  setInsurance: (pkg: InsurancePackage | null) => void;
  toggleExtra: (extra: ExtraService) => void;
  setDriverInfo: (info: DriverFormValues) => void;
  setPaymentInfo: (info: PaymentFormValues) => void;
  setStep: (step: BookingStep) => void;
  setProcessing: (val: boolean) => void;
  setBookingResult: (result: BookingResult) => void;
  reset: () => void;
}

const initialState = {
  car: null as Car | null,
  pickupLocation: null as BookingLocation | null,
  returnLocation: null as BookingLocation | null,
  dates: null as BookingDates | null,
  rentalDays: 3,
  selectedInsurance: null as InsurancePackage | null,
  selectedExtras: [] as ExtraService[],
  driverInfo: null as DriverFormValues | null,
  paymentInfo: null as PaymentFormValues | null,
  currentStep: "summary" as BookingStep,
  isProcessing: false,
  bookingResult: null as BookingResult | null,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,

  initBooking: ({ car, pickupLocation, returnLocation, dates, rentalDays }) => {
    set({
      ...initialState,
      car,
      pickupLocation,
      returnLocation,
      dates,
      rentalDays,
      selectedInsurance: car.insurancePackages[0] ?? null,
    });
  },

  setInsurance: (pkg) => set({ selectedInsurance: pkg }),

  toggleExtra: (extra) => {
    const current = get().selectedExtras;
    const exists = current.find((e) => e.id === extra.id);
    set({
      selectedExtras: exists
        ? current.filter((e) => e.id !== extra.id)
        : [...current, extra],
    });
  },

  setDriverInfo: (info) => set({ driverInfo: info }),
  setPaymentInfo: (info) => set({ paymentInfo: info }),
  setStep: (step) => set({ currentStep: step }),
  setProcessing: (val) => set({ isProcessing: val }),
  setBookingResult: (result) => set({ bookingResult: result }),
  reset: () => set(initialState),
}));

// ── Pure helpers (not store methods — call outside of selectors) ──

export function computePriceBreakdown(
  car: Car,
  rentalDays: number,
  selectedInsurance: InsurancePackage | null,
  selectedExtras: ExtraService[]
): PriceLine[] {
  const lines: PriceLine[] = [];

  lines.push({
    label: `Araç kirası (${rentalDays} gün × ${car.pricePerDay.toLocaleString("tr-TR")}₺)`,
    amount: car.pricePerDay * rentalDays,
    type: "base",
  });

  if (selectedInsurance && selectedInsurance.pricePerDay > 0) {
    lines.push({
      label: `${selectedInsurance.name} (${rentalDays} gün)`,
      amount: selectedInsurance.pricePerDay * rentalDays,
      type: "insurance",
    });
  }

  for (const extra of selectedExtras) {
    const amount =
      extra.priceType === "PER_DAY"
        ? extra.pricePerDay * rentalDays
        : extra.pricePerDay;
    lines.push({
      label:
        extra.priceType === "PER_DAY"
          ? `${extra.name} (${rentalDays} gün)`
          : extra.name,
      amount,
      type: "extra",
    });
  }

  lines.push({
    label: "Depozito (iade edilecek)",
    amount: car.depositAmount,
    type: "deposit",
  });

  const total = lines.reduce(
    (sum, l) => (l.type !== "deposit" ? sum + l.amount : sum),
    0
  );
  lines.push({ label: "Toplam", amount: total, type: "total" });

  return lines;
}

// Selectors
export const selectCar = (s: BookingState) => s.car;
export const selectStep = (s: BookingState) => s.currentStep;
export const selectIsProcessing = (s: BookingState) => s.isProcessing;
export const selectBookingResult = (s: BookingState) => s.bookingResult;
