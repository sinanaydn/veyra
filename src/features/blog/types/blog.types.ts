export type BlogCategory =
  | "CITY_GUIDE"
  | "RENTAL_TIPS"
  | "AIRPORT_TRANSPORT"
  | "BUSINESS_TRAVEL"
  | "SEGMENT_COMPARISON";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  publishedAt: string;
}
