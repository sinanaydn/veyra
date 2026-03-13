import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light" | "compact";
  className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn("flex items-center gap-2 transition-opacity hover:opacity-80", className)}
      aria-label="Veyra — Ana Sayfa"
    >
      {/* Geometric mark — premium minimal */}
      <div
        className={cn(
          "flex items-center justify-center rounded-lg font-heading font-extrabold tracking-tighter",
          variant === "compact" ? "h-7 w-7 text-xs" : "h-8 w-8 text-sm",
          "bg-primary text-primary-foreground"
        )}
      >
        V
      </div>
      {variant !== "compact" && (
        <span
          className={cn(
            "font-heading font-bold tracking-tight",
            variant === "light" ? "text-white" : "text-foreground",
            "text-lg"
          )}
        >
          Veyra
        </span>
      )}
    </Link>
  );
}
