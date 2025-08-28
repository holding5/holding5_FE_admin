// src/hooks/usePaginatedList.js
import { useEffect, useMemo, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

/**
 * 공통 목록 조회 훅 (Spring Pageable 지원)
 * 
 * @param {object} options
 * @param {string} options.endpoint               - API 경로 (예: "/admin/member/dreamins")
 * @param {object} [options.initialParams]        - 기본 필터 값
 * @param {{ key: string, dir: "asc" | "desc" }} [options.initialSort] - 정렬 기준
 * @param {number} [options.initialPage=1]        - 초기 페이지 (1부터 시작)
 * @param {number} [options.initialSize=10]       - 페이지당 개수
 * @param {(item: any) => any} [options.mapItem]  - 행 데이터 변환 함수
 * @param {number} [options.debounceMs=250]       - 검색어 디바운스 지연
 */
export default function usePaginatedList({
  endpoint,
  initialParams = {},
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 10,
  mapItem,
  debounceMs = 250,
}) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState(initialSort);
  const [params, setParams] = useState(initialParams);

  const [rows, setRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedParams = useDebouncedValue(params, debounceMs);
  const abortRef = useRef();

  const axiosParams = useMemo(() => {
    const p = {
      ...debouncedParams,
      page: Math.max(0, page - 1), // 서버는 0부터 시작
      size,
    };
    if (p.q === "") {
      delete p.q; // ✅ 빈 문자열이면 제거
    }
    if (sort?.key) {
      p.sort = `${sort.key},${sort.dir || "asc"}`;
    }
    return p;
  }, [debouncedParams, page, size, sort]);

  const fetchList = async () => {
    setLoading(true);
    setError(null);

    // 이전 요청 취소
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await axiosInstance.get(endpoint, {
        params: axiosParams,
        signal: controller.signal,
      });

      const content = res?.data?.content ?? [];
      const mapped = mapItem ? content.map(mapItem) : content;

      setRows(mapped);
      setTotalElements(res?.data?.totalElements ?? mapped.length);
      setTotalPages(res?.data?.totalPages ?? 1);
    } catch (e) {
      if (e.name !== "CanceledError" && e.code !== "ERR_CANCELED") {
        console.error("목록 조회 실패:", e);
        setError(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, axiosParams]);

  return {
    rows,
    totalElements,
    totalPages,
    loading,
    error,
    page,
    setPage,
    size,
    setSize,
    sort,
    setSort,
    params,
    setParams,
    refetch: fetchList,
  };
}

/**
 * 디바운스 유틸 훅
 */
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
