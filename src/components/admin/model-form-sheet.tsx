"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBrands } from "@/features/brands/hooks/useBrands";
import {
  useCreateModel,
  useUpdateModel,
} from "@/features/models/hooks/useModelMutations";
import type { CarModel } from "@/features/models/types/model.types";

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomi",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

const modelSchema = z.object({
  brandId: z.string().min(1, "Marka seçiniz"),
  name: z.string().min(2, "Model adı en az 2 karakter olmalı"),
  category: z.enum(["ECONOMY", "SEDAN", "SUV", "EXECUTIVE", "VIP"], {
    required_error: "Kategori seçiniz",
  }),
});

type ModelFormValues = z.infer<typeof modelSchema>;

interface ModelFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model?: CarModel | null;
  defaultBrandId?: string;
}

export function ModelFormSheet({
  open,
  onOpenChange,
  model,
  defaultBrandId,
}: ModelFormSheetProps) {
  const { data: brands } = useBrands();
  const createModel = useCreateModel();
  const updateModel = useUpdateModel();
  const isEdit = !!model;
  const isSubmitting = createModel.isPending || updateModel.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: model
      ? { brandId: model.brandId, name: model.name, category: model.category }
      : { brandId: defaultBrandId ?? "", name: "", category: "SEDAN" },
  });

  useEffect(() => {
    if (model) {
      reset({
        brandId: model.brandId,
        name: model.name,
        category: model.category,
      });
    } else {
      reset({
        brandId: defaultBrandId ?? "",
        name: "",
        category: "SEDAN",
      });
    }
  }, [model, defaultBrandId, reset]);

  function onSubmit(values: ModelFormValues) {
    if (isEdit) {
      updateModel.mutate(
        { id: model!.id, data: values },
        {
          onSuccess: () => {
            toast.success("Model başarıyla güncellendi.");
            onOpenChange(false);
          },
          onError: () => toast.error("Model güncellenirken bir hata oluştu."),
        }
      );
    } else {
      createModel.mutate(values, {
        onSuccess: () => {
          toast.success("Model başarıyla oluşturuldu.");
          onOpenChange(false);
        },
        onError: () => toast.error("Model oluşturulurken bir hata oluştu."),
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? "Modeli Düzenle" : "Yeni Model Ekle"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? `${model!.name} bilgilerini düzenleyin.`
              : "Bir markaya yeni model ekleyin."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 pb-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Marka</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("brandId")}
            >
              <option value="">Marka seçiniz</option>
              {brands?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.brandId && (
              <p className="text-xs text-destructive">
                {errors.brandId.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Model Adı</Label>
            <Input placeholder="Örn: Corolla" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Kategori</Label>
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
            {errors.category && (
              <p className="text-xs text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="sticky bottom-0 flex justify-end border-t border-border/40 bg-background pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? "Güncelle" : "Oluştur"}
                </>
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
