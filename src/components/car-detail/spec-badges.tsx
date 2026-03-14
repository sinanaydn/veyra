import {
  Cog,
  Fuel,
  Users,
  Briefcase,
  DoorOpen,
  Gauge,
  CalendarDays,
  MapPin,
} from "lucide-react";
import type { Car } from "@/features/cars/types/car.types";

const transmissionLabels: Record<string, string> = {
  AUTOMATIC: "Otomatik",
  MANUAL: "Manuel",
};

const fuelLabels: Record<string, string> = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  HYBRID: "Hibrit",
  ELECTRIC: "Elektrik",
};

interface SpecBadgesProps {
  car: Car;
}

export function SpecBadges({ car }: SpecBadgesProps) {
  const specs = [
    { icon: Cog, label: transmissionLabels[car.transmission] },
    { icon: Fuel, label: fuelLabels[car.fuelType] },
    { icon: Users, label: `${car.seats} Koltuk` },
    { icon: Briefcase, label: `${car.baggage} Bavul` },
    { icon: DoorOpen, label: `${car.doors} Kapı` },
    { icon: CalendarDays, label: `${car.year} Model` },
    { icon: Gauge, label: `${car.mileageLimit} km/gün` },
    { icon: MapPin, label: car.city },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5"
        >
          <spec.icon className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm font-medium">{spec.label}</span>
        </div>
      ))}
    </div>
  );
}
