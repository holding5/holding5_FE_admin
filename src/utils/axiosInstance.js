import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 세션 기반 인증(Cookie) 사용 시 필요
});

export default axiosInstance;
