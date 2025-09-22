// src/hooks/useBannedUsers.js
import usePaginatedList from "./usePaginatedList";

/**
 * 영구제명 회원 목록 전용 훅
 */
export default function useBannedUsers(options = {}) {
  return usePaginatedList({
    endpoint: "/admin/member/banned",
    initialParams: { ...options.initialParams },
    initialSort: { key: "userId", dir: "asc", ...options.initialSort },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 25,

    mapItem: (it) => ({
      id: it.userId, // 테이블 내 유일 key
      nickname: it.nickname,
      status: it.status,
      bannedAt: it.bannedAt,
      totalReportCount: it.totalReportCount,
      spammingCount: it.spammingCount,
      inappropriateLanguageCount: it.inappropriateLanguageCount,
      verbalAbuseCount: it.verbalAbuseCount,
      sexualHarassmentCount: it.sexualHarassmentCount,
    }),

    ...options,
  });
}
