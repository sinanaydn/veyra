import { mockBlogPosts } from "@/lib/mocks/blog";
import { delay } from "@/lib/utils";
import type { BlogPost } from "../types/blog.types";

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    await delay();
    return [...mockBlogPosts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    await delay();
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  },

  async getRecent(limit: number = 3): Promise<BlogPost[]> {
    await delay();
    return [...mockBlogPosts]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      )
      .slice(0, limit);
  },
};
