import { useQuery } from "@tanstack/react-query";
import { faqService } from "../services/faq.service";
import type { FAQCategory } from "../types/faq.types";

export const faqKeys = {
  all: ["faq"] as const,
  byCategory: (category: FAQCategory) =>
    ["faq", "category", category] as const,
};

export function useFAQ() {
  return useQuery({
    queryKey: faqKeys.all,
    queryFn: () => faqService.getAll(),
  });
}

export function useFAQByCategory(category: FAQCategory) {
  return useQuery({
    queryKey: faqKeys.byCategory(category),
    queryFn: () => faqService.getByCategory(category),
  });
}
