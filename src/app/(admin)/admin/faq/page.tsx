"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFAQ } from "@/features/faq/hooks/useFAQ";
import type { FAQCategory } from "@/features/faq/types/faq.types";

const categoryLabels: Record<FAQCategory, string> = {
  BOOKING: "Rezervasyon",
  PAYMENT: "Ödeme",
  DEPOSIT: "Depozito",
  INSURANCE: "Sigorta",
  AIRPORT: "Havalimanı",
  CANCELLATION: "İptal",
  MILEAGE: "Kilometre",
  DOCUMENTS: "Belgeler",
};

export default function AdminFaqPage() {
  const { data: items, isLoading } = useFAQ();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const filtered = useMemo(() => {
    if (!items) return [];
    let result = [...items];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.question.toLowerCase().includes(q));
    }
    if (filterCat) {
      result = result.filter((i) => i.category === filterCat);
    }
    return result;
  }, [items, search, filterCat]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SSS Yönetimi</h1>
          <p className="text-sm text-muted-foreground">
            Sıkça sorulan soruları ve kategorilerini yönetin.
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Soru
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Soru ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Tüm Kategoriler</option>
          {Object.entries(categoryLabels).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} soru listeleniyor
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 py-16">
          <HelpCircle className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search || filterCat
              ? "Filtrelere uygun soru bulunamadı."
              : "Henüz soru eklenmemiş."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[50px]">#</TableHead>
                <TableHead className="min-w-[300px]">Soru</TableHead>
                <TableHead className="min-w-[100px]">Kategori</TableHead>
                <TableHead className="min-w-[80px] text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-xs text-muted-foreground tabular-nums">
                    {item.order}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium line-clamp-1">
                      {item.question}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.answer}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[item.category] ?? item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" disabled title="Düzenle">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled
                        title="Sil"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
