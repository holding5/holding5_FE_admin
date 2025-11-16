// src/pages/hooks/useAdmin.js
import axiosInstance from "../../utils/axiosInstance";
import usePaginatedList from "../../hooks/usePaginatedList";

/** 시스템 관리자 목록 훅 */
export default function useAdmins(options = {}) {
  return usePaginatedList({
    endpoint: "/api/system/admins",
    initialParams: { onlyActive: true, ...(options.initialParams ?? {}) },
    initialSort: options.initialSort ?? { key: "createdAt", dir: "desc" },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 10,
    mapItem: (it) => ({
      id: it.id,
      name: it.name,
      email: it.email,
      phoneNumber: it.phoneNumber,
    }),
  });
}

/**
 * 드림인 검색
 * @param {string} q - 검색어
 * @param {{page?: number, size?: number, sort?: string}} opts
 * @returns {Promise<Array<{id,name,email,phoneNumber,raw}>>}
 */
export async function searchDreamins(q, opts = {}) {
  const { page = 0, size = 20, sort = "createdAt,desc" } = opts;

  const res = await axiosInstance.get("/admin/member/dreamins", {
    params: { q, page, size, sort },
  });

  const list = res?.data?.content ?? res?.data ?? [];
  return list.map((x) => ({
    id: x.id ?? x.userId,
    name: x.name ?? x.userName ?? x.nickname,
    email: x.email ?? x.id ?? x.loginId,
    phoneNumber: x.phoneNumber ?? x.phone,
    raw: x,
  }));
}

/**
 * 관리자 등록/수정 (upsert)
 * - id 없으면 신규, 있으면 수정
 * - password는 값이 있을 때만 전송(값 없을 땐 비번 미변경)
 * - actionType: null | 'RELEASE' | 'SUSPEND'
 *   - RELEASE  → revokeAdmin=true  (관리자 권한 해제)
 *   - SUSPEND  → suspend=true      (관리자 정지)
 */
export async function saveAdmin(form, actionType = null) {
  const {
    id,
    name,
    email,
    phoneNumber,
    password, // 선택적 전송
  } = form ?? {};

  const payload = {
    id, // undefined면 자동으로 빠짐
    name,
    email,
    phoneNumber,
    // 비밀번호는 값이 있을 때만 포함
    ...(password ? { password } : {}),
    // 두 플래그는 동시 true가 되지 않게 단일 매핑
    revokeAdmin: actionType === "RELEASE",
    suspend: actionType === "SUSPEND",
  };

  // 불필요한 빈 문자열 제거(백이 validation 엄격할 때 대비)
  Object.keys(payload).forEach((k) => {
    if (payload[k] === "") delete payload[k];
  });

  const { data } = await axiosInstance.post("/api/system/admins/save", payload);
  return data; // 서버가 저장된 엔티티나 응답 메시지를 내려줄 것
}
