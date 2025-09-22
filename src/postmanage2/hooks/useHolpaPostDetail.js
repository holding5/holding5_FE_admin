import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

// 홀파담벼락 게시물 상세조회{게시물Id}
export default function useHolpaPostDetail(postId, order = "desc") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(`/admin/holpawall/posts/${postId}`, {
        params: { order },
      });
      setData(res.data);
    } catch (e) {
      console.error("상세 조회 실패:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchDetail();
  }, [postId, order]);

  return { data, loading, error, refetch: fetchDetail };
}

/**
 * 게시글 삭제 (Soft Delete)
 * @param {number|string} postId
 * @returns {Promise<void>}
 */
export async function deleteHolpaPostContent(postId) {
  await axiosInstance.delete(`/admin/holpawall/posts/${postId}`);
}

/**
 * 댓글 삭제 (Soft Delete)
 * @param {number|string} commentId
 * @returns {Promise<void>}
 */
export async function deleteHolpaPostComment(commentId) {
  await axiosInstance.delete(`/admin/holpawall/posts/comments/${commentId}`);
}
