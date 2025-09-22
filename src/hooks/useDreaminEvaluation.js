import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

/**
 * 드림인 활동 평가 조회 훅 (기본 + 기간)
 * @param {number|string} memberId - 드림인 ID
 */
export default function useDreaminEvaluation(memberId) {
  const [data, setData] = useState(null);      // 조회 결과 데이터
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 서버 응답 데이터를 공통 가공
   */
  const processData = (d) => ({
    wall: {
      category: "홀파담벼락",
      postCount: d.wall?.postCount ?? 0,
      likeCount: d.wall?.likeCount ?? 0,
      reportCount: d.wall?.reportCount ?? 0,
    },
    comment: {
      category: "댓글",
      postCount: d.comment?.postCount ?? 0,
      likeCount: d.comment?.likeCount ?? 0,
      reportCount: d.comment?.reportCount ?? 0,
    },
    hpaScore: d.hpaScore ?? "-",
    grade: d.grade ?? "-",
    attendanceCount: d.attendanceCount ?? "-",
    monthlyAttendanceRate: d.monthlyAttendanceRate ?? "-",
    totalAttendanceDays: d.totalAttendanceDays ?? "-",
    createdAt: d.createdAt ?? "-",
  });

  /**
   * ✅ 기본 조회 (최초 마운트 시)
   */
  const fetchDefault = useCallback(async () => {
    if (!memberId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(`/admin/member/dreamins/${memberId}/activity`);
      setData(processData(res.data));
    } catch (err) {
      console.error("기본 활동평가 조회 실패:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  /**
   * ✅ 기간 검색 조회
   * @param {string} from - yyyy-MM-dd
   * @param {string} to - yyyy-MM-dd
   */
  const fetchByPeriod = useCallback(async (from, to) => {
    if (!memberId || !from || !to) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(
        `/admin/member/dreamins/${memberId}/activity/period`,
        { params: { from, to } }
      );
      setData(processData(res.data));
    } catch (err) {
      console.error("기간별 활동평가 조회 실패:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  // ✅ mount 시 기본 조회
  useEffect(() => {
    fetchDefault();
  }, [fetchDefault]);

  return {
    data,
    loading,
    error,
    fetchByPeriod, // 외부에서 호출 가능
  };
}
