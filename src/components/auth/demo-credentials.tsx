"use client";

import { Info } from "lucide-react";

interface DemoCredentialsProps {
  onSelect?: (email: string) => void;
}

const DEMO_ACCOUNTS = [
  { label: "Admin", email: "admin@veyra.com.tr" },
  { label: "Kullanıcı", email: "elif.demir@email.com" },
];

export function DemoCredentials({ onSelect }: DemoCredentialsProps) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-start gap-2">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-primary">Demo Hesaplar</p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => onSelect?.(acc.email)}
                className="rounded-md border border-primary/30 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                {acc.label}: {acc.email}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Herhangi bir şifre ile giriş yapabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
