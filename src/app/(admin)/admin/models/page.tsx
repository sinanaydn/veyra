"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Layers,
  Car,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModelFormSheet } from "@/components/admin/model-form-sheet";
import { DeleteModelDialog } from "@/components/admin/delete-model-dialog";
import { useModelsWithStats } from "@/features/models/hooks/useModels";
import { useBrands } from "@/features/brands/hooks/useBrands";
import type { CarModel } from "@/features/models/types/model.types";
import type { CarModelWithStats } from "@/features/models/services/models.service";

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomi",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

const categoryColors: Record<string, string> = {
  ECONOMY: "bg-muted text-muted-foreground",
  SEDAN: "bg-primary/10 text-primary border-primary/20",
  SUV: "bg-success/10 text-success border-success/20",
  EXECUTIVE: "bg-warning/10 text-warning border-warning/20",
  VIP: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AdminModelsPage() {
  const { data: models, isLoading } = useModelsWithStats();
  const { data: brands } = useBrands();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editModel, setEditModel] = useState<CarModel | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState<CarModelWithStats | null>(
    null
  );

  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filtered = useMemo(() => {
    if (!models) return [];
    let result = [...models];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.brandName.toLowerCase().includes(q)
      );
    }

    if (filterBrand) {
      result = result.filter((m) => m.brandId === filterBrand);
    }

    if (filterCategory) {
      result = result.filter((m) => m.category === filterCategory);
    }

    return result;
  }, [models, search, filterBrand, filterCategory]);

  function handleCreate() {
    setEditModel(null);
    setSheetOpen(true);
  }

  function handleEdit(model: CarModel) {
    setEditModel(model);
    setSheetOpen(true);
  }

  function handleDeleteClick(model: CarModelWithStats) {
    setDeleteModel(model);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Model Yönetimi</h1>
          <p className="text-sm text-muted-foreground">
            Araç modellerini ve kategori tanımlarını yönetin.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Model
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Model veya marka ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Tüm Markalar</option>
            {brands?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Tüm Kategoriler</option>
            {Object.entries(categoryLabels).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} model listeleniyor
          {(search || filterBrand || filterCategory) && (
            <button
              onClick={() => {
                setSearch("");
                setFilterBrand("");
                setFilterCategory("");
              }}
              className="ml-2 text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Filtreleri temizle
            </button>
          )}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16">
          <Layers className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search || filterBrand || filterCategory
              ? "Filtrelere uygun model bulunamadı."
              : "Henüz model eklenmemiş."}
          </p>
          {!search && !filterBrand && !filterCategory && (
            <Button variant="outline" className="mt-4" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              İlk Modeli Ekle
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px]">Model</TableHead>
                <TableHead className="min-w-[120px]">Marka</TableHead>
                <TableHead className="min-w-[100px]">Kategori</TableHead>
                <TableHead className="min-w-[80px] text-center">
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
              {filtered.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>
                    <span className="text-sm font-medium">{model.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {model.brandName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${categoryColors[model.category] ?? ""}`}
                    >
                      {categoryLabels[model.category] ?? model.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums">
                    {model.carCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleEdit(model)}
                        title="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteClick(model)}
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

      <ModelFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        model={editModel}
      />

      <DeleteModelDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        model={deleteModel}
        brandName={deleteModel?.brandName}
        carCount={deleteModel?.carCount}
      />
    </div>
  );
}
