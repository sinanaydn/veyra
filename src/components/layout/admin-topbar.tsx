"use client";

import { Menu, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/auth.store";
import { useUIStore } from "@/lib/store/ui.store";

export function AdminTopbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "?";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="lg:hidden text-muted-foreground"
          aria-label="Menüyü aç"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground"
          aria-label="Bildirimler"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="ml-1 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {initials}
            </div>
            <span className="hidden text-sm font-medium sm:inline">
              {user?.firstName} {user?.lastName}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={logout}>
              <div className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                Çıkış Yap
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
