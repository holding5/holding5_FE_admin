// src/api/releaseBannedUsers.js
import axiosInstance from "../utils/axiosInstance";

/**
 * 영구퇴출 해제 요청 (POST)
 * @param {number[]} userIds - 해제할 userId 배열
 */
export default async function releaseBannedUsers(userIds) {
  const res = await axiosInstance.post("/admin/member/banned/release", userIds);
  return res;
}
