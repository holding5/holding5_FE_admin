import { useCallback, useEffect, useState } from "react";

import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";

/**
 * 축하/시험격려 메시지 관리자 연동 훅.
 * 백엔드: /api/admin/celebration-messages (목록/상세/등록/수정/삭제)
 * - 목록 응답 CelebrationAdminDto: { id, type, title, content, authorName, createdAt }
 */
const ENDPOINT = "/admin/celebration-messages";

/** UI 탭 값 → 백엔드 CelebrationType (all=전체) */
export const TAB_TO_TYPE = {
  all: null,
  accession: "SIGNUP",
  birth: "BIRTHDAY",
  test: "EXAM",
};

/** 분류 드롭다운 한글 → CelebrationType */
export const CLASS_LABEL_TO_TYPE = {
  전체: null,
  가입환영: "SIGNUP",
  생일축하: "BIRTHDAY",
  시험격려: "EXAM",
};

/** CelebrationType → 분류 한글 라벨 (8종) */
export const TYPE_TO_LABEL = {
  SIGNUP: "가입환영",
  BIRTHDAY: "생일축하",
  EXAM: "시험격려",
  COMING_OF_AGE: "성년축하",
  CHUSEOK: "추석인사",
  CHRISTMAS: "크리스마스",
  NEW_YEAR: "새해인사",
  SEOLLAL: "설날인사",
};

/** 목록 응답 → 테이블 row 매핑 */
function defaultMapItem(item) {
  return {
    id: item.id,
    classification: TYPE_TO_LABEL[item.type] ?? item.type ?? "-",
    religion: "-", // 축하 메시지엔 종교 필드가 없음(표시용 placeholder)
    title: item.title ?? "-",
    content: item.content ?? "-",
    file: "-", // 목록 응답엔 첨부 없음(상세에서 조회)
    status: item.status,
    statusLabel: item.status === "DEACTIVATED" ? "삭제" : "활성화",
    date: formatDateTime(item.createdAt) ?? "-",
    createdAt: formatDateTime(item.createdAt) ?? "-",
    nickName: item.authorName ?? "-",
    raw: item,
  };
}

/**
 * 축하메시지 목록 조회 훅 (Spring Pageable)
 * 백엔드 쿼리: type(선택, 미지정 시 전체), page, size, sort
 */
export default function useCelebrationMessages({
  initialType = null,
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 25,
  mapItem = defaultMapItem,
} = {}) {
  const list = usePaginatedList({
    endpoint: ENDPOINT,
    initialParams: initialType ? { type: initialType } : {},
    initialSort,
    initialPage,
    initialSize,
    mapItem,
  });

  /** 유형 필터 설정 (null이면 전체) */
  const setType = (type) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      if (type) next.type = type;
      else delete next.type;
      return next;
    });
  };

  const setSortByTableKey = (tableKey, dir = "asc") => {
    list.setSort({ key: tableKey, dir });
  };

  /** 제목/내용 검색어 설정 (빈값이면 제거) */
  const setQuery = (keyword) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      const kw = (keyword ?? "").trim();
      if (kw) next.keyword = kw;
      else delete next.keyword;
      return next;
    });
  };

  return {
    ...list, // rows, totalElements, totalPages, page, setPage, size, setSize, params, setParams, loading, error, refetch, setSort
    setType,
    setQuery,
    setSortByTableKey,
  };
}

/**
 * 유형별 건수 통계 (전체/가입환영/생일축하/시험격려).
 * 별도 통계 엔드포인트가 없어 유형별 목록의 totalElements를 조회한다.
 */
export function useCelebrationCounts() {
  const [counts, setCounts] = useState({ all: 0, signup: 0, birthday: 0, exam: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const total = (type) =>
      axiosInstance
        .get(ENDPOINT, { params: { size: 1, ...(type ? { type } : {}) } })
        .then((r) => r.data?.totalElements ?? 0)
        .catch(() => 0);
    try {
      const [all, signup, birthday, exam] = await Promise.all([
        total(null),
        total("SIGNUP"),
        total("BIRTHDAY"),
        total("EXAM"),
      ]);
      setCounts({ all, signup, birthday, exam });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return { counts, countsLoading: loading, countsError: error, refetchCounts: fetchCounts };
}

/** 상세 조회 (GET /{id}) */
export function useCelebrationDetail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async (id) => {
    if (!id) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
      return res.data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchDetail, loading, error };
}

/** 등록 (POST) — body: { type, happyinUserId, title, content, mediaFiles? } */
export function useCelebrationCreate() {
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const createCelebration = useCallback(async (body) => {
    setCreating(true);
    setCreateError(null);
    try {
      const res = await axiosInstance.post(ENDPOINT, body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data; // { id }
    } catch (e) {
      setCreateError(e);
      throw e;
    } finally {
      setCreating(false);
    }
  }, []);

  return { createCelebration, creating, createError };
}

/** 수정 (PUT /{id}) — body: { type?, title?, content? } */
export function useCelebrationUpdate() {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateCelebration = useCallback(async (id, body) => {
    setUpdating(true);
    setUpdateError(null);
    try {
      const res = await axiosInstance.put(`${ENDPOINT}/${id}`, body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (e) {
      setUpdateError(e);
      throw e;
    } finally {
      setUpdating(false);
    }
  }, []);

  return { updateCelebration, updating, updateError };
}

/** 삭제 (DELETE /{id}) */
export function useCelebrationDelete() {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteCelebration = useCallback(async (id) => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await axiosInstance.delete(`${ENDPOINT}/${id}`);
    } catch (e) {
      setDeleteError(e);
      throw e;
    } finally {
      setDeleting(false);
    }
  }, []);

  return { deleteCelebration, deleting, deleteError };
}
