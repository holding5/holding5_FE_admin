import { useCallback, useEffect, useState } from "react";

import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";

/**
 * 테이블 sort key -> 서버 sort 필드 매핑
 */
const SORT_KEY_MAP = {
  createdAt: "createdAt",
};

/**
 * 백엔드 Status enum → 한글 라벨
 * 백엔드: ACTIVATED / DISMISSED / DIP / SUSPENDED / DEACTIVATED
 */
const STATUS_LABEL = {
  ACTIVATED: "승인",
  DISMISSED: "거절",
  DIP: "대기",
  SUSPENDED: "보류",
  DEACTIVATED: "삭제",
};

/**
 * 프론트 파라미터 → 백엔드 쿼리 파라미터로 정규화
 *
 * 백엔드 파라미터:
 *   statusFilter  (ACTIVATED / DISMISSED / DIP 등)
 *   typeFilter    (HOPE / CONVERTED / DELETED)
 *   keyword       (제목/내용 검색)
 *   sortBy        (정렬 기준, 기본 createdAt)
 *   page, size    (usePaginatedList가 처리)
 */
function normalizeParams(params) {
  const p = { ...(params || {}) };

  // ── 상태: status / reviewStatus → statusFilter ──
  const rawStatus = p.status ?? p.reviewStatus ?? p.statusFilter ?? null;
  delete p.status;
  delete p.reviewStatus;
  if (rawStatus && rawStatus !== "전체") {
    p.statusFilter = rawStatus; // 이미 ACTIVATED/DISMISSED 등이어야 함
  } else {
    delete p.statusFilter;
  }

  // ── 검색어: q / keyword → keyword ──
  const rawQ = p.q ?? p.keyword ?? null;
  delete p.q;
  if (rawQ && rawQ.trim()) {
    p.keyword = rawQ.trim();
  } else {
    delete p.keyword;
  }

  // ── 타입필터: typeFilter ──
  if (!p.typeFilter || p.typeFilter === "전체") {
    delete p.typeFilter;
  }

  // ── 정렬: sortBy (기본값은 서버가 createdAt) ──
  // sort 키는 usePaginatedList에서 별도 처리하므로 여기선 sortBy만

  // ── 나머지 빈값 정리 ──
  Object.keys(p).forEach((k) => {
    if (p[k] === "전체" || p[k] === "" || p[k] == null) delete p[k];
  });

  return p;
}

/**
 * 희망메시지 목록 응답 -> 테이블 row 매핑
 * 백엔드 HopeMessageSummaryResDto:
 *   id, status(enum), statusDisplayName, title, content, fileName,
 *   createdAt, authorName, note
 */
function defaultMapItem(item) {
  return {
    id: item.id,
    status:
      item.statusDisplayName ?? STATUS_LABEL[item.status] ?? item.status ?? "-",
    rawStatus: item.status, // 원본 enum (ACTIVATED 등)

    title: item.title ?? "-",
    content: item.content ?? "-",
    file: item.fileName ?? "-",

    createdAt: formatDateTime(item.createdAt) ?? "-",
    nickName: item.authorName ?? "-",
    log: item.note ?? "-",

    raw: item,
  };
}

/**
 * 희망메시지 목록 조회 훅 (Spring Pageable)
 *
 * 백엔드 쿼리 파라미터:
 *   statusFilter (ACTIVATED/DISMISSED/DIP)
 *   typeFilter   (HOPE/CONVERTED/DELETED)
 *   keyword      (제목/내용 부분검색)
 *   sortBy       (정렬 기준)
 *   page, size
 */
