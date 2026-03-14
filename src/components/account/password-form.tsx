"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mevcut şifre gereklidir"),
    newPassword: z.string().min(6, "En az 6 karakter"),
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

type PasswordValues = z.infer<typeof passwordSchema>;

export function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (_values: PasswordValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Şifreniz başarıyla güncellendi.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="pw-current">Mevcut Şifre</Label>
        <Input id="pw-current" type="password" {...register("currentPassword")} />
        {errors.currentPassword && (
          <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="pw-new">Yeni Şifre</Label>
          <Input id="pw-new" type="password" {...register("newPassword")} />
          {errors.newPassword && (
            <p className="text-xs text-destructive">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pw-confirm">Yeni Şifre (Tekrar)</Label>
          <Input id="pw-confirm" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="outline" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Güncelleniyor...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Şifreyi Güncelle
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
