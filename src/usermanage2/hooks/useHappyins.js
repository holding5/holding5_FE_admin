// src/pages/system/hooks/useHappyins.js (경로는 useDreamins.js랑 같이 두기)
import usePaginatedList from "../../hooks/usePaginatedList";
import axiosInstance from "../../utils/axiosInstance";
import { labelMapper } from "../../utils/LabelMapper";
import { useState, useEffect, useCallback } from "react";

/**
 * 해피인 목록 전용 커스텀 훅 -> 해피인 테이블 조회
 *
 * - 기본 엔드포인트: /admin/happyin/table
 * - 쿼리 파라미터:
 *    - role        : GROUP_HAPPYIN | BASIC_HAPPYIN | STAR_HAPPYIN | TEEN_HAPPYIN (선택)
 *    - q           : 통합검색 (닉네임/이름/전화번호)
 *    - onlyActive  : 활성 회원만 (기본 true)
 *    - page        : 0-based (훅 내부에서 1-based로 변환해서 사용)
 *    - size        : 페이지 크기
 *    - sort        : property,(asc|desc)
 */
export default function useHappyins(options = {}) {
  const endpoint = options.endpoint || "/admin/happyin/table";

  // 기본 파라미터 구성
  const initialParams = {
    onlyActive: true,
    ...(options.initialParams ?? {}),
    ...(options.externalParams ?? {}),
  };

  // role을 옵션으로 받고 싶으면 이렇게 (없으면 안 붙음)
  if (options.role) {
    initialParams.role = options.role; // e.g. "GROUP_HAPPYIN"
  }

  return usePaginatedList({
    endpoint,

    initialParams,
    initialSort: {
      key: "createdAt",
      dir: "desc",
      ...(options.initialSort ?? {}),
    },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 20, // swagger 기본 20 맞춰줌

    // ✅ 백엔드 응답 -> 테이블 행 형태로 변환
    mapItem: (it) => ({
      id: it.id,
      nickname: it.nickname,
      gender: it.gender, // MAN / WOMAN
      name: it.name,
      createdAt: it.createdAt, // "2025-03-05"
      phoneNumber: it.phoneNumber,
      email: it.email,
      status: it.status, // ACTIVATED / DEACTIVATED ...
      religion: it.religion, // NONE / BUDDHIST / ...
      ageGroup: it.ageGroup, // TWENTIES / ...
      reports: it.totalReportCount,
      serviceRole: it.serviceRole, // BASIC_HAPPYIN / GROUP_HAPPYIN ...
    }),

    ...options,
  });
}

/**
 * ✅ 해피인 카드 뷰 전용 훅
 *
 * - 엔드포인트: /admin/happyin
 * - 쿼리 파라미터:
 *    - role      : GROUP_HAPPYIN | BASIC_HAPPYIN | ...
 *    - category  : 그룹 카테고리
 *    - q         : 검색어
 *    - sort      : NAME_ASC | NAME_DESC | CREATED_DESC | ...
 *    - page, size: 0-based pageable
 */
export function useHappyinCards(options = {}) {
  const endpoint = options.endpoint || "/admin/happyin";

  const initialParams = {
    sort: "NAME_ASC",
    ...(options.initialParams ?? {}),
    ...(options.externalParams ?? {}),
  };

  if (options.role) {
    initialParams.role = options.role;
  }
  if (options.category) {
    initialParams.category = options.category;
  }

  return usePaginatedList({
    endpoint,
    initialParams,
    initialSort: null, // 🔹 Pageable sort 안 씀
    supportsSort: false, // 🔹 ENUM sort를 그대로 사용
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 12,
    mapItem: (it) => ({
      id: it.id,
      nickname: it.nickname,
      name: it.name,
      serviceRole: it.serviceRole,
      category: it.category ?? it.groupCategory,
      thumbnailUrl: it.thumbnailUrl ?? it.profileImage,
    }),
    ...options,
  });
}

/**
 * 해피인 디테일 프로필 조회 훅
 * @param {string|number} id - 해피인 ID
 */
export function useHappyinProfile(id) {
  const [form, setForm] = useState(null); // 화면에 바인딩할 폼 데이터
  const [histories, setHistories] = useState([]); // 활동 이력
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 행정 모달에서 쓸 원시값들
  const [rawStatus, setRawStatus] = useState(null); // e.g. "ACTIVATED"
  const [rawRoles, setRawRoles] = useState([]); // e.g. ["GROUP_HAPPYIN"]

  const fetchProfile = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      // ✅ 해피인 디테일 API
      const res = await axiosInstance.get(`/admin/happyin/${id}`);
      const data = res.data;

      // ✅ 화면용 폼 데이터 (라벨 매핑 + 필드명 맞춰주기)
      setForm({
        email: data.email ?? "",
        nickname: data.nickname ?? "",
        gender: labelMapper("genderMap", data.gender), // MAN → 남
        name: data.name ?? "",
        birthdate: data.birthdate ?? "",
        phoneNumber: data.phoneNumber ?? "",
        school: data.school ?? "",
        // 백엔드 필드명이 workface 이므로 job으로 변환해서 사용
        workface: data.workface ?? "",
        religion: labelMapper("religionMap", data.religion), // NONE → 무교
        serviceRole: labelMapper("serviceRoleMap", data.serviceRole),
        // 필요하면 아래도 추가해서 TextField 더 늘리면 됨
        groupCategory: labelMapper("groupCategoryMap", data.groupCategory),
        greetingMessage: data.greetingMessage ?? "",
      });

      // ✅ 원시값 보관 (행정 모달에서 그대로 사용)
      setRawStatus(data.status ?? null);

      const rolesVal = Array.isArray(data.serviceRoles)
        ? data.serviceRoles
        : data.serviceRole
        ? [data.serviceRole]
        : [];
      setRawRoles(rolesVal);

      setHistories(Array.isArray(data.histories) ? data.histories : []);
    } catch (err) {
      console.error("해피인 프로필 조회 실패:", err);
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
    rawStatus,
    rawRoles,
  };
}

