import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
