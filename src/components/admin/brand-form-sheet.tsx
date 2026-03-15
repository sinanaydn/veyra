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
import {
  useCreateBrand,
  useUpdateBrand,
} from "@/features/brands/hooks/useBrandMutations";
import type { Brand } from "@/features/brands/types/brand.types";

const brandSchema = z.object({
  name: z.string().min(2, "Marka adı en az 2 karakter olmalı"),
  slug: z.string().min(2, "Slug en az 2 karakter olmalı"),
  logoUrl: z.string().optional(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

interface BrandFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: Brand | null;
}

export function BrandFormSheet({
  open,
  onOpenChange,
  brand,
}: BrandFormSheetProps) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const isEdit = !!brand;
  const isSubmitting = createBrand.isPending || updateBrand.isPending;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: brand
      ? { name: brand.name, slug: brand.slug, logoUrl: brand.logoUrl ?? "" }
      : { name: "", slug: "", logoUrl: "" },
  });

  // Reset form when brand changes
  useEffect(() => {
    if (brand) {
      reset({
        name: brand.name,
        slug: brand.slug,
        logoUrl: brand.logoUrl ?? "",
      });
    } else {
      reset({ name: "", slug: "", logoUrl: "" });
    }
  }, [brand, reset]);

  // Auto-generate slug from name (only for new brands)
  const nameValue = watch("name");
  useEffect(() => {
    if (!isEdit && nameValue) {
      const slug = nameValue
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setValue("slug", slug);
    }
  }, [nameValue, isEdit, setValue]);

  function onSubmit(values: BrandFormValues) {
    if (isEdit) {
      updateBrand.mutate(
        { id: brand!.id, data: values },
        {
          onSuccess: () => {
            toast.success("Marka başarıyla güncellendi.");
            onOpenChange(false);
          },
          onError: () => toast.error("Marka güncellenirken bir hata oluştu."),
        }
      );
    } else {
      createBrand.mutate(values, {
        onSuccess: () => {
          toast.success("Marka başarıyla oluşturuldu.");
          onOpenChange(false);
        },
        onError: () => toast.error("Marka oluşturulurken bir hata oluştu."),
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? "Markayı Düzenle" : "Yeni Marka Ekle"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? `${brand!.name} bilgilerini düzenleyin.`
              : "Sisteme yeni bir marka ekleyin."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 pb-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Marka Adı</Label>
            <Input placeholder="Örn: Toyota" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Slug</Label>
            <Input
              placeholder="Örn: toyota"
              {...register("slug")}
              className="font-mono text-sm"
            />
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Logo URL (opsiyonel)</Label>
            <Input
              placeholder="https://..."
              {...register("logoUrl")}
            />
          </div>
          <div className="sticky bottom-0 flex justify-end border-t border-border/50 bg-background pt-4">
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
