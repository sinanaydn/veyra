import { mockReviews } from "@/lib/mocks/reviews";
import { delay } from "@/lib/utils";
import type { Review } from "../types/review.types";

export const reviewsService = {
  async getAll(): Promise<Review[]> {
    await delay();
    return [...mockReviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  async getRecent(limit: number = 4): Promise<Review[]> {
    await delay();
    return [...mockReviews]
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, limit);
  },
};
