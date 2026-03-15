"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/lib/constants/config";

const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Konu en az 3 karakter olmalı"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const offices = [
  {
    city: "İstanbul",
    address: "İstanbul Atatürk Havalimanı, Varış Katı",
    hours: "7/24",
  },
  {
    city: "Ankara",
    address: "Esenboğa Havalimanı, İç Hatlar Çıkışı",
    hours: "06:00 – 23:00",
  },
  {
    city: "Antalya",
    address: "Antalya Havalimanı, Dış Hatlar Terminal",
    hours: "7/24",
  },
  {
    city: "İzmir",
    address: "Adnan Menderes Havalimanı, İç Hatlar",
    hours: "06:00 – 23:00",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(_values: ContactFormValues) {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Mesajınız başarıyla gönderildi.");
    setSubmitted(true);
    reset();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Phone className="h-4 w-4" />
          İletişim
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Bize Ulaşın</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Rezervasyon, destek veya kurumsal talepleriniz için her zaman
          yanınızdayız.
        </p>
      </section>

      {/* Contact Info Cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
          <Phone className="mx-auto mb-3 h-5 w-5 text-primary" />
          <p className="text-xs text-muted-foreground">Telefon</p>
          <p className="mt-1 text-sm font-semibold">{APP_CONFIG.contact.phone}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">7/24 Destek</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
          <svg
            className="mx-auto mb-3 h-5 w-5 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <p className="text-xs text-muted-foreground">WhatsApp</p>
          <p className="mt-1 text-sm font-semibold">
            {APP_CONFIG.contact.whatsapp}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Hızlı Mesaj
          </p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
          <Mail className="mx-auto mb-3 h-5 w-5 text-primary" />
          <p className="text-xs text-muted-foreground">E-posta</p>
          <p className="mt-1 text-sm font-semibold">
            {APP_CONFIG.contact.email}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            24 saat içinde dönüş
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight">İletişim Formu</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mesajınızı gönderin, en kısa sürede geri dönüş yapalım.
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-success" />
                <p className="mt-3 text-base font-semibold">
                  Mesajınız Alındı
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Yeni Mesaj Gönder
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Ad Soyad</Label>
                    <Input placeholder="Adınız" {...register("name")} />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">E-posta</Label>
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Telefon (opsiyonel)</Label>
                    <Input
                      placeholder="+90 5XX XXX XX XX"
                      {...register("phone")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Konu</Label>
                    <Input placeholder="Konu başlığı" {...register("subject")} />
                    {errors.subject && (
                      <p className="text-xs text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Mesaj</Label>
                  <Textarea
                    rows={5}
                    placeholder="Mesajınızı yazınız..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Gönder
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Offices */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold tracking-tight">
            Ofislerimiz
          </h2>
          <div className="space-y-3">
            {offices.map((o) => (
              <div
                key={o.city}
                className="rounded-xl border border-border/50 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{o.city}</span>
                </div>
                <p className="text-xs text-muted-foreground">{o.address}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {o.hours}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border/50 bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground">
              Destek Bilgisi
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Çağrı merkezimiz 7/24 hizmet vermektedir. E-posta taleplerine en
              geç 24 saat içinde dönüş sağlanır. Acil durumlar için WhatsApp
              hattımızı tercih edebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
