import { useCallback, useState } from "react";

import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";

/**
 * 운영자에게 건의하기 관리자 연동 훅.
 * 백엔드: /api/admin/suggestions (목록/상세/답변/삭제)
 */
const ENDPOINT = "/admin/suggestions";

/** 건의 유형 → 한글 라벨 */
export const TYPE_TO_LABEL = {
  APP_INQUIRY: "앱 문의",
  INSTITUTION_REQUEST: "기관 신청",
};

/** 처리여부 탭 값 → handled 파라미터 */
export const HANDLED_TAB_TO_VALUE = {
  all: null,
  pending: false,
  done: true,
};

/** 목록 응답 → 테이블 row 매핑 */
function defaultMapItem(item) {
  return {
    id: item.id,
    type: item.type,
    typeLabel: TYPE_TO_LABEL[item.type] ?? item.type ?? "-",
    title: item.title ?? "-",
    contact: item.contact ?? "-",
    institutionName: item.institutionName ?? "-",
    authorName: item.authorName ?? "-",
    handled: item.handled,
    handledLabel: item.handled ? "처리완료" : "대기",
    createdAt: formatDateTime(item.createdAt) ?? "-",
    raw: item,
  };
}

/**
 * 건의 목록 조회 훅 (Spring Pageable)
 * 백엔드 쿼리: type(선택), handled(선택), page, size, sort
 */
export default function useSuggestions({
  initialType = null,
  initialHandled = null,
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 25,
  mapItem = defaultMapItem,
} = {}) {
  const initialParams = {};
  if (initialType) initialParams.type = initialType;
  if (initialHandled === true || initialHandled === false) {
    initialParams.handled = initialHandled;
  }

  const list = usePaginatedList({
    endpoint: ENDPOINT,
    initialParams,
    initialSort,
    initialPage,
    initialSize,
    mapItem,
  });

  const setType = (type) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      if (type) next.type = type;
      else delete next.type;
      return next;
    });
  };

  const setHandled = (handled) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      if (handled === true || handled === false) next.handled = handled;
      else delete next.handled;
      return next;
    });
  };

  const setSortByTableKey = (tableKey, dir = "asc") => {
    list.setSort({ key: tableKey, dir });
  };

  /** 제목/내용 검색어 설정 */
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

  return { ...list, setType, setHandled, setQuery, setSortByTableKey };
}

/** 상세 조회 (GET /{id}) — content/연락처/첨부/답변 포함 */
export function useSuggestionDetail() {
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

/** 답변 등록/수정 (PATCH /{id}/answer) — body: { answer } */
export function useSuggestionAnswer() {
  const [saving, setSaving] = useState(false);

  const submitAnswer = useCallback(async (id, answer) => {
    setSaving(true);
    try {
      const res = await axiosInstance.patch(
        `${ENDPOINT}/${id}/answer`,
        { answer },
        { headers: { "Content-Type": "application/json" } },
      );
      return res.data;
    } finally {
      setSaving(false);
    }
  }, []);

  return { submitAnswer, saving };
}

/** 삭제 (DELETE /{id}) */
export function useSuggestionDelete() {
  const [deleting, setDeleting] = useState(false);

  const removeSuggestion = useCallback(async (id) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`${ENDPOINT}/${id}`);
    } finally {
      setDeleting(false);
    }
  }, []);

  return { removeSuggestion, deleting };
}
