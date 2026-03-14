import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

export function DetailNotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <SearchX className="h-7 w-7 text-muted-foreground" />
      </div>

      <h1 className="font-heading text-2xl font-bold">Araç Bulunamadı</h1>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Aradığınız araç mevcut değil veya artık filomuzda bulunmuyor.
        Diğer araçlarımızı inceleyerek size uygun bir seçenek bulabilirsiniz.
      </p>

      <div className="mt-6 flex gap-3">
        <Link href={ROUTES.FLEET}>
          <Button>Filoyu İncele</Button>
        </Link>
        <Link href={ROUTES.HOME}>
          <Button variant="outline">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </section>
  );
}
