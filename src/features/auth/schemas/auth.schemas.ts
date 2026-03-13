import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta adresi gereklidir")
    .email("Geçerli bir e-posta adresi giriniz"),
  password: z
    .string()
    .min(1, "Şifre gereklidir")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Ad gereklidir")
      .min(2, "Ad en az 2 karakter olmalıdır"),
    lastName: z
      .string()
      .min(1, "Soyad gereklidir")
      .min(2, "Soyad en az 2 karakter olmalıdır"),
    email: z
      .string()
      .min(1, "E-posta adresi gereklidir")
      .email("Geçerli bir e-posta adresi giriniz"),
    phone: z
      .string()
      .min(1, "Telefon numarası gereklidir")
      .regex(
        /^\+?[0-9\s\-()]{10,15}$/,
        "Geçerli bir telefon numarası giriniz"
      ),
    password: z
      .string()
      .min(1, "Şifre gereklidir")
      .min(6, "Şifre en az 6 karakter olmalıdır"),
    passwordConfirm: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
