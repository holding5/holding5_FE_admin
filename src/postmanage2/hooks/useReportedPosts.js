// src/pages/hooks/useReportedPosts.js
import usePaginatedList from "../../hooks/usePaginatedList";

/**
 * 신고/삭제된 게시물 요약 목록 조회 훅
 *
 * GET /admin/reports/posts
 *  - status: OPEN | DISMISSED | RESOLVED (선택)
 *  - page, size, sort: Spring pageable
 */
export default function useReportedPosts(options = {}) {
  return usePaginatedList({
    endpoint: "/admin/reports/posts",
    initialParams: {
      // 기본 필터 값 (필요하면 여기서 status 초기값 줄 수 있음)
      ...options.initialParams,
    },
    // 정렬: 처음에는 최신 신고 순
    initialSort: {
      key: "firstReportedAt",
      dir: "desc",
      ...(options.initialSort || {}),
    },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 25,

    // 백엔드 응답 → 테이블에서 쓰기 좋은 필드로 매핑
    mapItem: (it) => ({
      // React key용으로 유니크하게 합쳐줌
      key: `${it.targetType}-${it.postId}-${it.commentId ?? 0}`,

      postId: it.postId,
      commentId: it.commentId,
      targetType: it.targetType, // POST / COMMENT
      postType: it.postType, // HOLPAWALL / CATSEYE 등

      id: it.authorId,
      authorNickname: it.authorNickname,
      authorServiceRole: it.authorServiceRole,

      reportStatus: it.reportStatus, // OPEN / DISMISSED / RESOLVED
      contentStatus: it.contentStatus, // ACTIVED / DEACTIVATED
      totalReportCount: it.totalReportCount,

      spammingCount: it.spammingCount,
      inappropriateLanguageCount: it.inappropriateLanguageCount,
      verbalAbuseCount: it.verbalAbuseCount,
      sexualHarassmentCount: it.sexualHarassmentCount,

      dominantReportType: it.dominantReportType,
      dominantReportCount: it.dominantReportCount,

      firstReportedAt: it.firstReportedAt,
      bannedAt: it.bannedAt,
      deleted: it.deleted,

      content: it.content,
    }),

    ...options,
  });
}
