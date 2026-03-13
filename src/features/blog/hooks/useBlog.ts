import { useQuery } from "@tanstack/react-query";
import { blogService } from "../services/blog.service";

export const blogKeys = {
  all: ["blog"] as const,
  detail: (slug: string) => ["blog", slug] as const,
  recent: (limit?: number) => ["blog", "recent", limit] as const,
};

export function useBlogPosts() {
  return useQuery({
    queryKey: blogKeys.all,
    queryFn: () => blogService.getAll(),
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => blogService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useRecentBlogPosts(limit?: number) {
  return useQuery({
    queryKey: blogKeys.recent(limit),
    queryFn: () => blogService.getRecent(limit),
  });
}
