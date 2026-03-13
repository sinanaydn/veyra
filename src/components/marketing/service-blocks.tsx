"use client";

import { motion } from "motion/react";
import { Plane, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

const services = [
  {
    icon: Plane,
    title: "Havalimanı Transfer Hizmeti",
    description:
      "İstanbul, Antalya, İzmir, Ankara, Bodrum ve Dalaman havalimanlarında aracınız sizi bekliyor. İniş saatinize göre hazırlanmış, hijyenik ve bakımlı araçlarla yolculuğunuza konforla başlayın.",
    features: [
      "Havalimanı kapısında teslim",
      "Uçuş takip sistemi",
      "Geç iniş garantisi",
      "Ücretsiz bekleme süresi",
    ],
    cta: "Havalimanı Araçlarını İncele",
    href: ROUTES.FLEET,
  },
  {
    icon: Briefcase,
    title: "Kurumsal & İş Seyahati",
    description:
      "Toplantılarınıza, fuarlarınıza ve iş gezilerinize yakışır executive ve VIP sınıfı araçlar. Kurumsal faturalama, esnek kiralama süreleri ve özel müşteri temsilcisi avantajlarıyla.",
    features: [
      "Executive & VIP araç seçenekleri",
      "Kurumsal faturalama",
      "Esnek iptal politikası",
      "Özel müşteri temsilcisi",
    ],
    cta: "Executive Araçları İncele",
    href: ROUTES.FLEET,
  },
];

export function ServiceBlocks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <service.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-3 font-heading text-xl font-bold">
                {service.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mb-6 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={service.href}>
                <Button variant="outline" size="sm">
                  {service.cta}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
