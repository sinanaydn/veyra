import { mockFAQItems } from "@/lib/mocks/faq";
import type { FAQItem, FAQCategory } from "../types/faq.types";

const delay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
