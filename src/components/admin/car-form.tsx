"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBrands } from "@/features/brands/hooks/useBrands";
import { useModelsByBrand } from "@/features/models/hooks/useModels";
import { useCities } from "@/features/locations/hooks/useLocations";
import type { Car } from "@/features/cars/types/car.types";

const carSchema = z.object({
  brandId: z.string().min(1, "Marka seçiniz"),
  brandName: z.string().min(1),
  modelId: z.string().min(1, "Model seçiniz"),
  modelName: z.string().min(1),
  year: z.coerce.number().min(2020).max(2027),
  category: z.enum(["ECONOMY", "SEDAN", "SUV", "EXECUTIVE", "VIP"]),
  city: z.string().min(1, "Şehir seçiniz"),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  fuelType: z.enum(["GASOLINE", "DIESEL", "HYBRID", "ELECTRIC"]),
  seats: z.coerce.number().min(2).max(9),
  baggage: z.coerce.number().min(0).max(6),
  doors: z.coerce.number().min(2).max(5),
  pricePerDay: z.coerce.number().min(100, "Minimum 100 TL"),
  depositAmount: z.coerce.number().min(0),
  mileageLimit: z.coerce.number().min(0),
  fuelPolicy: z.enum(["FULL_TO_FULL", "SAME_TO_SAME", "PRE_PURCHASE"]),
  availability: z.enum(["AVAILABLE", "RESERVED", "MAINTENANCE"]),
  airportEligible: z.boolean(),
  description: z.string().min(10, "En az 10 karakter"),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
});

export type CarFormValues = z.infer<typeof carSchema>;

interface CarFormProps {
  car?: Car | null;
  onSubmit: (values: CarFormValues) => void;
  isSubmitting: boolean;
}

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomi",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

const transmissionLabels: Record<string, string> = {
  AUTOMATIC: "Otomatik",
  MANUAL: "Manuel",
};

const fuelLabels: Record<string, string> = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  HYBRID: "Hibrit",
  ELECTRIC: "Elektrik",
};

const fuelPolicyLabels: Record<string, string> = {
  FULL_TO_FULL: "Dolu-Dolu",
  SAME_TO_SAME: "Aynı Seviye",
  PRE_PURCHASE: "Ön Ödeme",
};

const availabilityLabels: Record<string, string> = {
  AVAILABLE: "Müsait",
  RESERVED: "Rezerveli",
  MAINTENANCE: "Bakımda",
};

export function CarForm({ car, onSubmit, isSubmitting }: CarFormProps) {
  const { data: brands } = useBrands();
  const { data: cities } = useCities();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: car
      ? {
          brandId: car.brandId,
          brandName: car.brandName,
          modelId: car.modelId,
          modelName: car.modelName,
          year: car.year,
          category: car.category,
          city: car.city,
          transmission: car.transmission,
          fuelType: car.fuelType,
          seats: car.seats,
          baggage: car.baggage,
          doors: car.doors,
          pricePerDay: car.pricePerDay,
          depositAmount: car.depositAmount,
          mileageLimit: car.mileageLimit,
          fuelPolicy: car.fuelPolicy,
          availability: car.availability,
          airportEligible: car.airportEligible,
          description: car.description,
          rating: car.rating,
          reviewCount: car.reviewCount,
        }
      : {
          brandId: "",
          brandName: "",
          modelId: "",
          modelName: "",
          year: 2025,
          category: "SEDAN",
          city: "",
          transmission: "AUTOMATIC",
          fuelType: "GASOLINE",
          seats: 5,
          baggage: 2,
          doors: 4,
          pricePerDay: 1500,
          depositAmount: 5000,
          mileageLimit: 300,
          fuelPolicy: "FULL_TO_FULL",
          availability: "AVAILABLE",
          airportEligible: true,
          description: "",
          rating: 4.0,
          reviewCount: 0,
        },
  });

  const selectedBrandId = watch("brandId");
  const { data: models } = useModelsByBrand(selectedBrandId);

  // Sync brandName when brand changes
  useEffect(() => {
    if (brands && selectedBrandId) {
      const brand = brands.find((b) => b.id === selectedBrandId);
      if (brand) setValue("brandName", brand.name);
    }
  }, [selectedBrandId, brands, setValue]);

  // Sync modelName and category when model changes
  const selectedModelId = watch("modelId");
  useEffect(() => {
    if (models && selectedModelId) {
      const model = models.find((m) => m.id === selectedModelId);
      if (model) {
        setValue("modelName", model.name);
        setValue("category", model.category);
      }
    }
  }, [selectedModelId, models, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── Temel Bilgiler ── */}
      <Section title="Temel Bilgiler">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Marka" error={errors.brandId?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("brandId")}
            >
              <option value="">Seçiniz</option>
              {brands?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Model" error={errors.modelId?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("modelId")}
              disabled={!selectedBrandId}
            >
              <option value="">Seçiniz</option>
              {models?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Yıl" error={errors.year?.message}>
            <Input type="number" {...register("year")} />
          </Field>
          <Field label="Kategori" error={errors.category?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("category")}
            >
              {Object.entries(categoryLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Şehir" error={errors.city?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("city")}
            >
              <option value="">Seçiniz</option>
              {cities?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      {/* ── Teknik Özellikler ── */}
      <Section title="Teknik Özellikler">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Vites" error={errors.transmission?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("transmission")}
            >
              {Object.entries(transmissionLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Yakıt" error={errors.fuelType?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("fuelType")}
            >
              {Object.entries(fuelLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Yakıt Politikası" error={errors.fuelPolicy?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("fuelPolicy")}
            >
              {Object.entries(fuelPolicyLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Koltuk" error={errors.seats?.message}>
            <Input type="number" {...register("seats")} />
          </Field>
          <Field label="Bagaj" error={errors.baggage?.message}>
            <Input type="number" {...register("baggage")} />
          </Field>
          <Field label="Kapı" error={errors.doors?.message}>
            <Input type="number" {...register("doors")} />
          </Field>
        </div>
      </Section>

      {/* ── Fiyat & Durum ── */}
      <Section title="Fiyat & Durum">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Günlük Fiyat (₺)" error={errors.pricePerDay?.message}>
            <Input type="number" {...register("pricePerDay")} />
          </Field>
          <Field label="Depozito (₺)" error={errors.depositAmount?.message}>
            <Input type="number" {...register("depositAmount")} />
          </Field>
          <Field label="Km Limiti" error={errors.mileageLimit?.message}>
            <Input type="number" {...register("mileageLimit")} />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Müsaitlik" error={errors.availability?.message}>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("availability")}
            >
              {Object.entries(availabilityLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Havalimanı Uygun">
            <label className="flex items-center gap-2 pt-1.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border"
                {...register("airportEligible")}
              />
              <span className="text-sm">Havalimanı teslimat</span>
            </label>
          </Field>
        </div>
      </Section>

      {/* ── Açıklama ── */}
      <Section title="Açıklama">
        <Field label="Araç Açıklaması" error={errors.description?.message}>
          <Textarea
            rows={3}
            placeholder="Araç hakkında kısa açıklama..."
            {...register("description")}
          />
        </Field>
      </Section>

      {/* ── Görseller (Placeholder) ── */}
      <Section title="Görseller">
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border/60 py-10">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Görsel Yükleme
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              API entegrasyonu ile aktif olacak
            </p>
          </div>
        </div>
      </Section>

      {/* ── Submit ── */}
      <div className="sticky bottom-0 flex justify-end gap-2 border-t border-border/40 bg-background pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {car ? "Güncelle" : "Oluştur"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
