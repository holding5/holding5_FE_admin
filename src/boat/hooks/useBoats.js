import { useState, useEffect, useMemo } from "react";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";
import axiosInstance from "../../utils/axiosInstance";

// ── 한글 → 백엔드 statusFilter 값 ──
const STATUS_TO_PARAM = {
  전체: null,
  진행중: "진행중",
  완료: "완료",
  조기중단: "조기중단",
  삭제: "삭제",
  비활성: "비활성",
};

// ── 한글 → 백엔드 BoatGoalType enum ──
const GOAL_TYPE_TO_ENUM = {
  전체: null,
  응원수: "SUPPORT_COUNT",
  거리: "DATE",
  혼합: "MIXED",
};

// ── 테이블 정렬키 → 서버 Pageable sort 키 ──
const TABLE_SORT_TO_SERVER = {
  createdAt: "createdAt",
  currentSupportCount: "currentSupportCount",
  sendCount: "relayCount",
};

/**
 * 돛단배 목록 조회 훅
 *
 * GET /admin/boats
 *   ?statusFilter=진행중
 *   &goalType=SUPPORT_COUNT
 *   &keyword=검색어
 *   &page=0&size=25&sort=createdAt,desc
 *
 * 응답: BoatPageResponseDto
 *   { content, page, size, totalCount, totalPages, first, last, hasNext, hasPrevious }
 */
export default function useBoats({
  endpoint = "/admin/boats",
  initialFilters = {
    status: "전체",
    boatType: "전체",
    q: "",
  },
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 25,
} = {}) {
  // ✅ 초기 params 변환
  const initialParams = useMemo(() => {
    const p = {};
    const st = STATUS_TO_PARAM[initialFilters.status];
    const gt = GOAL_TYPE_TO_ENUM[initialFilters.boatType];

    if (st) p.statusFilter = st;
    if (gt) p.goalType = gt;
    if (initialFilters.q?.trim()) p.keyword = initialFilters.q.trim();

    return p;
  }, [initialFilters]);

  const list = usePaginatedList({
    endpoint,
    initialParams,
    initialSort,
    initialPage,
    initialSize,

    // ✅ 서버 응답 → 테이블 row 매핑
    mapItem: (item) => ({
      id: item.id,
      status: item.statusLabel ?? "-",
      boatType: mapGoalTypeToLabel(item.goalType),
      content: item.content ?? "-",
      location: item.location ?? "-",
      ownerNickName: item.authorName ?? "-",
      targetSupportCount: item.targetSupportCount ?? 0,
      currentSupportCount: item.currentSupportCount ?? 0,
      sendCount: item.relayCount ?? 0,
      createdAt: formatDateTime(item.createdAt),
    }),
  });

  // ✅ 상태 필터 변경
  const setStatus = (uiLabel) => {
    const mapped = STATUS_TO_PARAM[uiLabel];
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      delete next.statusFilter;
      if (mapped) next.statusFilter = mapped;
      return next;
    });
  };

  // ✅ 목표 유형 필터 변경
  const setBoatType = (uiLabel) => {
    const mapped = GOAL_TYPE_TO_ENUM[uiLabel];
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      delete next.goalType;
      if (mapped) next.goalType = mapped;
      return next;
    });
  };

  // ✅ 키워드 검색
  const setQuery = (q) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      delete next.keyword;
      if (q?.trim()) next.keyword = q.trim();
      return next;
    });
  };

  // ✅ 테이블 정렬 키 → 서버 정렬 키 변환
  const setSortByTableKey = (tableKey, direction) => {
    const serverKey = TABLE_SORT_TO_SERVER[tableKey];
    if (!serverKey) return;
    list.setSort({ key: serverKey, dir: direction });
  };

  return {
    ...list,
    setStatus,
    setBoatType,
    setQuery,
    setSortByTableKey,
  };
}

// ── 백엔드 goalType 한글 설명 → 프론트 라벨 ──
function mapGoalTypeToLabel(goalType) {
  if (!goalType) return "-";
  // 백엔드가 @JsonValue로 한글을 내려주는 경우
  const map = {
    "응원수 우선": "응원수",
    "날짜 우선": "거리",
    혼합형: "혼합",
    // enum name으로 내려오는 경우 대비
    SUPPORT_COUNT: "응원수",
    DATE: "거리",
    MIXED: "혼합",
  };
  return map[goalType] ?? goalType;
}

// useBoats.js 맨 아래에 추가
export function useBoatDetail(boatId, open) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !boatId) return;
    setDetail(null);
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`/admin/boats/${boatId}`)
      .then((res) => setDetail(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [open, boatId]);

  return { detail, loading, error };
}
