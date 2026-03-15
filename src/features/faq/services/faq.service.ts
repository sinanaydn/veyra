import { mockFAQItems } from "@/lib/mocks/faq";
import { delay } from "@/lib/utils";
import type { FAQItem, FAQCategory } from "../types/faq.types";

export const faqService = {
  async getAll(): Promise<FAQItem[]> {
    await delay();
    return [...mockFAQItems].sort((a, b) => a.order - b.order);
  },

  async getByCategory(category: FAQCategory): Promise<FAQItem[]> {
    await delay();
    return mockFAQItems
      .filter((f) => f.category === category)
      .sort((a, b) => a.order - b.order);
  },
};
