import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";

type StatusVariant =
  | "confirmed"
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "default";

interface StatusBadgeProps {
  status: StatusVariant;
  label: string;
  className?: string;
}

const statusStyles: Record<StatusVariant, string> = {
  confirmed:
    "bg-success/10 text-success border-success/20 hover:bg-success/15",
  pending:
    "bg-warning/10 text-warning border-warning/20 hover:bg-warning/15",
  active:
    "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
  completed:
    "bg-muted text-muted-foreground border-border hover:bg-muted",
  cancelled:
    "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15",
  default:
    "bg-secondary text-secondary-foreground border-border hover:bg-secondary",
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium px-2.5 py-0.5",
        statusStyles[status],
        className
      )}
    >
      {label}
    </Badge>
  );
}
