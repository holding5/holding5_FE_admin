// src/pages/hooks/useCatsEyeDetail.js
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function useCatsEyePostDetail(postId) {
  const [data, setData] = useState(null); // API 응답 그대로
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(`/admin/posts/catseye/${postId}`);
      setData(res.data); // 너가 준 예시 JSON 구조 그대로
    } catch (e) {
      console.error("캣츠아이 상세 조회 실패:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, loading, error, refetch: fetchDetail };
}

/** ✅ 게시글 삭제 (DEACTIVATED 처리) */
export async function deleteCatsEyePost(postId) {
  if (!postId && postId !== 0) throw new Error("postId가 필요합니다.");
  await axiosInstance.delete(`/admin/posts/${postId}`);
}

/** ✅ 댓글 삭제 (DEACTIVATED 처리 가정) */
// 경로는 BE에서 사용하는 댓글 삭제용 엔드포인트와 맞춰줘야 함
export async function deleteCatsEyeComment(commentId) {
  if (!commentId && commentId !== 0) throw new Error("commentId가 필요합니다.");
  await axiosInstance.delete(`/admin/comments/${commentId}`);
}
