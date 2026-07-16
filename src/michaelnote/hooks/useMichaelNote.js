import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";

/**
 * 드림인 검색 + 미카엘 노트 목록 훅
 * GET /api/admin/michael-notes?q=닉네임&page=0&size=20&sort=createdAt,desc
 */
export function useMichaelNoteList() {
  const [query, setQuery] = useState(""); // 검색어 (닉네임/이름)
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1); // 1-base UI
  const [size] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // 한 번이라도 검색했는지
  const abortRef = useRef(null);

  const fetch = useCallback(
    (q, currentPage) => {
      if (!q?.trim()) return;

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      setSearched(true);

      axiosInstance
        .get("/admin/michael-notes", {
          params: {
            q: q.trim(),
            page: Math.max(0, currentPage - 1),
            size,
            sort: "createdAt,desc",
          },
          signal: controller.signal,
        })
        .then((res) => {
          const data = res?.data ?? {};
          const content = Array.isArray(data.content) ? data.content : [];
          setRows(content);
          setTotalPages(data.totalPages ?? 1);
          setTotalElements(data.totalElements ?? content.length);
        })
        .catch((e) => {
          if (e.name !== "CanceledError" && e.code !== "ERR_CANCELED") {
            setError(e);
          }
        })
        .finally(() => setLoading(false));
    },
    [size],
  );

  // 페이지 변경 시 재조회
  useEffect(() => {
    if (searched) fetch(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const search = (q) => {
    setQuery(q);
    setPage(1);
    fetch(q, 1);
  };

  return {
    rows,
    totalPages,
    totalElements,
    page,
    setPage,
    loading,
    error,
    searched,
    search,
  };
}

/**
 * 미카엘 노트 상세 훅
 * GET /api/admin/michael-notes/:noteId
 */
export function useMichaelNoteDetail(noteId, open) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !noteId) return;
    setDetail(null);
    setLoading(true);
    setError(null);

    axiosInstance
      .get(`/admin/michael-notes/${noteId}`)
      .then((res) => setDetail(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [open, noteId]);

  return { detail, loading, error };
}
