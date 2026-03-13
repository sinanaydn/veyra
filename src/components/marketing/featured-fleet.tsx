"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { CarCard } from "@/components/fleet/car-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedCars } from "@/features/cars/hooks/useCars";
import { ROUTES } from "@/lib/constants/routes";

export function FeaturedFleet() {
  const { data: cars, isLoading } = useFeaturedCars(4);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Öne Çıkan Araçlar"
          subtitle="Premium filomuzdan özenle seçilmiş, en çok tercih edilen araçlar."
        />

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-xl border p-4">
                <Skeleton className="aspect-[16/10] w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
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
            {cars?.map((car) => (
              <motion.div
                key={car.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 text-center">
          <Link href={ROUTES.FLEET}>
            <Button variant="outline" size="lg">
              Tüm Filoyu Gör
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
