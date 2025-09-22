// useSchool.js

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { EDU_OFFICES, getSupportOffices } from "../utils/eduSupportData";

/**
 * 학교 통계 전용 훅
 */
export function useSchoolStats() {
  const [schoolStats, setSchoolStats] = useState({
    totalCount: 0,
    elementaryCount: 0,
    middleCount: 0,
    highCount: 0,
  });
  const [memberSchoolStats, setMemberSchoolStats] = useState({
    totalCount: 0,
    elementaryCount: 0,
    middleCount: 0,
    highCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const refetch = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    axiosInstance
      .get("/api/system/schools/overview", {
        params: { page: 0, size: 1 },
        signal: controller.signal,
      })
      .then((res) => {
        const d = res?.data ?? {};
        setSchoolStats(d.schoolStats ?? {});
        setMemberSchoolStats(d.memberSchoolStats ?? {});
      })
      .catch((e) => {
        if (e.name !== "CanceledError" && e.code !== "ERR_CANCELED") {
          setError(e);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
    return () => abortRef.current?.abort();
  }, [refetch]);

  return { schoolStats, memberSchoolStats, loading, error, refetch };
}

/* *********************************************************************************** */

/** 공백/빈값 제거 */
const clean = (obj) => {
  const o = { ...obj };
  Object.keys(o).forEach((k) => {
    if (o[k] === "" || o[k] === null || o[k] === undefined) delete o[k];
  });
  return o;
};

/** 간단 디바운스 훅 (내장) */
function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

/**
 * 학교 테이블 전용 훅
 */
export function useSchoolList(options = {}) {
  // 필터
  const [filters, setFilters] = useState({
    schoolType: options.schoolType ?? "", // ELEMENTARY | MIDDLE | HIGH | ""
    province: options.province ?? "", // '경상북도' 같은 라벨 | ""
    keyword: options.keyword ?? "", // 학교명
  });
  const debouncedKeyword = useDebouncedValue(filters.keyword, 250);

  // 페이지/정렬
  const [page, setPage] = useState(options.initialPage ?? 1); // 1-base
  const [size, setSize] = useState(options.initialSize ?? 10);
  const [sort, setSort] = useState(
    options.initialSort ?? { key: "name", dir: "asc" }
  );

  // 데이터
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const params = useMemo(() => {
    return clean({
      schoolType: filters.schoolType || undefined,
      province: filters.province || undefined, // 라벨 그대로 전달
      keyword: debouncedKeyword || undefined,
      page: Math.max(0, page - 1), // 서버 0-base
      size,
      sort: sort?.key ? `${sort.key},${sort.dir || "asc"}` : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.schoolType,
    filters.province,
    debouncedKeyword,
    page,
    size,
    sort,
  ]);

  useEffect(() => {
    setPage(1);
  }, [filters.schoolType, filters.province, sort.key, sort.dir]);

  const refetch = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    axiosInstance
      .get("/api/system/schools/overview", {
        params,
        signal: controller.signal,
      })
      .then((res) => {
        const pageObj = res?.data?.schoolPage ?? {};
        const content = Array.isArray(pageObj.content) ? pageObj.content : [];
        const mapped = content.filter(Boolean).map((it) => ({
          id: it.id,
          schoolType: it.schoolType,
          name: it.name,
          phoneNumber: it.phoneNumber,
          address: it.address,
          province: it.province,
          memberCount: it.memberCount,
        }));

        setRows(mapped);
        setTotalPages(pageObj.totalPages ?? 1);
        setTotalElements(pageObj.totalElements ?? mapped.length);
        // 서버 number(0-base) 기준으로 페이지 동기화하고 싶다면 주석 해제
        // setPage((pageObj.number ?? 0) + 1);
      })
      .catch((e) => {
        if (e.name !== "CanceledError" && e.code !== "ERR_CANCELED") {
          setError(e);
        }
      })
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    refetch();
    return () => abortRef.current?.abort();
  }, [refetch]);

  return {
    // 데이터
    rows,
    totalPages,
    totalElements,
    loading,
    error,

    // 제어기
    filters,
    setFilters,
    page,
    setPage,
    size,
    setSize,
    sort,
    setSort,

    // 수동 갱신
    refetch,
  };
}

/* *********************************************************************************** */

/** value → label 변환 */
const toEduOfficeLabel = (value) =>
  EDU_OFFICES.find((o) => o.value === value)?.label ?? value;

const toSupportOfficeLabel = (eduValue, supportValue) =>
  getSupportOffices(eduValue).find((o) => o.value === supportValue)?.label ??
  supportValue;

/** 폼 → API 페이로드 (Swagger 스키마) */
export const buildSchoolPayload = (form) => ({
  name: form.schoolName?.trim(),
  phoneNumber: form.phone?.trim(),
  address: form.address?.trim(),
  province: form.region, // 라벨(예: "경상북도")
  cityOffice: toEduOfficeLabel(form.eduOffice), // 라벨(예: "경상북도교육청")
  districtOffice: toSupportOfficeLabel(form.eduOffice, form.supportOffice), // 라벨(예: "구미교육지원청")
  // mapx/mapy 제외
});

/** 학교 등록 API 훅 */
export function useCreateSchool() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSchool = async (form) => {
    setLoading(true);
    setError(null);
    try {
      const payload = buildSchoolPayload(form);
      const res = await axiosInstance.post("/api/system/schools", payload);
      return res.data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { createSchool, loading, error };
}

/* *********************************************************************************** */

/** 학교명 검색 */
export async function searchSchools(keyword, limit = 20) {
  if (!keyword?.trim()) return [];
  const { data } = await axiosInstance.get("/api/system/schools/search", {
    params: { keyword, limit },
  });
  return Array.isArray(data) ? data : [];
}

/** 학교 상세(선생 목록, 현재 PIN 포함) */
export async function getSchoolDetail(schoolId) {
  const { data } = await axiosInstance.get(
    `/api/system/schools/${schoolId}/detail`
  );
  return data;
}

/** 6자리 PIN 미리 생성(저장은 안 함) */
export async function previewPin() {
  const { data } = await axiosInstance.post("/api/system/schools/pin/preview");
  return data?.pinCode ?? "";
}

/** 회원학교 등록 */
export async function registerMemberSchool(schoolId, body) {
  const { data } = await axiosInstance.post(
    `/api/system/schools/${schoolId}/member-register`,
    body
  );
  return data;
}
