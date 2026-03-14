import {
  FileText,
  Fuel,
  Gauge,
  CreditCard,
  Clock,
  Info,
} from "lucide-react";
import type { Car } from "@/features/cars/types/car.types";

const fuelPolicyLabels: Record<string, string> = {
  FULL_TO_FULL: "Dolu-Dolu",
  SAME_TO_SAME: "Aynı Seviye",
  PRE_PURCHASE: "Ön Alım",
};

const fuelPolicyDescriptions: Record<string, string> = {
  FULL_TO_FULL:
    "Aracı dolu depo teslim alır, dolu depo iade edersiniz.",
  SAME_TO_SAME:
    "Aracı aldığınız yakıt seviyesinde iade edersiniz.",
  PRE_PURCHASE:
    "Yakıtı kiralama sırasında satın alır, boş depo iade edebilirsiniz.",
};

interface RentalConditionsProps {
  car: Car;
}

export function RentalConditions({ car }: RentalConditionsProps) {
  const conditions = [
    {
      icon: Fuel,
      title: "Yakıt Politikası",
      value: fuelPolicyLabels[car.fuelPolicy],
      description: fuelPolicyDescriptions[car.fuelPolicy],
    },
    {
      icon: Gauge,
      title: "Günlük KM Limiti",
      value: `${car.mileageLimit} km`,
      description: "Limit aşımında ekstra km ücreti uygulanır.",
    },
    {
      icon: CreditCard,
      title: "Depozito",
      value: `${car.depositAmount.toLocaleString("tr-TR")} ₺`,
      description:
        "Aracın teslimi sırasında kredi kartınızdan bloke edilir, iadede serbest bırakılır.",
    },
    {
      icon: Clock,
      title: "Minimum Kiralama",
      value: "1 gün",
      description: "Minimum 24 saat kiralama süresi uygulanır.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">
          Kiralama Koşulları
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {conditions.map((cond) => (
          <div
            key={cond.title}
            className="flex gap-3 rounded-lg border bg-card p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <cond.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium">{cond.title}</p>
                <span className="text-xs font-semibold text-primary">
                  {cond.value}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {cond.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-xs leading-relaxed">
          Kiralama koşulları araç ve dönem bazında değişiklik gösterebilir.
          Rezervasyon sırasında güncel koşullar onayınıza sunulur.
        </p>
      </div>
    </div>
  );
}
