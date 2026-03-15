"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants/routes";
import { useBlogPosts } from "@/features/blog/hooks/useBlog";
import type { BlogCategory } from "@/features/blog/types/blog.types";

const categoryLabels: Record<BlogCategory, string> = {
  CITY_GUIDE: "Şehir Rehberi",
  RENTAL_TIPS: "Kiralama İpuçları",
  AIRPORT_TRANSPORT: "Havalimanı Ulaşım",
  BUSINESS_TRAVEL: "İş Seyahati",
  SEGMENT_COMPARISON: "Araç Karşılaştırma",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState<string>("");

  const categories = useMemo(() => {
    if (!posts) return [];
    return [...new Set(posts.map((p) => p.category))];
  }, [posts]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    if (!activeCategory) return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <BookOpen className="h-4 w-4" />
          Veyra Blog
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Seyahat & Araç Kiralama Rehberi
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Seyahat ipuçları, araç incelemeleri ve şehir rehberleri ile
          yolculuklarınızı planlayın.
        </p>
      </section>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory("")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {categoryLabels[cat as BlogCategory] ?? cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-2xl" />
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      ) : !featured ? (
        <div className="flex flex-col items-center py-16">
          <BookOpen className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Bu kategoride henüz yazı bulunmuyor.
          </p>
        </div>
      ) : (
        <>
          {/* Featured Article */}
          <Link
            href={ROUTES.BLOG_POST(featured.slug)}
            className="group mb-10 block rounded-2xl border border-border/50 bg-card p-6 transition-colors hover:bg-muted/30 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted sm:w-72 sm:shrink-0">
                <div className="flex h-full items-center justify-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground/30" />
                </div>
              </div>
              <div className="flex-1">
                <Badge
                  variant="outline"
                  className="mb-3 text-xs bg-primary/5 text-primary border-primary/20"
                >
                  {categoryLabels[featured.category] ?? featured.category}
                </Badge>
                <h2 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(featured.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Article Grid */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={ROUTES.BLOG_POST(post.slug)}
                  className="group rounded-xl border border-border/50 bg-card p-5 transition-colors hover:bg-muted/30"
                >
                  <Badge
                    variant="outline"
                    className="mb-3 text-xs bg-primary/5 text-primary border-primary/20"
                  >
                    {categoryLabels[post.category] ?? post.category}
                  </Badge>
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Oku
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
