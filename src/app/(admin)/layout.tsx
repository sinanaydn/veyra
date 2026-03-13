"use client";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { AdminGuard } from "@/lib/guards/admin-guard";
import { useUIStore } from "@/lib/store/ui.store";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <div
          className={cn(
            "flex flex-col transition-all duration-200",
            sidebarOpen ? "lg:pl-60" : "lg:pl-16"
          )}
        >
          <AdminTopbar />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
