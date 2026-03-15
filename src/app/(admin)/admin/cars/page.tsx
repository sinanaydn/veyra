"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Car as CarIcon,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSection } from "@/components/admin/admin-section";
import { CarFormSheet } from "@/components/admin/car-form-sheet";
import { DeleteCarDialog } from "@/components/admin/delete-car-dialog";
import { useCars } from "@/features/cars/hooks/useCars";
import { formatCurrency } from "@/lib/utils/format";
import type { Car, AvailabilityStatus } from "@/features/cars/types/car.types";

const availabilityMap: Record<
  AvailabilityStatus,
  { variant: "confirmed" | "pending" | "cancelled"; label: string }
> = {
  AVAILABLE: { variant: "confirmed", label: "Müsait" },
  RESERVED: { variant: "pending", label: "Rezerveli" },
  MAINTENANCE: { variant: "cancelled", label: "Bakımda" },
};

const categoryLabels: Record<string, string> = {
  ECONOMY: "Ekonomi",
  SEDAN: "Sedan",
  SUV: "SUV",
  EXECUTIVE: "Executive",
  VIP: "VIP",
};

const transmissionLabels: Record<string, string> = {
  AUTOMATIC: "Otomatik",
  MANUAL: "Manuel",
};

const fuelLabels: Record<string, string> = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  HYBRID: "Hibrit",
  ELECTRIC: "Elektrik",
};

export default function AdminCarsPage() {
  const { data: cars, isLoading } = useCars();

  // Sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editCar, setEditCar] = useState<Car | null>(null);

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCar, setDeleteCar] = useState<Car | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const filtered = useMemo(() => {
    if (!cars) return [];
    let result = [...cars];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.brandName.toLowerCase().includes(q) ||
          c.modelName.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q)
      );
    }

    if (filterStatus) {
      result = result.filter((c) => c.availability === filterStatus);
    }

    if (filterCategory) {
      result = result.filter((c) => c.category === filterCategory);
    }

    return result;
  }, [cars, search, filterStatus, filterCategory]);

  function handleCreate() {
    setEditCar(null);
    setSheetOpen(true);
  }

  function handleEdit(car: Car) {
    setEditCar(car);
    setSheetOpen(true);
  }

  function handleDeleteClick(car: Car) {
    setDeleteCar(car);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Araç Yönetimi</h1>
          <p className="text-sm text-muted-foreground">
            Filodaki araçları görüntüleyin, ekleyin ve düzenleyin.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Araç
        </Button>
      </div>

      {/* Filters */}
      <AdminSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Marka, model veya şehir ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Tüm Durumlar</option>
              <option value="AVAILABLE">Müsait</option>
              <option value="RESERVED">Rezerveli</option>
              <option value="MAINTENANCE">Bakımda</option>
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
      </AdminSection>

      {/* Results count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} araç listeleniyor
          {(search || filterStatus || filterCategory) && (
            <button
              onClick={() => {
                setSearch("");
                setFilterStatus("");
                setFilterCategory("");
              }}
              className="ml-2 text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Filtreleri temizle
            </button>
          )}
        </p>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 py-16">
          <CarIcon className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search || filterStatus || filterCategory
              ? "Filtrelere uygun araç bulunamadı."
              : "Henüz araç eklenmemiş."}
          </p>
          {!search && !filterStatus && !filterCategory && (
            <Button variant="outline" className="mt-4" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              İlk Aracı Ekle
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Araç</TableHead>
                <TableHead className="min-w-[80px]">Kategori</TableHead>
                <TableHead className="min-w-[80px]">Şehir</TableHead>
                <TableHead className="min-w-[80px]">Vites</TableHead>
                <TableHead className="min-w-[80px]">Yakıt</TableHead>
                <TableHead className="min-w-[100px] text-right">
                  Fiyat/Gün
                </TableHead>
                <TableHead className="min-w-[90px]">Durum</TableHead>
                <TableHead className="min-w-[100px] text-right">
                  İşlemler
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((car) => {
                const { variant, label } = availabilityMap[car.availability];
                return (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {car.brandName} {car.modelName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {car.year} &middot; {car.seats} koltuk
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {categoryLabels[car.category] ?? car.category}
                    </TableCell>
                    <TableCell className="text-sm">{car.city}</TableCell>
                    <TableCell className="text-sm">
                      {transmissionLabels[car.transmission]}
                    </TableCell>
                    <TableCell className="text-sm">
                      {fuelLabels[car.fuelType]}
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium tabular-nums">
                      {formatCurrency(car.pricePerDay)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={variant} label={label} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleEdit(car)}
                          title="Düzenle"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteClick(car)}
                          title="Sil"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Sheet for create/edit */}
      <CarFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        car={editCar}
      />

      {/* Delete confirmation dialog */}
      <DeleteCarDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        car={deleteCar}
      />
    </div>
  );
}
