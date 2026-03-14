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
import { useDeleteModel } from "@/features/models/hooks/useModelMutations";
import type { CarModel } from "@/features/models/types/model.types";

interface DeleteModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model: CarModel | null;
  brandName?: string;
  carCount?: number;
}

export function DeleteModelDialog({
  open,
  onOpenChange,
  model,
  brandName,
  carCount = 0,
}: DeleteModelDialogProps) {
  const deleteModel = useDeleteModel();

  function handleDelete() {
    if (!model) return;
    deleteModel.mutate(model.id, {
      onSuccess: () => {
        toast.success("Model başarıyla silindi.");
        onOpenChange(false);
      },
      onError: () => toast.error("Model silinirken bir hata oluştu."),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modeli Sil</DialogTitle>
          <DialogDescription>
            <strong>
              {brandName ? `${brandName} ` : ""}
              {model?.name}
            </strong>{" "}
            modelini silmek istediğinize emin misiniz?
            {carCount > 0 && (
              <>
                {" "}
                Bu modele bağlı <strong>{carCount} araç</strong> bulunmaktadır.
                Silme işlemi ilişkili araçları etkileyebilir.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>İptal</DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteModel.isPending}
          >
            {deleteModel.isPending ? (
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
