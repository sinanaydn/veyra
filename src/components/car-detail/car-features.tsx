import { Sparkles, Check } from "lucide-react";

interface CarFeaturesProps {
  features: string[];
  description: string;
}

export function CarFeatures({ features, description }: CarFeaturesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Araç Özellikleri</h3>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2"
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
