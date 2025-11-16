// useDreamins.js
import usePaginatedList from "../../hooks/usePaginatedList";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { labelMapper } from "../../utils/LabelMapper";

/**
 * 드림인 목록 전용 커스텀 훅 -> 드림인 테이블 조회
 * - options.endpoint: 기본 목록(/admin/member/dreamins) 또는 상세검색(/admin/member/dreamins/search)로 교체 가능
 * - options.externalParams: 상세검색에서 넘어온 추가 파라미터를 초기 파라미터에 병합
 */
export default function useDreamins(options = {}) {
  const endpoint = options.endpoint || "/admin/member/dreamins"; // ✅ 엔드포인트 오버라이드

  return usePaginatedList({
    endpoint, // ✅ 전달

    // ✅ 초기 파라미터: 기본 + 외부(상세필터) + 사용자가 넘긴 initialParams
    initialParams: {
      onlyActive: true,
      ...(options.initialParams ?? {}),
      ...(options.externalParams ?? {}),
    },

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
      religion: it.religion, // NONE / BUDDHIST / CHRISTIAN / CATHOLIC
      ageGroup: it.ageGroup, // ELEMENTARY / MIDDLE / HIGH / ...
      reports: it.totalReportCount,
    }),

    ...options,
  });
}

/**
 * 드림인 디테일 신상정보 조회 훅
 * @param {string|number} id - 드림인 ID
 */
export function useDreaminProfile(id) {
  const [form, setForm] = useState(null); // 라벨 매핑된 표시용 데이터
  const [histories, setHistories] = useState([]); // 활동 이력
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 중복 조치 방지를 위해 원시값을 별도로 보관
  const [rawStatus, setRawStatus] = useState(null); // "ACTIVE" | "SUSPENDED" | "BANNED"
  const [rawRoles, setRawRoles] = useState([]); // ["DREAMIN","HAPPYIN", ...]

  const fetchProfile = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/admin/member/dreamins/${id}`);
      const data = res.data;

      // ✅ 라벨 매핑된 표시용 폼
      setForm({
        email: data.email ?? "",
        nickname: data.nickname ?? "",
        gender: labelMapper("genderMap", data.gender),
        name: data.name ?? "",
        birthdate: data.birthdate ?? "",
        phoneNumber: data.phoneNumber ?? "",
        job: data.job ?? "",
        school: data.school ?? "",
        religion: labelMapper("religionMap", data.religion),
        status: labelMapper("statusMap", data.status),
        ageGroup: labelMapper("ageGroupMap", data.ageGroup),
      });

      // ✅ 원시 상태/역할 (백엔드 enum 그대로)
      const statusVal = data.status ?? null;

      // 백엔드 스키마가 serviceRoles(배열) 또는 serviceRole(단일)일 수 있으니 둘 다 케어
      const rolesVal = Array.isArray(data.serviceRoles)
        ? data.serviceRoles
        : data.serviceRole
        ? [data.serviceRole]
        : [];

      setRawStatus(statusVal);
      setRawRoles(rolesVal);

      setHistories(Array.isArray(data.histories) ? data.histories : []);
    } catch (err) {
      console.error("드림인 프로필 조회 실패:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    form,
    setForm,
    histories,
    setHistories,
    loading,
    error,
    refetch: fetchProfile,

    // 👇 모달에서 중복 조치 방지 판단에 사용
    rawStatus, // e.g., "ACTIVE" | "SUSPENDED" | "BANNED"
    rawRoles, // e.g., ["DREAMIN","HAPPYIN"]
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
