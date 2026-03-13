import {
  ShieldCheck,
  Plane,
  Headphones,
  FileCheck,
  Car,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Gizli ücret yok" },
  { icon: Plane, label: "Havalimanı teslimat" },
  { icon: Headphones, label: "7/24 destek" },
  { icon: FileCheck, label: "Şeffaf koşullar" },
  { icon: Car, label: "Premium filo" },
  { icon: Zap, label: "Hızlı onay" },
];

interface TrustStripProps {
  className?: string;
}

export function TrustStrip({ className }: TrustStripProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3",
        className
      )}
    >
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <item.icon className="h-4 w-4 text-primary/70" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
