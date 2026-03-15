"use client";

import { FileText, Globe, Image, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const contentSections = [
  {
    title: "Ana Sayfa",
    description: "Hero, öne çıkan filo, hizmet blokları",
    status: "Yayında",
    blocks: 8,
  },
  {
    title: "Hakkımızda",
    description: "Marka hikayesi, değerler, hizmet ağı",
    status: "Yayında",
    blocks: 5,
  },
  {
    title: "SSS",
    description: "Sıkça sorulan sorular ve kategorileri",
    status: "Yayında",
    blocks: 10,
  },
  {
    title: "İletişim",
    description: "İletişim bilgileri ve ofis adresleri",
    status: "Yayında",
    blocks: 4,
  },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">İçerik Yönetimi</h1>
        <p className="text-sm text-muted-foreground">
          Site genelindeki statik içerik bloklarını düzenleyin.
        </p>
      </div>

      {/* Content Sections */}
      <div className="grid gap-4 sm:grid-cols-2">
        {contentSections.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-border/50 p-5 transition-colors hover:bg-muted/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" disabled>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {s.status}
              </span>
              <span>{s.blocks} blok</span>
            </div>
          </div>
        ))}
      </div>

      {/* Media Placeholder */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Medya Kütüphanesi</h2>
        <div className="rounded-xl border border-dashed border-border/70 p-12 text-center">
          <Image className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            Medya yönetimi henüz aktif değil
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Görsel yükleme ve yönetim modülü ilerleyen sürümlerde eklenecektir.
          </p>
        </div>
      </div>
    </div>
  );
}
