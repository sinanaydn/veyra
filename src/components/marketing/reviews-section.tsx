"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentReviews } from "@/features/reviews/hooks/useReviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const { data: reviews, isLoading } = useRecentReviews(4);

  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Müşterilerimiz Ne Diyor?"
          subtitle="Binlerce memnun müşterimizin deneyimlerinden öne çıkanlar."
        />

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-xl border p-5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {reviews?.map((review) => (
              <motion.div
                key={review.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
                className="relative rounded-xl border bg-card p-5"
              >
                <Quote className="absolute right-4 top-4 h-6 w-6 text-primary/10" />

                <StarRating rating={review.rating} />

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                  {review.comment}
                </p>

                <div className="mt-4 border-t pt-3">
                  <p className="text-sm font-medium">{review.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.carName}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
