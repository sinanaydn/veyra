import { useQuery } from "@tanstack/react-query";
import { reviewsService } from "../services/reviews.service";

export const reviewKeys = {
  all: ["reviews"] as const,
  recent: (limit?: number) => ["reviews", "recent", limit] as const,
};

export function useReviews() {
  return useQuery({
    queryKey: reviewKeys.all,
    queryFn: () => reviewsService.getAll(),
  });
}

export function useRecentReviews(limit?: number) {
  return useQuery({
    queryKey: reviewKeys.recent(limit),
    queryFn: () => reviewsService.getRecent(limit),
  });
}
