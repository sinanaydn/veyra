"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  driverSchema,
  type DriverFormValues,
} from "@/features/booking/schemas/booking.schemas";

interface DriverFormProps {
  defaultValues?: DriverFormValues;
  onSubmit: (values: DriverFormValues) => void;
  id?: string;
}

export function DriverForm({ defaultValues, onSubmit, id }: DriverFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: defaultValues ?? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: "",
      notes: "",
    },
  });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <User className="h-4 w-4 text-primary" />
        Sürücü Bilgileri
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Ad */}
        <div className="space-y-1.5">
          <Label htmlFor="firstName">Ad *</Label>
          <Input
            id="firstName"
            placeholder="Adınız"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        {/* Soyad */}
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Soyad *</Label>
          <Input
            id="lastName"
            placeholder="Soyadınız"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        {/* E-posta */}
        <div className="space-y-1.5">
          <Label htmlFor="email">E-posta *</Label>
          <Input
            id="email"
            type="email"
            placeholder="ornek@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Telefon */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefon *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+90 555 123 4567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Uyruk */}
        <div className="space-y-1.5">
          <Label htmlFor="nationality">Uyruk *</Label>
          <Input
            id="nationality"
            placeholder="T.C."
            {...register("nationality")}
          />
          {errors.nationality && (
            <p className="text-xs text-destructive">
              {errors.nationality.message}
            </p>
          )}
        </div>
      </div>

      {/* Notlar */}
      <div className="space-y-1.5">
        <Label htmlFor="notes">Notlar (isteğe bağlı)</Label>
        <Textarea
          id="notes"
          rows={3}
          placeholder="Özel istekleriniz varsa belirtiniz…"
          {...register("notes")}
        />
      </div>
    </form>
  );
}
