import Link from "next/link";
import { Plus, Car, CalendarCheck, Users } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const actions = [
  {
    label: "Araç Ekle",
    href: ROUTES.ADMIN_CARS,
    icon: Plus,
  },
  {
    label: "Araçlar",
    href: ROUTES.ADMIN_CARS,
    icon: Car,
  },
  {
    label: "Rezervasyonlar",
    href: ROUTES.ADMIN_RESERVATIONS,
    icon: CalendarCheck,
  },
  {
    label: "Kullanıcılar",
    href: ROUTES.ADMIN_USERS,
    icon: Users,
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-border/40 p-3 text-center transition-colors hover:bg-muted/50"
        >
          <action.icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
