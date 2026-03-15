"use client";

import { useState, useMemo } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useFAQ } from "@/features/faq/hooks/useFAQ";
import type { FAQCategory } from "@/features/faq/types/faq.types";

const categoryLabels: Record<FAQCategory, string> = {
  BOOKING: "Rezervasyon",
  PAYMENT: "Ödeme",
  DEPOSIT: "Depozito",
  INSURANCE: "Sigorta",
  AIRPORT: "Havalimanı Teslim",
  CANCELLATION: "İptal & Değişiklik",
  MILEAGE: "Kilometre",
  DOCUMENTS: "Belgeler",
};

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-primary"
      >
        <span className="text-sm font-medium">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const { data: items, isLoading } = useFAQ();
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");

  const categories = useMemo(() => {
    if (!items) return [];
    const cats = [...new Set(items.map((i) => i.category))];
    return cats;
  }, [items]);

  const filtered = useMemo(() => {
    if (!items) return [];
    let result = [...items];
    if (activeCategory) {
      result = result.filter((i) => i.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.question.toLowerCase().includes(q) ||
          i.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, activeCategory, search]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const item of filtered) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <HelpCircle className="h-4 w-4" />
          Yardım Merkezi
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Sıkça Sorulan Sorular
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Araç kiralama süreciyle ilgili merak ettiğiniz soruların yanıtları.
        </p>
      </section>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Soru veya anahtar kelime ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {categoryLabels[cat as FAQCategory] ?? cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <HelpCircle className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Aramanıza uygun soru bulunamadı.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByCategory).map(([cat, catItems]) => (
            <section key={cat}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryLabels[cat as FAQCategory] ?? cat}
              </h2>
              <div className="rounded-xl border border-border/50 bg-card px-5">
                {catItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === item.id}
                    onToggle={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Contact CTA */}
      <section className="mt-16 rounded-xl border border-border/50 bg-card p-8 text-center">
        <h3 className="text-lg font-semibold">Sorunuza cevap bulamadınız mı?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Müşteri hizmetlerimize ulaşarak detaylı bilgi alabilirsiniz.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <span>Telefon: {" "}
            <strong className="text-foreground">+90 850 123 4567</strong>
          </span>
          <span>WhatsApp: {" "}
            <strong className="text-foreground">+90 532 123 4567</strong>
          </span>
        </div>
      </section>
    </div>
  );
}
