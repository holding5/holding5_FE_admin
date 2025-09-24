// src/pages/hooks/useAdmin.js
import axiosInstance from "../../utils/axiosInstance";

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
