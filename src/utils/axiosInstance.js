// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ── 유틸: 취소 여부 체크
function isCanceled(error) {
  return (
    axios.isCancel?.(error) ||
    error?.code === "ERR_CANCELED" ||
    error?.name === "CanceledError" ||
    /canceled|aborted/i.test(error?.message || "")
  );
}

// ── 요청 인터셉터 (요청 로그 + 시간 측정)
axiosInstance.interceptors.request.use((config) => {
  config.meta = { startedAt: Date.now() };
  const { method, url, params, data } = config;
  console.log(
    "[REQ]",
    (method || "GET").toUpperCase(),
    url,
    params ?? {},
    data ?? {}
  );
  return config;
});

// ── 응답 인터셉터 (성공/실패 로깅)
axiosInstance.interceptors.response.use(
  (res) => {
    const took = res.config?.meta?.startedAt
      ? `${Date.now() - res.config.meta.startedAt}ms`
      : "";
    console.log("[RES]", res.status, res.config?.url, took, res.data);
    return res;
  },
  (err) => {
    // ✅ 취소된 요청은 에러로 찍지 않음
    if (isCanceled(err)) {
      // 필요하면 아래처럼 디버그만 찍기
      // console.debug("[CANCELED]", err.config?.url);
      return Promise.reject(err);
    }

    // ✅ 안전한 로깅(네트워크 에러 등 response 없음 대비)
    const status = err.response?.status ?? "NO_RESPONSE";
    const url = err.config?.url ?? "UNKNOWN_URL";
    const method = (err.config?.method || "GET").toUpperCase();
    const message = err.message || "Unknown error";

    // data가 너무 크면 콘솔이 지저분해질 수 있으니 일부만 미리보기
    let payload = err.response?.data;
    try {
      if (typeof payload === "string" && payload.length > 500) {
        payload = payload.slice(0, 500) + "…(truncated)";
      }
    } catch {
      /* noop */
    }

    console.error("[ERR]", status, method, url, message, payload);
    return Promise.reject(err);
  }
);

export default axiosInstance;
