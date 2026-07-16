import { useCallback, useState } from "react";

import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";
import { formatDateTime } from "../../utils/formatDate";

/**
 * 도움주신 분 관리 훅.
 * - 개발자/후원: /api/admin/contributors (CRUD)
 * - 해피인: /api/admin/helpers (스타 해피인, users 기반 — 읽기)
 */
const ENDPOINT = "/admin/contributors";
const HELPER_ENDPOINT = "/admin/helpers";

export const CATEGORY_LABEL = { DEVELOPER: "개발자", SPONSOR: "후원" };

function mapContributor(item) {
  return {
    id: item.id,
    category: item.category,
    categoryLabel: CATEGORY_LABEL[item.category] ?? item.category,
    imageUrl: item.imageUrl ?? "",
    name: item.name ?? "-",
    role: item.role ?? "-",
    content: item.content ?? "",
    createdAt: formatDateTime(item.createdAt) ?? "-",
    raw: item,
  };
}

function mapHelper(item) {
  return {
    id: item.userId,
    imageUrl: item.profileImage ?? "",
    name: item.name ?? item.nickname ?? "-",
    nickname: item.nickname ?? "-",
    role: "스타 해피인",
    content: item.greetingMessage ?? "",
    raw: item,
  };
}

/** 개발자/후원 목록 (contributor) */
export function useContributorList({ category = null, initialSize = 25 } = {}) {
  const list = usePaginatedList({
    endpoint: ENDPOINT,
    initialParams: category ? { category } : {},
    initialSort: { key: "createdAt", dir: "desc" },
    initialSize,
    mapItem: mapContributor,
  });
  return list;
}

/** 해피인 목록 (스타 해피인, 읽기 전용) */
export function useHelperList({ initialSize = 25 } = {}) {
  return usePaginatedList({
    endpoint: HELPER_ENDPOINT,
    initialSort: { key: "createdAt", dir: "desc" },
    initialSize,
    mapItem: mapHelper,
  });
}

/** 이미지 업로드 → storageUrl 반환 */
export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = useCallback(async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axiosInstance.post("/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data?.storageUrl ?? null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { uploadImage, uploading };
}

/** 등록/수정/삭제 (contributor) */
export function useContributorMutations() {
  const [saving, setSaving] = useState(false);

  const createContributor = useCallback(async (body) => {
    setSaving(true);
    try {
      const res = await axiosInstance.post(ENDPOINT, body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data; // { id }
    } finally {
      setSaving(false);
    }
  }, []);

  const updateContributor = useCallback(async (id, body) => {
    setSaving(true);
    try {
      const res = await axiosInstance.put(`${ENDPOINT}/${id}`, body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteContributor = useCallback(async (id) => {
    setSaving(true);
    try {
      await axiosInstance.delete(`${ENDPOINT}/${id}`);
    } finally {
      setSaving(false);
    }
  }, []);

  return { createContributor, updateContributor, deleteContributor, saving };
}
