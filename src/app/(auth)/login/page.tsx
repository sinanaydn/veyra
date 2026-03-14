"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthError } from "@/components/auth/auth-error";
import { DemoCredentials } from "@/components/auth/demo-credentials";
import { PasswordInput } from "@/components/auth/password-input";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/auth.schemas";
import { useAuthStore } from "@/lib/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      const state = useAuthStore.getState();
      const isAdmin = state.user?.role === "ADMIN";
      router.replace(isAdmin ? ROUTES.ADMIN : ROUTES.ACCOUNT);
    } catch {
      // Error already set in store
    }
  };

  const handleDemoSelect = (email: string) => {
    clearError();
    setValue("email", email, { shouldValidate: true });
    setValue("password", "demo123", { shouldValidate: true });
  };

  return (
    <AuthCard
      title="Giriş Yap"
      subtitle="Hesabınıza giriş yaparak rezervasyonlarınızı yönetin."
      footer={
        <>
          Hesabınız yok mu?{" "}
          <Link
            href={ROUTES.REGISTER}
            className="font-medium text-primary hover:underline"
          >
            Kayıt Ol
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthError message={error} />

        <DemoCredentials onSelect={handleDemoSelect} />

        {/* E-posta */}
        <div className="space-y-1.5">
          <Label htmlFor="login-email">E-posta</Label>
          <Input
            id="login-email"
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

        {/* Şifre */}
        <div className="space-y-1.5">
          <Label htmlFor="login-password">Şifre</Label>
          <PasswordInput
            id="login-password"
            placeholder="••••••"
            autoComplete="current-password"
            {...register("password")}
            onChange={(e) => {
              register("password").onChange(e);
              if (error) clearError();
            }}
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Giriş yapılıyor...
            </>
          ) : (
            "Giriş Yap"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
