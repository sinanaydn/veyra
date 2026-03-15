"use client";

import { use } from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/lib/constants/routes";
import { useBlogPost, useRecentBlogPosts } from "@/features/blog/hooks/useBlog";
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

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: post, isLoading } = useBlogPost(slug);
  const { data: recentPosts } = useRecentBlogPosts(4);

  const relatedPosts = recentPosts?.filter((p) => p.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mb-4 h-6 w-32 rounded-full" />
        <Skeleton className="mb-3 h-10 w-3/4" />
        <Skeleton className="mb-8 h-5 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30" />
        <h1 className="mt-4 text-2xl font-bold">Yazı Bulunamadı</h1>
        <p className="mt-2 text-muted-foreground">
          Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
        </p>
        <Link href={ROUTES.BLOG}>
          <Button variant="outline" className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Blog'a Dön
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link
        href={ROUTES.BLOG}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <Badge
          variant="outline"
          className="mb-4 text-xs bg-primary/5 text-primary border-primary/20"
        >
          {categoryLabels[post.category] ?? post.category}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </header>

      {/* Cover placeholder */}
      <div className="mb-10 aspect-[2/1] overflow-hidden rounded-2xl bg-muted">
        <div className="flex h-full items-center justify-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/20" />
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        {post.content.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="mt-8 mb-3 text-xl font-bold tracking-tight"
              >
                {paragraph.replace("## ", "")}
              </h2>
            );
          }
          if (paragraph.startsWith("- ")) {
            const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} className="my-3 space-y-1.5">
                {items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item.replace("- ", "")}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p
              key={i}
              className="my-4 text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-10">
          <h2 className="mb-6 text-xl font-bold tracking-tight">
            Diğer Yazılar
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.id}
                href={ROUTES.BLOG_POST(rp.slug)}
                className="group rounded-xl border border-border/50 p-4 transition-colors hover:bg-muted/30"
              >
                <Badge variant="outline" className="mb-2 text-xs">
                  {categoryLabels[rp.category] ?? rp.category}
                </Badge>
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {rp.title}
                </h3>
                <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(rp.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
