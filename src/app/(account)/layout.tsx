"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccountNav } from "@/components/layout/account-nav";
import { AuthGuard } from "@/lib/guards/auth-guard";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Sidebar nav — desktop */}
              <aside className="hidden w-56 shrink-0 lg:block">
                <div className="sticky top-24">
                  <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Hesabım
                  </h2>
                  <AccountNav />
                </div>
              </aside>

              {/* Mobile nav */}
              <div className="lg:hidden">
                <AccountNav />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">{children}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
