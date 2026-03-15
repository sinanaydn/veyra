"use client";

import {
  Shield,
  Clock,
  Plane,
  Award,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { APP_CONFIG } from "@/lib/constants/config";

const values = [
  {
    icon: Shield,
    title: "Güven",
    desc: "Tüm araçlarımız düzenli bakımdan geçer, kapsamlı sigorta ile teslim edilir.",
  },
  {
    icon: Clock,
    title: "Dakiklik",
    desc: "Havalimanı teslimlerinde dakik operasyon. Aracınız sizi bekler, siz aracınızı değil.",
  },
  {
    icon: Award,
    title: "Premium Kalite",
    desc: "Filomuzda yalnızca düzenli bakımı yapılmış, yeni nesil araçlar yer alır.",
  },
  {
    icon: Users,
    title: "Profesyonel Ekip",
    desc: "Eğitimli teslim ekibimiz, 7/24 destek hattımız ve operasyon merkezimiz her an yanınızda.",
  },
];

const stats = [
  { value: "14+", label: "Araçlık Filo" },
  { value: "6", label: "Havalimanı Ofisi" },
  { value: "8", label: "Premium Marka" },
  { value: "7/24", label: "Destek Hattı" },
];

const highlights = [
  "Havalimanı çıkışında dakik araç teslimatı",
  "Kurumsal müşterilere özel fiyatlandırma",
  "Muafiyetsiz tam sigorta seçenekleri",
  "Tek yön kiralama esnekliği",
  "Geniş segment yelpazesi: Ekonomiden VIP'e",
  "Şeffaf fiyatlandırma, gizli ücret yok",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Premium Araç Kiralama
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {APP_CONFIG.name} Hakkında
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Türkiye'nin önde gelen havalimanlarında premium araç kiralama deneyimi
          sunan {APP_CONFIG.name}, iş ve tatil seyahatlerinizi konforlu,
          güvenilir ve dakik hale getirir.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-20">
        <div className="rounded-2xl border border-border/50 bg-card p-8 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight">
            Yaklaşımımız
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {APP_CONFIG.name}, araç kiralamanın sadece bir ulaşım aracı olmadığına
            inanır. Her teslim bir güven vaadi, her sürüş bir deneyimdir.
            Filomuzda yer alan her araç düzenli teknik bakımdan geçer, temiz ve
            bakımlı olarak hazırlanır. Havalimanı operasyonlarımızda dakiklik,
            kurumsal hizmetlerimizde tutarlılık en temel ilkelerimizdir.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Ekonomi segmentinden VIP'e uzanan geniş yelpazemiz ile bireysel
            seyahatçilere, iş profesyonellerine ve ailelere uygun çözümler
            sunuyoruz. Şeffaf fiyatlandırma politikamız ve kapsamlı sigorta
            seçeneklerimiz ile kiralama süreciniz baştan sona güvence altındadır.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Temel Değerlerimiz
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
          Operasyonlarımızı şekillendiren dört temel ilke.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-border/50 p-6 transition-colors hover:bg-muted/30"
            >
              <v.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-base font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border/50 bg-card p-6 text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-primary">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-20">
        <div className="rounded-2xl border border-border/50 bg-card p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Plane className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Neden {APP_CONFIG.name}?
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Hizmet Ağımız</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Türkiye'nin en yoğun havalimanlarında ve şehir merkezlerinde hizmet
          noktalarımız bulunmaktadır.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            "İstanbul Atatürk Havalimanı",
            "İstanbul Sabiha Gökçen Havalimanı",
            "Ankara Esenboğa Havalimanı",
            "Antalya Havalimanı",
            "İzmir Adnan Menderes Havalimanı",
            "Bodrum Milas Havalimanı",
          ].map((loc) => (
            <div
              key={loc}
              className="flex items-center gap-2 rounded-lg border border-border/50 px-4 py-3"
            >
              <Plane className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm">{loc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
