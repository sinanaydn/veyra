"use client";

import { useState, useMemo } from "react";
import { Search, Star, MessageSquare, Eye } from "lucide-react";
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
import { useReviews } from "@/features/reviews/hooks/useReviews";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-warning text-warning"
              : "text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const { data: reviews, isLoading } = useReviews();
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const filtered = useMemo(() => {
    if (!reviews) return [];
    let result = [...reviews];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q) ||
          r.vehicle.toLowerCase().includes(q)
      );
    }
    if (filterRating) {
      result = result.filter((r) => r.rating === parseInt(filterRating));
    }
    return result;
  }, [reviews, search, filterRating]);

  const avgRating = reviews
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Yorum Yönetimi</h1>
        <p className="text-sm text-muted-foreground">
          Müşteri yorumlarını görüntüleyin ve yönetin.
        </p>
      </div>

      {/* Stats */}
      {!isLoading && reviews && (
        <div className="grid grid-cols-3 gap-4 sm:max-w-md">
          <div className="rounded-xl border border-border/50 p-4 text-center">
            <p className="text-2xl font-bold">{reviews.length}</p>
            <p className="text-xs text-muted-foreground">Toplam</p>
          </div>
          <div className="rounded-xl border border-border/50 p-4 text-center">
            <p className="text-2xl font-bold">{avgRating}</p>
            <p className="text-xs text-muted-foreground">Ortalama</p>
          </div>
          <div className="rounded-xl border border-border/50 p-4 text-center">
            <p className="text-2xl font-bold">
              {reviews.filter((r) => r.rating === 5).length}
            </p>
            <p className="text-xs text-muted-foreground">5 Yıldız</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Yorum, müşteri veya araç ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Tüm Puanlar</option>
          <option value="5">5 Yıldız</option>
          <option value="4">4 Yıldız</option>
          <option value="3">3 Yıldız</option>
        </select>
      </div>

      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} yorum listeleniyor
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 py-16">
          <MessageSquare className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search || filterRating
              ? "Filtrelere uygun yorum bulunamadı."
              : "Henüz yorum bulunmuyor."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Müşteri</TableHead>
                <TableHead className="min-w-[120px]">Araç</TableHead>
                <TableHead className="min-w-[250px]">Yorum</TableHead>
                <TableHead className="min-w-[90px]">Puan</TableHead>
                <TableHead className="min-w-[90px]">Tarih</TableHead>
                <TableHead className="min-w-[60px] text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.city}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{review.vehicle}</span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {review.comment}
                    </p>
                  </TableCell>
                  <TableCell>
                    <StarRating rating={review.rating} />
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" disabled title="Detay">
                      <Eye className="h-4 w-4" />
                    </Button>
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
