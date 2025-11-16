import usePaginatedList from "../../hooks/usePaginatedList";

/**
 * 캣츠아이 게시물 목록 조회 훅
 * GET /admin/posts/catseye
 *
 * 백엔드: page(0-base), size, sort=property,dir
 * 프론트: page는 1부터 사용 (usePaginatedList에서 자동 변환)
 */
export default function useCatsEyePosts({
  initialPage = 1,
  initialSize = 25,
  initialSort = { key: "createdAt", dir: "desc" },
  initialParams = {},
} = {}) {
  return usePaginatedList({
    endpoint: "/admin/posts/catseye",
    initialPage,
    initialSize,
    initialSort,
    initialParams,
    // 필요하면 여기서 shape를 고정할 수 있음
    mapItem: (item) => ({
      id: item.id,
      address: item.address,
      content: item.content,
      nickname: item.nickname,
      createdAt: item.createdAt,
      likeCount: item.likeCount,
      reportCount: item.reportCount,
      commentCount: item.commentCount,
      shareTypes: item.shareTypes ?? [],
    }),
  });
}
