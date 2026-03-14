"use client";

import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CarForm, type CarFormValues } from "./car-form";
import { useCreateCar } from "@/features/cars/hooks/useCarMutations";
import { useUpdateCar } from "@/features/cars/hooks/useCarMutations";
import type { Car } from "@/features/cars/types/car.types";

interface CarFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car?: Car | null;
}

export function CarFormSheet({ open, onOpenChange, car }: CarFormSheetProps) {
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const isEdit = !!car;

  const isSubmitting = createCar.isPending || updateCar.isPending;

  function handleSubmit(values: CarFormValues) {
    if (isEdit) {
      updateCar.mutate(
        { id: car!.id, data: values },
        {
          onSuccess: () => {
            toast.success("Araç başarıyla güncellendi.");
            onOpenChange(false);
          },
          onError: () => {
            toast.error("Araç güncellenirken bir hata oluştu.");
          },
        }
      );
    } else {
      const payload = {
        ...values,
        pickupLocations: [],
        returnLocations: [],
        imageUrls: [],
        features: [],
        insurancePackages: [],
        extras: [],
      };
      createCar.mutate(payload as Omit<Car, "id" | "slug">, {
        onSuccess: () => {
          toast.success("Araç başarıyla oluşturuldu.");
          onOpenChange(false);
        },
        onError: () => {
          toast.error("Araç oluşturulurken bir hata oluştu.");
        },
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-lg overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{isEdit ? "Aracı Düzenle" : "Yeni Araç Ekle"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? `${car!.brandName} ${car!.modelName} bilgilerini düzenleyin.`
              : "Filoya yeni araç eklemek için formu doldurun."}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <CarForm
            car={car}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