export default function useHopeMessages({
  endpoint = "/admin/messages/hope",
  initialFilters = {},
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 25,
  debounceMs = 250,
  mapItem = defaultMapItem,
} = {}) {
  const list = usePaginatedList({
    endpoint,
    initialParams: normalizeParams({ sortBy: "createdAt", ...initialFilters }),
    initialSort: {
      key: SORT_KEY_MAP[initialSort.key] ?? initialSort.key,
      dir: initialSort.dir ?? "desc",
    },
    initialPage,
    initialSize,
    mapItem,
    debounceMs,
  });

  /**
   * 필터 변경(일반)
   * - key가 status면 reviewStatus로 자동 변환됨 (normalizeParams)
   * - key가 keyword면 q로 자동 변환됨 (normalizeParams)
   */
  const setFilter = (key, value) => {
    list.setPage(1);
    list.setParams((prev) =>
      normalizeParams({
        ...prev,
        [key]: value,
      }),
    );
  };

  /**
   * 상태 필터 전용
   * UI 한글 → 백엔드 Status enum 변환
   */
  const setStatus = (statusLabel) => {
    const toEnum = (v) => {
      if (!v || v === "전체") return "전체";
      if (v === "대기") return "DIP";
      if (v === "보류") return "SUSPENDED";
      if (v === "승인") return "ACTIVATED";
      if (v === "거절") return "DISMISSED";
      return v; // 이미 enum이면 그대로
    };

    list.setPage(1);
    list.setParams((prev) =>
      normalizeParams({
        ...prev,
        statusFilter: toEnum(statusLabel),
      }),
    );
  };

  /**
   * 검색어(keyword) 전용
   */
  const setQuery = (keyword) => {
    list.setPage(1);
    list.setParams((prev) =>
      normalizeParams({
        ...prev,
        keyword,
      }),
    );
  };

  /**
   * 테이블 정렬키로 정렬 설정
   */
  const setSortByTableKey = (tableKey, dir = "asc") => {
    const serverKey = SORT_KEY_MAP[tableKey] ?? tableKey;
    list.setSort({ key: serverKey, dir });
  };

  return {
    ...list, // rows, totalElements, totalPages, loading, error, page, size, params...
    setFilter,
    setStatus,
    setQuery,
    setSortByTableKey,
  };
}

/**
 * ✅ 희망메시지 통계 조회 훅
 * GET /admin/messages/hope/stats
 * Response: { total, approved, rejected, pending }
 */
export function useHopeMessageStats(endpoint = "/admin/messages/hope") {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ endpoint가 "/admin/message/hope" 라면 "/admin/message/hope/stats"
      const res = await axiosInstance.get(`${endpoint}/stats`);
      setStats({
        total: res.data?.total ?? 0,
        approved: res.data?.approved ?? 0,
        rejected: res.data?.rejected ?? 0,
        pending: res.data?.pending ?? 0,
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    statsLoading: loading,
    statsError: error,
    refetchStats: fetchStats,
  };
}

/**
 * ✅ 희망메시지 상세 조회 훅
 * GET /admin/messages/hope/{id}
 */
export function useHopeMessageDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/admin/messages/hope/${id}`);
      setData(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    detail: data,
    loading,
    error,
    refetch: fetchDetail,
  };
}

/**
 * 관리자 희망메시지 등록 훅
 * POST /admin/messages/hope
 */
export function useHopeMessageCreate() {
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  /**
   * 관리자 희망메시지 등록 (JSON)
   * @param {{
   *   happyinUserId: number,
   *   title: string,
   *   content: string,
   *   mediaFiles?: Array<{
   *     originalFilename: string,
   *     mediaType: string,
   *     storageUrl: string,
   *     size?: number|null,
   *     durationMillis?: number|null,
   *     thumbnailUrl?: string|null,
   *     sortOrder?: number
   *   }>
   * }} body
   */
  const createHopeMessage = useCallback(async (body) => {
    setCreating(true);
    setCreateError(null);

    try {
      const res = await axiosInstance.post("/admin/messages/hope", body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data; // { id: 생성된 ID }
    } catch (e) {
      console.error("희망메시지 등록 실패:", e);
      setCreateError(e);
      throw e;
    } finally {
      setCreating(false);
    }
  }, []);

  return {
    // ✅ create
    createHopeMessage,
    creating,
    createError,

    // (기존에 목록/상세/승인처리 등 있으면 그대로 같이 return)
  };
}
