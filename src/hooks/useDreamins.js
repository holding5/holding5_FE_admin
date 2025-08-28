// src/hooks/useDreamins.js
import usePaginatedList from "./usePaginatedList";

/**
 * 드림인 목록 전용 커스텀 훅
 * (Spring 페이지네이션 응답 구조에 맞춤)
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
      gender: it.gender,           // MAN / WOMAN
      name: it.name,
      createdAt: it.createdAt,
      phoneNumber: it.phoneNumber,
      email: it.email,
      status: it.status,           // ACTIVE / SUSPENDED / BANNED
      religion: it.religion,       // NONE / BUDDHIST / CHRISTIAN ...
      ageGroup: it.ageGroup,       // 초등 / 중등 / 고등 ...
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
