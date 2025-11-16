// src/pages/hooks/useReportedUserContents.js
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

/**
 * 특정 작성자의 신고된 게시글/댓글 목록 조회 훅
 *
 * GET /admin/reports/users/{userId}/contents
 *  - path: userId
 *  - query:
 *      - order: "asc" | "desc"
 *      - reportType: string | undefined (null/빈값이면 전체)
 *
 * @param {number|string|null} userId          - 신고 대상 유저 ID
 * @param {{
 *   initialOrder?: "asc"|"desc",
 *   initialReportType?: string
 * }} [options]
 */
export default function useReportedUserContents(userId, options = {}) {
  const { initialOrder = "desc", initialReportType = "" } = options;

  const [items, setItems] = useState([]); // API에서 내려오는 배열 전체
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 화면에서 컨트롤할 필터/정렬 상태
  const [order, setOrder] = useState(initialOrder);
  const [reportType, setReportType] = useState(initialReportType);

  const fetchContents = useCallback(async () => {
    if (!userId && userId !== 0) return;

    setLoading(true);
    setError(null);

    const controller = new AbortController();

    try {
      const params = {};
      if (order) params.order = order;
      if (reportType) params.reportType = reportType;

      const res = await axiosInstance.get(
        `/admin/reports/users/${userId}/contents`,
        {
          params,
          signal: controller.signal,
        }
      );

      // 이 엔드포인트는 배열을 바로 반환한다고 가정
      const data = Array.isArray(res.data) ? res.data : [];
      setItems(data);
    } catch (e) {
      // 취소된 요청은 무시
      if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
      console.error("신고 컨텐츠 조회 실패:", e);
      setError(e);
    } finally {
      setLoading(false);
    }

    // cleanup 용으로 controller 반환
    return () => controller.abort();
  }, [userId, order, reportType]);

  // userId / order / reportType 변경 시 재요청
  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return {
    items, // [{ post, userInfo, comments, postReports, commentReports }, ...]
    loading,
    error,

    // 정렬/필터 제어용
    order,
    setOrder,
    reportType,
    setReportType,

    // 수동 새로고침
    refetch: fetchContents,
  };
}

// === 신고된 게시글 단건 액션 API ===

/**
 * 게시글 신고 무혐의 처리
 * POST /admin/reports/posts/{postId}/dismiss
 */
export async function dismissReportedPost(postId) {
  if (postId == null) throw new Error("postId가 필요합니다.");
  await axiosInstance.post(`/admin/reports/posts/${postId}/dismiss`);
}

/**
 * 신고 게시글 삭제(소프트) + 미처리 신고 일괄 처리완료
 * DELETE /admin/reports/posts/{postId}
 */
export async function deleteReportedPost(postId) {
  if (postId == null) throw new Error("postId가 필요합니다.");
  await axiosInstance.delete(`/admin/reports/posts/${postId}`);
}

// === 신고된 댓글 단건 액션 API ===

/**
 * 댓글 신고 무혐의 처리
 * POST /admin/reports/comments/{commentId}/dismiss
 */
export async function dismissReportedComment(commentId) {
  if (commentId == null) throw new Error("commentId가 필요합니다.");
  await axiosInstance.post(`/admin/reports/comments/${commentId}/dismiss`);
}

/**
 * 신고 댓글 삭제(소프트) + 미처리 신고 일괄 처리완료
 * DELETE /admin/reports/comments/{commentId}
 */
export async function deleteReportedComment(commentId) {
  if (commentId == null) throw new Error("commentId가 필요합니다.");
  await axiosInstance.delete(`/admin/reports/comments/${commentId}`);
}
