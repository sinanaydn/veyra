"use client";

import { motion } from "motion/react";
import { BookingWidget } from "@/components/booking/booking-widget";
import { TrustStrip } from "./trust-strip";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Dakik, premium ve hızlı{" "}
            <span className="text-primary">araç kiralama.</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg lg:text-xl">
            Havalimanı, iş seyahati ve günlük kullanım için güvenilir
            rezervasyon. Net koşullar, rafine filo, hızlı onay.
          </p>
        </motion.div>

        {/* Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-5xl"
        >
          <BookingWidget variant="hero" />
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-10"
        >
          <TrustStrip />
        </motion.div>
      </div>
    </section>
  );
}
