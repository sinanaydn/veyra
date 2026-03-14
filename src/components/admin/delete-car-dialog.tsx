"use client";

import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCar } from "@/features/cars/hooks/useCarMutations";
import type { Car } from "@/features/cars/types/car.types";

interface DeleteCarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: Car | null;
}

export function DeleteCarDialog({
  open,
  onOpenChange,
  car,
}: DeleteCarDialogProps) {
  const deleteCar = useDeleteCar();

  function handleDelete() {
    if (!car) return;
    deleteCar.mutate(car.id, {
      onSuccess: () => {
        toast.success("Araç başarıyla silindi.");
        onOpenChange(false);
      },
      onError: () => {
        toast.error("Araç silinirken bir hata oluştu.");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aracı Sil</DialogTitle>
          <DialogDescription>
            <strong>
              {car?.brandName} {car?.modelName} ({car?.year})
            </strong>{" "}
            aracını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            İptal
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteCar.isPending}
          >
            {deleteCar.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Siliniyor...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Sil
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
