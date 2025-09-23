// useDreamins.js
import usePaginatedList from "../../hooks/usePaginatedList";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { labelMapper } from "../../utils/LabelMapper";

/**
 * 드림인 목록 전용 커스텀 훅 -> 드림인 테이블 조회
 */
export default function useDreamins(options = {}) {
  return usePaginatedList({
    endpoint: "/admin/member/dreamins", // ✅ 백엔드 엔드포인트
    initialParams: { onlyActive: true, ...options.initialParams },
    initialSort: { key: "createdAt", dir: "desc", ...options.initialSort },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 10,

    // 응답 데이터를 테이블에 맞게 변환
    mapItem: (it) => ({
      id: it.id,
      nickname: it.nickname,
      gender: it.gender, // MAN / WOMAN
      name: it.name,
      createdAt: it.createdAt,
      phoneNumber: it.phoneNumber,
      email: it.email,
      status: it.status, // ACTIVE / SUSPENDED / BANNED
      religion: it.religion, // NONE / BUDDHIST / CHRISTIAN ...
      ageGroup: it.ageGroup, // 초등 / 중등 / 고등 ...
      reports: it.totalReportCount,

      // ✱ 아직 API 응답에 없는 값들은 보류
      // holpaScore: it.holpaScore,
      // holpaRank: it.holpaRank,
      // avgAccess: it.avgAccess,
      // totalAccess: it.totalAccess,
    }),

    ...options,
  });
}

/**
 * 드림인 디테일 신상정보 조회 훅
 * @param {string|number} id - 드림인 ID
 */
export function useDreaminProfile(id) {
  const [form, setForm] = useState(null); // ✅ 프로필 정보
  const [histories, setHistories] = useState([]); // ✅ 활동 이력
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태
  const [error, setError] = useState(null); // ✅ 에러 상태

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/admin/member/dreamins/${id}`);
        const data = res.data;

        setForm({
          email: data.email ?? "",
          nickname: data.nickname ?? "",
          gender: labelMapper("genderMap", data.gender), // "남"/"여"
          name: data.name ?? "",
          birthdate: data.birthdate ?? "",
          phoneNumber: data.phoneNumber ?? "",
          job: data.job ?? "",
          school: data.school ?? "",
          religion: labelMapper("religionMap", data.religion), // "불교" 등
          status: labelMapper("statusMap", data.status), // "활동중"
          ageGroup: labelMapper("ageGroupMap", data.ageGroup), // "중학생" 등
        });

        setHistories(Array.isArray(data.histories) ? data.histories : []);
      } catch (err) {
        console.error("드림인 프로필 조회 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  return {
    form, // 입력 폼 상태
    setForm, // 외부에서 수정 가능
    histories, // 활동 이력
    loading,
    error,
  };
}

/**
 * 드림인 디테일 게시물 활동 리스트 조회 훅
 *
 * @param {number} dreaminId
 * @param {object} options
 * @returns {object}
 */
export function useDreaminPosts(dreaminId, options = {}) {
  return usePaginatedList({
    endpoint: `/admin/member/dreamins/${dreaminId}/contents`,

    initialParams: options.initialParams ?? {},
    initialSort: { key: "createdAt", dir: "desc", ...options.initialSort },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 10,

    mapItem: (item) => ({
      no: item.no,
      category: item.category,
      topic: item.topic,
      type: item.type,
      content: item.content,
      holpaScore: item.holpaScore ?? 0,
      reportCount: item.reportCount,
      createdAt: item.createdAt,
      authorNickname: item.authorNickname,
    }),

    ...options,
  });
}

/**
 * 드림인 활동 평가 조회 훅 (기본 + 기간)
 * @param {number|string} memberId - 드림인 ID
 */
export function useDreaminEvaluation(memberId) {
  const [data, setData] = useState(null); // 조회 결과 데이터
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
      const res = await axiosInstance.get(
        `/admin/member/dreamins/${memberId}/activity`
      );
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
  const fetchByPeriod = useCallback(
    async (from, to) => {
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
    },
    [memberId]
  );

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
