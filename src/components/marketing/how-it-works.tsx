"use client";

import { motion } from "motion/react";
import { Search, CalendarCheck, Car, ThumbsUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Araç Seçin",
    description:
      "Tarih, lokasyon ve araç tipine göre filomuzdan size en uygun aracı bulun.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Rezervasyon Yapın",
    description:
      "Birkaç adımda rezervasyonunuzu tamamlayın. Ekstra hizmet ve sigorta seçeneklerini ekleyin.",
  },
  {
    icon: Car,
    step: "03",
    title: "Aracı Teslim Alın",
    description:
      "Havalimanı veya ofis lokasyonumuzda aracınızı hızlıca teslim alın ve yola çıkın.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Keyfinize Bakın",
    description:
      "Bakımlı aracınızla güvenle yolculuğunuzun keyfini çıkarın. 7/24 destek yanınızda.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nasıl Çalışır?"
          subtitle="Dört basit adımda aracınızı kiralayın ve yola çıkın."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45 },
                },
              }}
              className="relative text-center"
            >
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-border lg:block" />
              )}

              <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>

              <h3 className="mb-2 font-heading text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
