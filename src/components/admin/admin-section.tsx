import { cn } from "@/lib/utils";

interface AdminSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AdminSection({
  title,
  description,
  action,
  children,
  className,
}: AdminSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
