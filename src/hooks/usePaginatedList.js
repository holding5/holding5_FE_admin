import { useEffect, useMemo, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

/**
 * 공통 목록 조회 훅 (Spring Pageable 지원 + 배열 응답 지원)
 *
 * @param {object} options
 * @param {string} options.endpoint
 * @param {object} [options.initialParams]
 * @param {{ key: string, dir: "asc" | "desc" }} [options.initialSort]
 * @param {number} [options.initialPage=1]
 * @param {number} [options.initialSize=10]
 * @param {(item: any) => any} [options.mapItem]
 * @param {number} [options.debounceMs=250]
 * @param {boolean} [options.supportsPageParams=true]  // ✅ 기본값 유지(기존 화면 영향 없음)
 * @param {"page"|"auto"} [options.responseMode="page"] // ✅ 기본값 page (기존과 동일)
 */
export default function usePaginatedList({
  endpoint,
  initialParams = {},
  initialSort = { key: "createdAt", dir: "desc" },
  initialPage = 1,
  initialSize = 10,
  mapItem,
  debounceMs = 250,
  supportsPageParams = true,
  responseMode = "page",
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
    const p = { ...debouncedParams };

    if (supportsPageParams) {
      p.page = Math.max(0, page - 1); // 서버는 0부터
      p.size = size;
      if (sort?.key) p.sort = `${sort.key},${sort.dir || "asc"}`;
    } else {
      // 서버가 page/size 안 받는 경우 (정렬 쿼리를 받는다면 initialParams로 넣어 사용)
      if (sort?.key) p.sort = `${sort.key},${sort.dir || "asc"}`;
    }

    if (p.q === "") delete p.q; // 빈 문자열 제거
    return p;
  }, [debouncedParams, page, size, sort, supportsPageParams]);

  const fetchList = async () => {
    if (!endpoint) return;
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

      let content = [];
      let total = 0;
      let pages = 1;

      // ✅ 배열 응답도 지원 (ex. /admin/reports/users/{id}/contents)
      if (responseMode === "auto" && Array.isArray(res?.data)) {
        content = res.data;
        total = content.length;

        // ✅ 클라이언트 페이징 (서버가 page/size 없을 때)
        if (!supportsPageParams) {
          pages = Math.max(1, Math.ceil(total / size));
          const start = (Math.max(1, page) - 1) * size;
          const end = start + size;
          content = content.slice(start, end);
        } else {
          pages = 1;
        }
      } else {
        // 기존 Spring Page 응답
        content = res?.data?.content ?? [];
        total = res?.data?.totalElements ?? content.length;
        pages = res?.data?.totalPages ?? 1;
      }

      const mapped = mapItem ? content.map(mapItem) : content;

      setRows(mapped);
      setTotalElements(total);
      setTotalPages(pages);
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
    // supportsPageParams=false일 때도 page/size 바뀌면 다시 슬라이싱해야 하므로 deps에 포함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, axiosParams, supportsPageParams, page, size]);

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

/** 디바운스 유틸 */
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
