// src/hooks/usePausedUsers.js
import usePaginatedList from "../../hooks/usePaginatedList";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";

export default function usePausedUsers(options = {}) {
  // 기본은 "목록" 엔드포인트
  const [endpoint, setEndPoint] = useState("/admin/suspensions");

  const list = usePaginatedList({
    endpoint, // 동적으로 바뀜
    initialParams: options.initialParams ?? {},
    initialSort: {
      key: "suspensionStartAt",
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

  // 돋보기 버튼 눌렀을 시 검색
  const runSearch = (q) => {
    const keyword = (q ?? "").trim();

    if (keyword) {
      setEndPoint("/admin/suspensions/search");
      list.setParams({ ...(list.params ?? {}), q: keyword });
      list.setSort({ key: null, dir: null });
    } else {
      //빈 검색어이면 검색 모드 해제 = 목록모드
      setEndPoint("/admin/suspensions");
      list.setParams({ ...(list.params ?? {}), q: "" });
    }
    list.setPage(1);
  };

  //
  const clearSearch = () => {
    setEndPoint("/admin/suspensions");
    list.setParams({ ...(list.params ?? {}), q: "" });
    list.setPage(1);
  };

  return { ...list, runSearch, clearSearch, setEndPoint };
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
