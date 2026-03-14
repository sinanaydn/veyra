"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  alt: string;
}

export function CarGallery({ images, alt }: CarGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const allImages =
    images.length > 0 ? images : ["/images/car-placeholder.svg"];

  const goTo = (index: number) => {
    setActiveIndex(
      ((index % allImages.length) + allImages.length) % allImages.length
    );
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image
          src={allImages[activeIndex]}
          alt={`${alt} — görsel ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 640px"
        />

        {allImages.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-card group-hover:opacity-100"
              aria-label="Önceki görsel"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-card group-hover:opacity-100"
              aria-label="Sonraki görsel"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-md bg-card/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
            {activeIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`${alt} — küçük görsel ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
