import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function KPICard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  className,
}: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-card p-4 ring-1 ring-border/50",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground/60" />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {(subtitle || trend) && (
          <div className="mt-0.5 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-success" : "text-destructive"
                )}
              >
                {trend.value}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
