"use client";

import { User, Lock, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileForm } from "@/components/account/profile-form";
import { PasswordForm } from "@/components/account/password-form";
import { useAuthStore } from "@/lib/store/auth.store";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kişisel bilgilerinizi ve şifrenizi yönetin.
        </p>
      </div>

      {/* Personal Info Section */}
      <section className="rounded-xl border border-border/60 bg-card p-5 ring-1 ring-foreground/5">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-4.5 w-4.5 text-primary" />
          <h2 className="text-base font-semibold">Kişisel Bilgiler</h2>
        </div>
        {user ? (
          <ProfileForm user={user} />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
          </div>
        )}
      </section>

      {/* Password Section */}
      <section className="rounded-xl border border-border/60 bg-card p-5 ring-1 ring-foreground/5">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-4.5 w-4.5 text-primary" />
          <h2 className="text-base font-semibold">Şifre Değiştir</h2>
        </div>
        <PasswordForm />
      </section>

      {/* Preferences Section */}
      <section className="rounded-xl border border-border/60 bg-card p-5 ring-1 ring-foreground/5">
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-4.5 w-4.5 text-primary" />
          <h2 className="text-base font-semibold">Tercihler</h2>
        </div>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-border/40 p-3">
            <p className="text-xs text-muted-foreground">Dil</p>
            <p className="font-medium">
              {user?.preferredLanguage === "tr" ? "Türkçe" : "English"}
            </p>
          </div>
          <div className="rounded-lg border border-border/40 p-3">
            <p className="text-xs text-muted-foreground">Para Birimi</p>
            <p className="font-medium">{user?.preferredCurrency ?? "TRY"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
