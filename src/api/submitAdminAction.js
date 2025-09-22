import axiosInstance from "../utils/axiosInstance";

/**
 * 행정 조치 API
 * @param {string} userId
 * @param {object} payload
 */
export const submitAdminAction = async (userId, payload) => {
  const res = await axiosInstance.post(`/admin/actions/${userId}`, payload);
  return res.data;
};
