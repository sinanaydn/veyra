"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

const CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bodrum",
  "Dalaman",
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = i.toString().padStart(2, "0");
  return [`${h}:00`, `${h}:30`];
}).flat();

interface BookingWidgetProps {
  variant?: "hero" | "standalone";
  className?: string;
}

export function BookingWidget({
  variant = "hero",
  className,
}: BookingWidgetProps) {
  const router = useRouter();
  const [sameReturn, setSameReturn] = useState(true);
  const [pickupCity, setPickupCity] = useState("");
  const [returnCity, setReturnCity] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(ROUTES.FLEET);
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-sm",
        isHero && "shadow-md",
        className
      )}
    >
      {/* Same return toggle */}
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSameReturn(true)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            sameReturn
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Aynı lokasyona iade
        </button>
        <button
          type="button"
          onClick={() => setSameReturn(false)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            !sameReturn
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Farklı lokasyon
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Pickup location */}
        <FieldWrapper icon={MapPin} label="Alış Lokasyonu">
          <select
            value={pickupCity}
            onChange={(e) => {
              setPickupCity(e.target.value);
              if (sameReturn) setReturnCity(e.target.value);
            }}
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            aria-label="Alış lokasyonu"
          >
            <option value="">Şehir seçin</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </FieldWrapper>

        {/* Pickup date + time */}
        <FieldWrapper icon={Calendar} label="Alış Tarihi">
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
              aria-label="Alış tarihi"
            />
          </div>
        </FieldWrapper>

        <FieldWrapper icon={Clock} label="Alış Saati">
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            aria-label="Alış saati"
          >
            {HOURS.map((h) => (
              <option key={`p-${h}`} value={h}>
                {h}
              </option>
            ))}
          </select>
        </FieldWrapper>

        {/* Return location (conditional) */}
        {!sameReturn && (
          <FieldWrapper icon={ArrowLeftRight} label="İade Lokasyonu">
            <select
              value={returnCity}
              onChange={(e) => setReturnCity(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
              aria-label="İade lokasyonu"
            >
              <option value="">Şehir seçin</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </FieldWrapper>
        )}

        {/* Return date */}
        <FieldWrapper icon={Calendar} label="İade Tarihi">
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            aria-label="İade tarihi"
          />
        </FieldWrapper>

        {/* Return time */}
        <FieldWrapper icon={Clock} label="İade Saati">
          <select
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            aria-label="İade saati"
          >
            {HOURS.map((h) => (
              <option key={`r-${h}`} value={h}>
                {h}
              </option>
            ))}
          </select>
        </FieldWrapper>

        {/* CTA */}
        <div className="flex items-end">
          <Button type="submit" className="h-12 w-full text-sm font-semibold" size="lg">
            Hemen Rezervasyon
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

function FieldWrapper({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </label>
      <div className="rounded-lg border border-input bg-background px-3 py-2.5 transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/30">
        {children}
      </div>
    </div>
  );
}