/**
 * ✅ 해피인 게시글/댓글 활동 조회 훅
 *    GET /admin/happyin/{id}/contents
 */
export function useHappyinPosts(happyinId, options = {}) {
  const endpoint = `/admin/happyin/${happyinId}/contents`;

  return usePaginatedList({
    endpoint,
    initialParams: options.initialParams ?? {},
    initialSort: options.initialSort ?? { key: "createdAt", dir: "desc" },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 25,

    // 🔁 API 응답 → 테이블 행 맵핑
    mapItem: (it) => ({
      id: it.no, // ← no를 id로 사용
      category: it.category, // "홀파담벼락", "댓글"
      topic: it.topic, // "LIGHT_STORY" ...
      type: it.type, // "POST" | "COMMENT"
      content: it.content,
      holpaScore: it.holpaScore,
      reportCount: it.reportCount,
      createdAt: it.createdAt,
      authorNickname: it.authorNickname,
      mediaFiles: it.mediaFiles ?? [],
    }),

    ...options,
  });
}

/**
 * ✅ 해피인 신청서 목록 조회 훅
 *
 * GET /admin/happyin/applications
 *
 * query:
 *  - status : DIP | ACTIVATED | SUSPENDED | DEACTIVATED (선택)
 *  - page   : 0-based (훅에서 1-based ↔ 0-based 변환)
 *  - size   : 페이지 크기
 *  - sort   : property,(asc|desc)
 */
export function useHappyinApplications(options = {}) {
  const endpoint = options.endpoint || "/admin/happyin/applications";

  // 기본 파라미터
  const initialParams = {
    ...(options.initialParams ?? {}),
    ...(options.externalParams ?? {}),
  };

  // 처음부터 특정 상태만 보고 싶으면 options.status 로 전달 가능
  if (options.status) {
    initialParams.status = options.status; // DIP / ACTIVATED / ...
  }

  return usePaginatedList({
    endpoint,
    initialParams,
    initialSort: {
      key: "createdAt",
      dir: "desc",
      ...(options.initialSort ?? {}),
    },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 25,

    // 🔁 백엔드 응답 → 테이블 한 행 형태로 매핑
    mapItem: (it) => ({
      id: it.id,
      userId: it.userId,
      nickname: it.nickname,
      serviceRole: it.serviceRole, // BASIC_HAPPYIN ...
      birthDate: it.birthDate,
      jobTitle: it.jobTitle,
      phoneNumber: it.phoneNumber,
      career: it.career,
      selfIntroduction: it.selfIntroduction,
      motivation: it.motivation,
      hasAttachment: it.hasAttachment, // boolean 그대로 쓰거나, "있음"/"-" 로 가공해도 됨
      createdAt: it.createdAt,
      status: it.status, // DIP / ACTIVATED / SUSPENDED / ...
    }),

    ...options,
  });
}

/**
 * 특정 유저의 최신 해피인 신청 상세 조회
 * GET /admin/happyin/applications/{userId}
 */
export function useHappyinApplicationProfile(userId) {
  const [form, setForm] = useState(null); // 신청 상세 데이터
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplication = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(
        `/admin/happyin/applications/${userId}`
      );

      // 백엔드 응답 그대로 form에 넣어도 되고,
      // 필요하면 여기에서 가볍게 가공해서 넘겨도 됨
      setForm(res.data ?? null);
    } catch (e) {
      console.error("해피인 신청 상세 조회 실패:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  return {
    form,
    loading,
    error,
    refetch: fetchApplication,
  };
}

/**
 * 해피인 직권 생성 훅
 * POST /admin/happyin/force
 */
export function useHappyinForceCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  /**
   * payload 예:
   * {
   *   email: "newhappyin@test.com",
   *   password: "happyin123!",
   *   nickname: "용기있는별",
   *   gender: "MAN",
   *   birthDate: "1998-01-15",
   *   phoneNumber: "010-1234-5678",
   *   affiliation: "한양대학교 교육학과",
   *   serviceRole: "BASIC_HAPPYIN",
   *   groupCategory: "CULTURE_ART",
   *   religion: "NONE"
   * }
   */
  const submit = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/admin/happyin/force", payload);
      setResult(res.data);
      return res.data;
    } catch (err) {
      // 에러 메시지 반환
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, result };
}

// 특정 유저의 해피인 신청 승인/거절 액션 훅
export function useHappyinApplicationActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 승인
  const approveApplication = async (userId, message) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(
        `/admin/happyin/applications/${userId}/application/approve`,
        {
          userId,
          message,
        }
      );
      return res.data;
    } catch (e) {
      setError(e);
      console.error("해피인 신청 승인 실패:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // 거절
  const rejectApplication = async (userId, message) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(
        `/admin/happyin/applications/${userId}/application/reject`,
        {
          userId,
          message,
        }
      );
      return res.data;
    } catch (e) {
      setError(e);
      console.error("해피인 신청 거절 실패:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    approveApplication,
    rejectApplication,
    loading,
    error,
  };
}
