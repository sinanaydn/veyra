"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, CalendarCheck, Settings, ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

const ACCOUNT_LINKS = [
  {
    href: ROUTES.ACCOUNT,
    label: "Hesap Özeti",
    icon: User,
    exact: true,
  },
  {
    href: ROUTES.ACCOUNT_RESERVATIONS,
    label: "Rezervasyonlarım",
    icon: CalendarCheck,
  },
  {
    href: ROUTES.ACCOUNT_PROFILE,
    label: "Profil",
    icon: Settings,
  },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col gap-1"
      aria-label="Hesap menüsü"
    >
      {ACCOUNT_LINKS.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/5 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.label}</span>
            {isActive && (
              <ChevronRight className="h-3.5 w-3.5 text-primary/50" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
