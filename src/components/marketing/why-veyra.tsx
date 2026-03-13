"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  HeadphonesIcon,
  CreditCard,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Tam Sigorta Güvencesi",
    description:
      "Tüm araçlarımız kasko ve zorunlu trafik sigortası ile korunur. Sürüş keyfinize odaklanın.",
  },
  {
    icon: Clock,
    title: "Hızlı Teslimat",
    description:
      "Havalimanı ve ofis lokasyonlarımızda ortalama 15 dakikada aracınızı teslim alın.",
  },
  {
    icon: Sparkles,
    title: "Bakımlı Araçlar",
    description:
      "Filomuz düzenli bakım ve detaylı temizlik süreçlerinden geçer. Her araç kusursuz teslim edilir.",
  },
  {
    icon: HeadphonesIcon,
    title: "7/24 Destek",
    description:
      "Yolculuk öncesinde ve sırasında her an yanınızdayız. Türkçe ve İngilizce destek hattı.",
  },
  {
    icon: CreditCard,
    title: "Şeffaf Fiyatlandırma",
    description:
      "Gizli ücret yok. Ödeme sayfasında gördüğünüz fiyat, ödeyeceğiniz fiyattır.",
  },
  {
    icon: MapPin,
    title: "Geniş Lokasyon Ağı",
    description:
      "Türkiye'nin 6 büyük şehrinde havalimanı ve şehir içi ofislerle hizmetinizdeyiz.",
  },
];

export function WhyVeyra() {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Neden Veyra?"
          subtitle="Güvenli, hızlı ve konforlu araç kiralama deneyimi için doğru adrestesiniz."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4 },
                },
              }}
              className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <reason.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
