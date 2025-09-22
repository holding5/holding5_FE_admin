// src/hooks/useHolpaPosts.js
import usePaginatedList from "../../hooks/usePaginatedList";

/**
 * 홀파 담벼락 게시물 목록 조회 훅
 */
export default function useHolpaPosts(options = {}) {
  return usePaginatedList({
    endpoint: "/admin/holpawall/posts",
    initialParams: options.initialParams ?? {},
    initialSort: { key: "createdAt", dir: "desc", ...options.initialSort },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 10,

    mapItem: (item) => ({
      id: item.id,
      category: item.category,
      content: item.content,
      authorName: item.authorName,
      createdAt: item.createdAt,
      likeCount: item.likeCount ?? 0,
      reportCount: item.reportCount ?? 0,
      commentCount: item.commentCount ?? 0,
      severity: item.severity,
      state: item.state,
      activated: item.activated ?? true,
    }),
  });
}
