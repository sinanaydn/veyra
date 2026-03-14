"use client";

import { AlertCircle } from "lucide-react";

interface AuthErrorProps {
  message: string | null;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
}
