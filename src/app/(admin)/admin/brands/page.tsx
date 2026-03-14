"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, Tag, Layers, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BrandFormSheet } from "@/components/admin/brand-form-sheet";
import { DeleteBrandDialog } from "@/components/admin/delete-brand-dialog";
import { useBrandsWithStats } from "@/features/brands/hooks/useBrands";
import type { Brand } from "@/features/brands/types/brand.types";
import type { BrandWithStats } from "@/features/brands/services/brands.service";

export default function AdminBrandsPage() {
  const { data: brands, isLoading } = useBrandsWithStats();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState<BrandWithStats | null>(null);

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!brands) return [];
    if (!search) return brands;
    const q = search.toLowerCase();
    return brands.filter(
      (b) => b.name.toLowerCase().includes(q) || b.slug.includes(q)
    );
  }, [brands, search]);

  function handleCreate() {
    setEditBrand(null);
    setSheetOpen(true);
  }

  function handleEdit(brand: Brand) {
    setEditBrand(brand);
    setSheetOpen(true);
  }

  function handleDeleteClick(brand: BrandWithStats) {
    setDeleteBrand(brand);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marka Yönetimi</h1>
          <p className="text-sm text-muted-foreground">
            Filodaki araç markalarını yönetin. Her marka altında modeller tanımlanır.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Marka
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Marka ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} marka listeleniyor
          {search && (
            <button
              onClick={() => setSearch("")}
              className="ml-2 text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Temizle
            </button>
          )}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16">
          <Tag className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search
              ? "Aramanıza uygun marka bulunamadı."
              : "Henüz marka eklenmemiş."}
          </p>
          {!search && (
            <Button variant="outline" className="mt-4" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              İlk Markayı Ekle
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Marka</TableHead>
                <TableHead className="min-w-[120px]">Slug</TableHead>
                <TableHead className="min-w-[100px] text-center">
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    Modeller
                  </span>
                </TableHead>
                <TableHead className="min-w-[100px] text-center">
                  <span className="inline-flex items-center gap-1">
                    <Car className="h-3.5 w-3.5" />
                    Araçlar
                  </span>
                </TableHead>
                <TableHead className="min-w-[100px] text-right">
                  İşlemler
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <span className="text-sm font-medium">{brand.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {brand.slug}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums">
                    {brand.modelCount}
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums">
                    {brand.carCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleEdit(brand)}
                        title="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteClick(brand)}
                        title="Sil"
                        className="text-destructive hover:text-destructive"
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

      <BrandFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        brand={editBrand}
      />

      <DeleteBrandDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        brand={deleteBrand}
        modelCount={deleteBrand?.modelCount}
        carCount={deleteBrand?.carCount}
      />
    </div>
  );
}
