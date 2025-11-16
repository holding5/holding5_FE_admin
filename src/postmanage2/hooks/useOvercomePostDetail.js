// src/pages/hooks/useOvercomePostDetail.js
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // ✅ usePaginatedList랑 동일한 경로 사용

/**
 * 극복수기 게시글 상세 조회 훅
 *
 * GET /admin/posts/overcome/{postId}
 */
export default function useOvercomePostDetail(postId) {
  const [data, setData] = useState(null); // 게시글 + 댓글
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetail = async (id) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(`/admin/posts/overcome/${id}`);

      const raw = res.data;

      // ✅ 컴포넌트에서 쓰기 좋은 형태로 매핑
      const mapped = {
        ...raw,
        // 목록/상세 모두 group을 배열로 통일
        group: raw.group ? [raw.group] : [],
        // 댓글 없으면 빈 배열
        comments: raw.comments ?? [],
        beforeStories: raw.beforeStories ?? [],
      };

      setData(mapped);
    } catch (e) {
      console.error("극복수기 상세 조회 실패", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // 마운트 + postId 변경 시 조회
  useEffect(() => {
    fetchDetail(postId);
  }, [postId]);

  // 필요하면 나중에 리프레시 용으로 refetch 사용 가능
  return {
    data,
    loading,
    error,
    refetch: () => fetchDetail(postId),
  };
}

/** ✅ 극복수기 게시글 삭제 (Soft Delete) */
export async function deleteOvercomePost(postId) {
  if (!postId && postId !== 0) throw new Error("postId가 필요합니다.");
  await axiosInstance.delete(`/admin/posts/${postId}`);
}

/** ✅ 극복수기 댓글 삭제 (Soft Delete) */
export async function deleteOvercomeComment(commentId) {
  if (!commentId && commentId !== 0) throw new Error("commentId가 필요합니다.");
  await axiosInstance.delete(`/admin/comments/${commentId}`);
}
