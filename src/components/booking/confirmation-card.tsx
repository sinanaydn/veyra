"use client";

import { useMemo } from "react";
import { CheckCircle2, Phone, Mail, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/lib/constants/config";
import { useBookingStore, computePriceBreakdown } from "@/lib/store/booking.store";
import { toast } from "sonner";

export function ConfirmationCard() {
  const car = useBookingStore((s) => s.car);
  const bookingResult = useBookingStore((s) => s.bookingResult);
  const pickupLocation = useBookingStore((s) => s.pickupLocation);
  const returnLocation = useBookingStore((s) => s.returnLocation);
  const dates = useBookingStore((s) => s.dates);
  const rentalDays = useBookingStore((s) => s.rentalDays);
  const driverInfo = useBookingStore((s) => s.driverInfo);
  const selectedInsurance = useBookingStore((s) => s.selectedInsurance);
  const selectedExtras = useBookingStore((s) => s.selectedExtras);

  const total = useMemo(() => {
    if (!car) return 0;
    const lines = computePriceBreakdown(car, rentalDays, selectedInsurance, selectedExtras);
    return lines.find((l) => l.type === "total")?.amount ?? 0;
  }, [car, rentalDays, selectedInsurance, selectedExtras]);

  if (!bookingResult || !car || !dates) return null;

  const fullName = `${car.brandName} ${car.modelName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingResult.reservationCode);
    toast.success("Rezervasyon kodu kopyalandı");
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Success header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="font-heading text-2xl font-bold">
          Rezervasyonunuz Onaylandı!
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Detaylar e-posta adresinize gönderildi.
        </p>
      </div>

      {/* Reservation code */}
      <div className="flex items-center justify-center gap-3 rounded-xl border bg-card p-4">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Rezervasyon Kodu
          </p>
          <p className="mt-1 font-mono text-xl font-bold tracking-widest text-primary">
            {bookingResult.reservationCode}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          title="Kopyala"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>

      {/* Summary card */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold">Rezervasyon Özeti</h3>

        <div className="space-y-2.5 text-sm">
          <Row label="Araç" value={`${fullName} (${car.year})`} />
          <Row label="Kiralama Süresi" value={`${rentalDays} gün`} />
          <Row label="Alış" value={`${pickupLocation?.label} — ${dates.pickupDate} ${dates.pickupTime}`} />
          <Row label="İade" value={`${returnLocation?.label} — ${dates.returnDate} ${dates.returnTime}`} />
          <Row label="Sürücü" value={`${driverInfo?.firstName} ${driverInfo?.lastName}`} />
          <Row label="E-posta" value={driverInfo?.email ?? ""} />

          <Separator />

          <div className="flex items-center justify-between font-semibold">
            <span>Toplam Tutar</span>
            <span className="text-primary">
              {total.toLocaleString("tr-TR")}₺
            </span>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="rounded-xl border bg-muted/50 p-5 space-y-3">
        <h3 className="text-sm font-semibold">Sonraki Adımlar</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <Badge
              variant="outline"
              className="h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-[10px]"
            >
              1
            </Badge>
            Onay e-postanızı kontrol edin ve detayları inceleyin.
          </li>
          <li className="flex gap-2">
            <Badge
              variant="outline"
              className="h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-[10px]"
            >
              2
            </Badge>
            Teslim günü ehliyet ve kimlik belgelerinizi yanınızda bulundurun.
          </li>
          <li className="flex gap-2">
            <Badge
              variant="outline"
              className="h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-[10px]"
            >
              3
            </Badge>
            Sorularınız için bize ulaşabilirsiniz.
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${APP_CONFIG.contact.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Phone className="h-4 w-4 text-primary" />
          {APP_CONFIG.contact.phone}
        </a>
        <a
          href={`mailto:${APP_CONFIG.contact.email}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Mail className="h-4 w-4 text-primary" />
          {APP_CONFIG.contact.email}
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
