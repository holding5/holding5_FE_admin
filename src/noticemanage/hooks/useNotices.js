import { useCallback, useState } from "react";

import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";

/** 공지사항 관리자 연동 훅. 백엔드: /api/admin/notices */
const ENDPOINT = "/admin/notices";

export const AUDIENCE_LABEL = { ALL: "전체", DREAMIN: "드림인", HAPPYIN: "해피인" };
export const HAPPYIN_TYPE_LABEL = { ALL: "전체", OPINION: "오피니언", GENERAL: "일반", PEER: "또래" };

function mapItem(item) {
  return {
    id: item.id,
    title: item.title ?? "-",
    content: item.content ?? "",
    audience: item.audience,
    audienceLabel: AUDIENCE_LABEL[item.audience] ?? item.audience ?? "-",
    fileNames: item.fileNames ?? [],
    fileLabel: item.fileNames?.length ? item.fileNames.join(", ") : "-",
    authorName: item.authorName ?? "-",
    createdAt: formatDateTime(item.createdAt) ?? "-",
    raw: item,
  };
}

/** 공지 목록 조회 (검색·대상 필터 지원) */
export function useNoticeList({ initialSize = 25 } = {}) {
  const list = usePaginatedList({
    endpoint: ENDPOINT,
    initialSort: { key: "createdAt", dir: "desc" },
    initialSize,
    mapItem,
  });

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

  /** 대상(audience) 필터 설정 (빈값이면 전체) */
  const setAudience = (audience) => {
    list.setPage(1);
    list.setParams((prev) => {
      const next = { ...prev };
      if (audience) next.audience = audience;
      else delete next.audience;
      return next;
    });
  };

  return { ...list, setQuery, setAudience };
}

/** 상세 조회 (GET /{id}) — 타겟팅·첨부 포함 */
export function useNoticeDetail() {
  const [loading, setLoading] = useState(false);
  const fetchDetail = useCallback(async (id) => {
    if (!id) return null;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);
  return { fetchDetail, loading };
}

/** 등록/수정/삭제 */
export function useNoticeMutations() {
  const [saving, setSaving] = useState(false);

  const createNotice = useCallback(async (body) => {
    setSaving(true);
    try {
      const res = await axiosInstance.post(ENDPOINT, body, { headers: { "Content-Type": "application/json" } });
      return res.data;
    } finally { setSaving(false); }
  }, []);

  const updateNotice = useCallback(async (id, body) => {
    setSaving(true);
    try {
      const res = await axiosInstance.put(`${ENDPOINT}/${id}`, body, { headers: { "Content-Type": "application/json" } });
      return res.data;
    } finally { setSaving(false); }
  }, []);

  const deleteNotice = useCallback(async (id) => {
    setSaving(true);
    try {
      await axiosInstance.delete(`${ENDPOINT}/${id}`);
    } finally { setSaving(false); }
  }, []);

  return { createNotice, updateNotice, deleteNotice, saving };
}

/** 첨부파일 업로드 → 서버 메타 반환 */
export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const uploadFile = useCallback(async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axiosInstance.post("/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // { storageUrl, originalFilename, mediaType, size }
    } finally { setUploading(false); }
  }, []);
  return { uploadFile, uploading };
}
