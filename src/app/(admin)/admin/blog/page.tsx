"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, BookOpen, Calendar, Eye } from "lucide-react";
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
import { useBlogPosts } from "@/features/blog/hooks/useBlog";
import type { BlogCategory } from "@/features/blog/types/blog.types";

const categoryLabels: Record<BlogCategory, string> = {
  CITY_GUIDE: "Şehir Rehberi",
  RENTAL_TIPS: "İpuçları",
  AIRPORT_TRANSPORT: "Havalimanı",
  BUSINESS_TRAVEL: "İş Seyahati",
  SEGMENT_COMPARISON: "Karşılaştırma",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogPage() {
  const { data: posts, isLoading } = useBlogPosts();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!posts) return [];
    if (!search) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }, [posts, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Yönetimi</h1>
          <p className="text-sm text-muted-foreground">
            Blog yazılarını oluşturun, düzenleyin ve yayın durumlarını yönetin.
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Yazı
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Başlık veya içerik ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} yazı listeleniyor
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 py-16">
          <BookOpen className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search
              ? "Aramanıza uygun yazı bulunamadı."
              : "Henüz blog yazısı eklenmemiş."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[280px]">Başlık</TableHead>
                <TableHead className="min-w-[100px]">Kategori</TableHead>
                <TableHead className="min-w-[100px]">Tarih</TableHead>
                <TableHead className="min-w-[80px] text-center">Durum</TableHead>
                <TableHead className="min-w-[80px] text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <p className="text-sm font-medium line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[post.category] ?? post.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                      Yayında
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" disabled title="Önizle">
                        <Eye className="h-4 w-4" />
                      </Button>
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
