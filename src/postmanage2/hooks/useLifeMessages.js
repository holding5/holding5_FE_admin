import { useCallback, useEffect, useState, useMemo } from "react";

import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";

// ── 한글 → 백엔드 Status enum ──
const STATUS_TO_ENUM = {
  전체: "전체",
  대기: "DIP",
  보류: "SUSPENDED",
  승인: "ACTIVATED",
  거절: "DISMISSED",
};

// ── 백엔드 Status enum → 한글 (fallback용, 서버가 statusDisplayName 줌) ──
const ENUM_TO_STATUS = {
  ACTIVATED: "승인",
  DISMISSED: "거절",
  DIP: "대기",
  SUSPENDED: "보류",
  DEACTIVATED: "삭제",
};

// ── 한글 → 백엔드 typeFilter ──
const TYPE_TO_ENUM = {
  전체: "전체",
  문자: "TEXT",
  음성: "AUDIO",
};

// ✅ 테이블 정렬키 -> 서버 sort 키
const TABLE_SORT_TO_SERVER = {
  id: "id",
  createdAt: "createdAt",
};

export default function useLifeMessages({
  endpoint = "/admin/messages/life",
  initialFilters = {
    reviewStatus: "전체",
    messageType: "전체",
    q: "",
  },
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 25,
} = {}) {
  // ✅ 서버로 보낼 params 형태로 변환
  const initialParams = useMemo(() => {
    const p = { sortBy: "createdAt" };
    const rs = STATUS_TO_ENUM[initialFilters.reviewStatus] ?? "전체";
    const mt = TYPE_TO_ENUM[initialFilters.messageType] ?? "전체";

    if (rs !== "전체") p.statusFilter = rs;
    if (mt !== "전체") p.typeFilter = mt;
    if (initialFilters.q) p.keyword = initialFilters.q;

    return p;
  }, [initialFilters]);

  const list = usePaginatedList({
    endpoint,
    initialParams,
    initialSort,
    initialPage,
    initialSize,
    // ✅ 서버 응답(LifeMessageSummaryResDto) -> 테이블 row 매핑
    mapItem: (it) => ({
      id: it.id,
      status:
        it.statusDisplayName ?? ENUM_TO_STATUS[it.status] ?? it.status ?? "-",
      messageType: it.messageType ?? "-", // 서버가 이미 "문자"/"음성" 한글로 내려줌
      title: it.title ?? "-",
      content: it.content ?? "-", // contentPreview → content
      file: it.fileName ?? "-",
      createdAt: formatDateTime(it.createdAt) ?? "-",
      nickName: it.authorName ?? "-", // authorNickname → authorName
      sendCount: it.sendCount ?? "-",
      raw: it,
    }),
  });

  // ✅ UI 액션용 setter들
  const setStatus = (uiLabel) => {
    const mapped = STATUS_TO_ENUM[uiLabel] ?? "전체";
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      delete next.reviewStatus; // 기존 키 제거
      delete next.statusFilter;
      if (mapped !== "전체") next.statusFilter = mapped;
      return next;
    });
  };

  const setMessageType = (uiLabel) => {
    const mapped = TYPE_TO_ENUM[uiLabel] ?? "전체";
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      delete next.messageType; // 기존 키 제거
      delete next.typeFilter;
      if (mapped !== "전체") next.typeFilter = mapped;
      return next;
    });
  };

  const setQuery = (q) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      delete next.q; // 기존 키 제거
      delete next.keyword;
      if (q?.trim()) next.keyword = q.trim();
      return next;
    });
  };

  const setSortByTableKey = (tableKey, direction) => {
    const serverKey = TABLE_SORT_TO_SERVER[tableKey];
    if (!serverKey) return;
    list.setSort({ key: serverKey, dir: direction });
  };

  return {
    ...list,
    setStatus,
    setMessageType,
    setQuery,
    setSortByTableKey,
  };
}

/**
 * ✅ 생명메시지 통계 훅
 * GET /admin/messages/life/stats
 * 응답: { total, approved, rejected, pending }
 */
export function useLifeMessageStats({
  endpoint = "/admin/messages/life/stats",
} = {}) {
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
      const res = await axiosInstance.get(endpoint);
      setStats({
        total: res?.data?.total ?? 0,
        approved: res?.data?.approved ?? 0,
        rejected: res?.data?.rejected ?? 0,
        pending: res?.data?.pending ?? 0,
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

  return { stats, loading, error, refetch: fetchStats };
}

/**
 * ✅ 생명메시지 상세 조회 훅
 * GET /admin/messages/life/{id}
 */
export function useLifeMessageDetail(
  id,
  { endpointBase = "/admin/messages/life" } = {},
) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`${endpointBase}/${id}`);
      setDetail(res?.data ?? null);
    } catch (e) {
      setError(e);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [id, endpointBase]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { detail, loading, error, refetch: fetchDetail };
}

/**
 * ✅ 생명메시지 등록 훅 (관리자)
 * POST /admin/messages/life
 *
 * 백엔드 LifeMessageCreateReqDto:
 *   happyinUserId (필수), title, content, mediaFiles[]
 *
 * 참고: 백엔드에 messageType 필드는 없음.
 *       mediaFiles에 AUDIO가 있으면 음성, 없으면 문자로 서버가 판단.
 */

/**
 * @typedef {Object} LifeMessageMediaDto
 * @property {string} originalFilename
 * @property {string} mediaType
 * @property {string} storageUrl
 * @property {number} size
 * @property {number|null} [durationMillis]
 * @property {string|null} [thumbnailUrl]
 * @property {number} [sortOrder]
 */

/**
 * @typedef {Object} LifeMessageCreatePayload
 * @property {number} happyinUserId  - 해피인 사용자 ID (필수)
 * @property {string} title
 * @property {string} content
 * @property {LifeMessageMediaDto[]} [mediaFiles]
 */

export function useLifeMessageCreate({
  endpoint = "/admin/messages/life",
} = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLifeMessage = useCallback(
    /** @param {LifeMessageCreatePayload} payload */
    async (payload) => {
      setLoading(true);
      setError(null);

      try {
        // ✅ 최소 유효성 (프론트 보호)
        if (!payload?.happyinUserId) throw new Error("해피인을 선택해주세요.");
        if (!payload?.title?.trim()) throw new Error("제목은 필수입니다.");
        if (!payload?.content?.trim()) throw new Error("내용은 필수입니다.");

        const res = await axiosInstance.post(endpoint, payload);
        return res.data; // { id: 생성된 ID }
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [endpoint],
  );

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return { createLifeMessage, loading, error, reset };
}
