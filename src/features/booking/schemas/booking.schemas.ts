import { z } from "zod";

export const driverSchema = z.object({
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
  nationality: z
    .string()
    .min(1, "Uyruk gereklidir"),
  notes: z.string().optional(),
});

export const paymentSchema = z.object({
  cardHolder: z
    .string()
    .min(1, "Kart sahibi adı gereklidir"),
  cardNumber: z
    .string()
    .min(1, "Kart numarası gereklidir")
    .regex(/^[0-9\s]{16,19}$/, "Geçerli bir kart numarası giriniz"),
  expiry: z
    .string()
    .min(1, "Son kullanma tarihi gereklidir")
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "AA/YY formatında giriniz"),
  cvv: z
    .string()
    .min(1, "CVV gereklidir")
    .regex(/^[0-9]{3,4}$/, "Geçerli bir CVV giriniz"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Koşulları kabul etmelisiniz"),
});

export type DriverFormValues = z.infer<typeof driverSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
