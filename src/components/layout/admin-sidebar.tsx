"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Tags,
  Layers,
  CalendarCheck,
  Users,
  FileText,
  HelpCircle,
  BookOpen,
  Star,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui.store";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  {
    title: "Genel",
    items: [
      { href: ROUTES.ADMIN, label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: "Filo Yönetimi",
    items: [
      { href: ROUTES.ADMIN_CARS, label: "Araçlar", icon: Car },
      { href: ROUTES.ADMIN_BRANDS, label: "Markalar", icon: Tags },
      { href: ROUTES.ADMIN_MODELS, label: "Modeller", icon: Layers },
    ],
  },
  {
    title: "Operasyon",
    items: [
      { href: ROUTES.ADMIN_RESERVATIONS, label: "Rezervasyonlar", icon: CalendarCheck },
      { href: ROUTES.ADMIN_USERS, label: "Kullanıcılar", icon: Users },
    ],
  },
  {
    title: "İçerik",
    items: [
      { href: ROUTES.ADMIN_CONTENT, label: "İçerik", icon: FileText },
      { href: ROUTES.ADMIN_FAQ, label: "SSS", icon: HelpCircle },
      { href: ROUTES.ADMIN_BLOG, label: "Blog", icon: BookOpen },
      { href: ROUTES.ADMIN_REVIEWS, label: "Yorumlar", icon: Star },
    ],
  },
  {
    title: "Sistem",
    items: [
      { href: ROUTES.ADMIN_SETTINGS, label: "Ayarlar", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200",
        sidebarOpen ? "w-60" : "w-16"
      )}
    >
      {/* Logo + collapse */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
        {sidebarOpen ? (
          <Logo />
        ) : (
          <Logo variant="compact" />
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
          aria-label={sidebarOpen ? "Menüyü daralt" : "Menüyü genişlet"}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              !sidebarOpen && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Yönetim menüsü">
        {ADMIN_NAV.map((group) => (
          <div key={group.title} className="mb-4">
            {sidebarOpen && (
              <h3 className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                {group.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isExact = "exact" in item && item.exact;
                const isActive = isExact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={!sidebarOpen ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                      !sidebarOpen && "justify-center px-0"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer — site link */}
      {sidebarOpen && (
        <div className="border-t border-sidebar-border px-3 py-3">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            Siteye Git
          </Link>
        </div>
      )}
    </aside>
  );
}
