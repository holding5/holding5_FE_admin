import axiosInstance from "../utils/axiosInstance";

/**
 * 관리자 → 유저 알림 발송.
 * 대상(ALL/DREAMIN/HAPPYIN) 또는 개별 userIds 에게 앱 알림함 + FCM 푸시를 전송한다.
 * baseURL 에 /api 가 포함되어 있으므로 경로는 /admin/... 으로 호출한다.
 *
 * @param {{ title?: string, body: string, audience?: string, userIds?: Array<number|string> }} payload
 * @returns {Promise<{ targetCount: number, pushSent: number }>}
 */
export const sendAdminNotification = async ({ title, body, audience, userIds }) => {
  const res = await axiosInstance.post("/admin/notifications/send", {
    title: (title && title.trim()) || "홀딩파이브 알림",
    body,
    audience: audience || "ALL",
    userIds:
      Array.isArray(userIds) && userIds.length > 0
        ? userIds.map((v) => Number(v)).filter((n) => !Number.isNaN(n))
        : null,
  });
  return res.data;
};

/** FE 필터의 audience 값(dreamin/happin/both)을 백엔드 enum(DREAMIN/HAPPYIN/ALL)으로 변환. */
export const mapAudience = (audience) => {
  switch ((audience || "").toLowerCase()) {
    case "dreamin":
      return "DREAMIN";
    case "happin":
    case "happyin":
      return "HAPPYIN";
    default:
      return "ALL"; // both/기타
  }
};
