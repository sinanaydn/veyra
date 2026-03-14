"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  paymentSchema,
  type PaymentFormValues,
} from "@/features/booking/schemas/booking.schemas";

interface PaymentFormProps {
  onSubmit: (values: PaymentFormValues) => void;
  id?: string;
}

export function PaymentForm({ onSubmit, id }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      acceptTerms: false,
    },
  });

  const acceptTerms = watch("acceptTerms");

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <CreditCard className="h-4 w-4 text-primary" />
        Ödeme Bilgileri
      </h3>

      <div className="rounded-xl border bg-card p-4 space-y-4">
        {/* Card holder */}
        <div className="space-y-1.5">
          <Label htmlFor="cardHolder">Kart Sahibi *</Label>
          <Input
            id="cardHolder"
            placeholder="AD SOYAD"
            className="uppercase"
            {...register("cardHolder")}
          />
          {errors.cardHolder && (
            <p className="text-xs text-destructive">
              {errors.cardHolder.message}
            </p>
          )}
        </div>

        {/* Card number */}
        <div className="space-y-1.5">
          <Label htmlFor="cardNumber">Kart Numarası *</Label>
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            {...register("cardNumber")}
          />
          {errors.cardNumber && (
            <p className="text-xs text-destructive">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="expiry">Son Kullanma *</Label>
            <Input
              id="expiry"
              placeholder="AA/YY"
              maxLength={5}
              {...register("expiry")}
            />
            {errors.expiry && (
              <p className="text-xs text-destructive">
                {errors.expiry.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              placeholder="123"
              maxLength={4}
              type="password"
              {...register("cvv")}
            />
            {errors.cvv && (
              <p className="text-xs text-destructive">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 pt-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) =>
              setValue("acceptTerms", checked === true, {
                shouldValidate: true,
              })
            }
          />
          <Label
            htmlFor="acceptTerms"
            className="text-xs leading-relaxed text-muted-foreground cursor-pointer"
          >
            Kiralama koşullarını ve gizlilik politikasını okudum, kabul
            ediyorum.
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-destructive">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>
    </form>
  );
}
