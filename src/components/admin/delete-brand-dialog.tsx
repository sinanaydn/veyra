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
import { useDeleteBrand } from "@/features/brands/hooks/useBrandMutations";
import type { Brand } from "@/features/brands/types/brand.types";

interface DeleteBrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: Brand | null;
  modelCount?: number;
  carCount?: number;
}

export function DeleteBrandDialog({
  open,
  onOpenChange,
  brand,
  modelCount = 0,
  carCount = 0,
}: DeleteBrandDialogProps) {
  const deleteBrand = useDeleteBrand();
  const hasRelations = modelCount > 0 || carCount > 0;

  function handleDelete() {
    if (!brand) return;
    deleteBrand.mutate(brand.id, {
      onSuccess: () => {
        toast.success("Marka başarıyla silindi.");
        onOpenChange(false);
      },
      onError: () => toast.error("Marka silinirken bir hata oluştu."),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Markayı Sil</DialogTitle>
          <DialogDescription>
            <strong>{brand?.name}</strong> markasını silmek istediğinize emin
            misiniz?
            {hasRelations && (
              <>
                {" "}
                Bu markaya bağlı{" "}
                <strong>
                  {modelCount} model
                  {carCount > 0 && ` ve ${carCount} araç`}
                </strong>{" "}
                bulunmaktadır. Silme işlemi ilişkili kayıtları etkileyebilir.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>İptal</DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteBrand.isPending}
          >
            {deleteBrand.isPending ? (
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
