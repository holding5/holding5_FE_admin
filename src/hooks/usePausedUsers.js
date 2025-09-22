// src/hooks/usePausedUsers.js
import usePaginatedList from "./usePaginatedList";
import axiosInstance from "../utils/axiosInstance";

export default function usePausedUsers(options = {}) {
  return usePaginatedList({
    endpoint: "/admin/suspensions", // 👉 BE API 엔드포인트 확인 필요
    initialParams: options.initialParams ?? {},
    initialSort: {
      key: "startDate",
      dir: "desc",
      ...options.initialSort,
    },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 10,

    // API 응답 content를 테이블 row로 매핑
    mapItem: (item) => ({
      id: item.userId, // 체크박스 선택용
      userId: item.userId,
      nickname: item.nickname,
      suspensionStartAt: item.suspensionStartAt,
      elapsedDays: item.elapsedDays,
      suspensionEndAt: item.suspensionEndAt,
      remainingDays: item.remainingDays,
      totalReportCount: item.totalReportCount,
      spammingCount: item.spammingCount,
      inappropriateLanguageCount: item.inappropriateLanguageCount,
      verbalAbuseCount: item.verbalAbuseCount,
      sexualHarassmentCount: item.sexualHarassmentCount,
    }),

    ...options,
  });
}

/**
 * 일시정지 해제 요청 (POST)
 * @param {number[]} userIds - 해제할 userId 배열
 */
export async function releasePausedUsers(userIds) {
  const res = await axiosInstance.post("/admin/suspensions/release", userIds);
  return res;
}

/**
 * 영구정지 요청 (POST)
 * @param {number[]} userIds - 영구정지할 userId 배열
 */
export async function banPausedUsers(userIds) {
  const res = await axiosInstance.post("/admin/suspensions/ban", userIds);
  return res;
}
