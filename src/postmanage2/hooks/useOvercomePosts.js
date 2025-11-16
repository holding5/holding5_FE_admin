// src/pages/hooks/useOvercomePosts.js
import usePaginatedList from "../../hooks/usePaginatedList";

/**
 * 극복수기 목록 조회 훅
 *
 * 사용 예:
 *   const {
 *     rows, page, setPage, size, setSize,
 *     sort, setSort, totalElements, totalPages,
 *     loading, error
 *   } = useOvercomePosts({ initialSize: 25 });
 */
export default function useOvercomePosts(options = {}) {
  const {
    // 필요하면 밖에서 오버라이드 가능하게 기본값만 설정
    endpoint = "/admin/posts/overcome",
    initialSort = { key: "createdAt", dir: "desc" },
    ...restOptions
  } = options;

  return usePaginatedList({
    endpoint,
    initialSort,
    // 서버 응답(JSON)을 테이블에서 쓰기 좋은 형태로 매핑
    mapItem: (item) => ({
      id: item.id,
      content: item.content,
      // 테이블은 nickname 컬럼을 쓰고, API는 authorName을 주므로 이름 변경
      nickname: item.authorName,
      createdAt: item.createdAt,
      likeCount: item.likeCount,
      commentCount: item.commentCount,
      reportCount: item.reportCount,
      // 테이블 코드가 배열을 기준으로 돌아가고 있으므로 배열로 감싸줌
      group: item.group ? [item.group] : [],
    }),
    ...restOptions,
  });
}
