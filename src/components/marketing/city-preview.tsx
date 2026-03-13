"use client";

import { motion } from "motion/react";
import { MapPin, Building2, Plane } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useCities, useLocations } from "@/features/locations/hooks/useLocations";

const cityImages: Record<string, { gradient: string }> = {
  İstanbul: { gradient: "from-blue-900/80 to-blue-700/60" },
  Ankara: { gradient: "from-amber-900/80 to-amber-700/60" },
  İzmir: { gradient: "from-cyan-900/80 to-cyan-700/60" },
  Antalya: { gradient: "from-emerald-900/80 to-emerald-700/60" },
  Bodrum: { gradient: "from-indigo-900/80 to-indigo-700/60" },
  Dalaman: { gradient: "from-teal-900/80 to-teal-700/60" },
};

export function CityPreview() {
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { data: locations, isLoading: locationsLoading } = useLocations();

  const isLoading = citiesLoading || locationsLoading;

  const cityData = cities?.map((city) => {
    const cityLocations = locations?.filter((loc) => loc.city === city) ?? [];
    const airportCount = cityLocations.filter(
      (loc) => loc.type === "AIRPORT"
    ).length;
    const officeCount = cityLocations.filter(
      (loc) => loc.type === "OFFICE"
    ).length;
    return {
      name: city,
      airportCount,
      officeCount,
      totalLocations: cityLocations.length,
      gradient: cityImages[city]?.gradient ?? "from-gray-900/80 to-gray-700/60",
    };
  });

  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Hizmet Verdiğimiz Şehirler"
          subtitle="Türkiye'nin en popüler destinasyonlarında havalimanı ve şehir içi lokasyonlarımızla hizmetinizdeyiz."
        />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cityData?.map((city) => (
              <motion.div
                key={city.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4 },
                  },
                }}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${city.gradient} p-6 text-white transition-transform hover:scale-[1.02]`}
              >
                <h3 className="mb-3 font-heading text-xl font-bold">
                  {city.name}
                </h3>

                <div className="space-y-1.5 text-sm text-white/80">
                  {city.airportCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Plane className="h-3.5 w-3.5" />
                      <span>
                        {city.airportCount} havalimanı lokasyonu
                      </span>
                    </div>
                  )}
                  {city.officeCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{city.officeCount} şehir içi ofis</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-white/60">
                  <MapPin className="h-3 w-3" />
                  <span>
                    Toplam {city.totalLocations} lokasyon
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
