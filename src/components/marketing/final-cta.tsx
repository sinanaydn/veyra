"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { APP_CONFIG } from "@/lib/constants/config";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12"
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/5" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

          <h2 className="relative font-heading text-3xl font-bold sm:text-4xl">
            Yolculuğunuz Burada Başlıyor
          </h2>

          <p className="relative mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
            Premium araç filomuz, şeffaf fiyatlandırmamız ve 7/24 desteğimizle
            unutulmaz bir sürüş deneyimi sizi bekliyor.
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={ROUTES.FLEET}>
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px]"
              >
                Araçları İncele
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>

            <a href={`tel:${APP_CONFIG.contact.phone.replace(/\s/g, "")}`}>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Phone className="mr-1.5 h-4 w-4" />
                {APP_CONFIG.contact.phone}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
