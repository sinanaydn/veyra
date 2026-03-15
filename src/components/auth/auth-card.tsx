"use client";

import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Card body */}
      <div className="rounded-xl border border-border/70 bg-card p-6 shadow-sm">
        {children}
      </div>

      {/* Footer (link to other auth page) */}
      {footer && (
        <div className="text-center text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}
