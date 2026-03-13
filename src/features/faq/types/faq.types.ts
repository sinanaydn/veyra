export type FAQCategory =
  | "BOOKING"
  | "PAYMENT"
  | "DEPOSIT"
  | "INSURANCE"
  | "AIRPORT"
  | "CANCELLATION"
  | "MILEAGE"
  | "DOCUMENTS";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}
