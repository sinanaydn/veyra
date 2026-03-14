"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthError } from "@/components/auth/auth-error";
import { PasswordInput } from "@/components/auth/password-input";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/auth.schemas";
import { useAuthStore } from "@/lib/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      acceptTerms: false,
    },
  });

  const acceptTerms = watch("acceptTerms");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      });
      router.replace(ROUTES.ACCOUNT);
    } catch {
      // Error already set in store
    }
  };

  return (
    <AuthCard
      title="Kayıt Ol"
      subtitle="Hızlı rezervasyon için hemen üye olun."
      footer={
        <>
          Zaten hesabınız var mı?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-primary hover:underline"
          >
            Giriş Yap
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthError message={error} />

        {/* Ad / Soyad */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="reg-firstName">Ad</Label>
            <Input
              id="reg-firstName"
              placeholder="Adınız"
              autoComplete="given-name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-lastName">Soyad</Label>
            <Input
              id="reg-lastName"
              placeholder="Soyadınız"
              autoComplete="family-name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* E-posta */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-email">E-posta</Label>
          <Input
            id="reg-email"
            type="email"
            placeholder="ornek@email.com"
            autoComplete="email"
            {...register("email")}
            onChange={(e) => {
              register("email").onChange(e);
              if (error) clearError();
            }}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Telefon */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-phone">Telefon</Label>
          <Input
            id="reg-phone"
            type="tel"
            placeholder="+90 555 123 4567"
            autoComplete="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Şifre */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-password">Şifre</Label>
          <PasswordInput
            id="reg-password"
            placeholder="En az 6 karakter"
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Şifre Tekrar */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-passwordConfirm">Şifre Tekrar</Label>
          <PasswordInput
            id="reg-passwordConfirm"
            placeholder="Şifrenizi tekrar giriniz"
            autoComplete="new-password"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <p className="text-xs text-destructive">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        {/* Koşullar */}
        <div className="flex items-start gap-2.5">
          <Checkbox
            checked={acceptTerms}
            onCheckedChange={(checked) =>
              setValue("acceptTerms", checked === true, {
                shouldValidate: true,
              })
            }
          />
          <span className="text-xs leading-relaxed text-muted-foreground">
            Kiralama koşullarını, gizlilik politikasını ve KVKK
            aydınlatma metnini okudum, kabul ediyorum.
          </span>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-destructive">
            {errors.acceptTerms.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kayıt yapılıyor...
            </>
          ) : (
            "Kayıt Ol"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
