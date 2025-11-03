import axios from "axios";
import authApi from "../api/authApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
let setLoadingRef;

export const setLoadingHandler = (fn) => {
  setLoadingRef = fn;
};

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ⚠️ cookie sẽ được gửi đi
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor request: gán mặc định _retry = false, bật loading
axiosClient.interceptors.request.use(
  (config) => {
    if (setLoadingRef) setLoadingRef(true);

    if (config._retry === undefined) {
      config._retry = false;
    }
    return config;
  },
   (error) => {
    if (setLoadingRef) setLoadingRef(false);
    return Promise.reject(error);
  }
);

// 🧠 Interceptor response: xử lý khi accessToken hết hạn, tắt loading
axiosClient.interceptors.response.use(
  (response) => {
    if (setLoadingRef) setLoadingRef(false);
    return response;
  },
  async (error) => {
    if (setLoadingRef) setLoadingRef(false);

    const originalRequest = error.config;

    // 🚫 Bỏ qua interceptor cho request refresh token để tránh loop
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    // Nếu lỗi là 403 hoặc 401 và chưa retry lần nào
    if ([401, 403].includes(error?.response?.status) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token (cookie vẫn được gửi do withCredentials)
        const res = await authApi.refresh();
        const newAccessToken = res.data?.accessToken;
        if (!newAccessToken) throw new Error("Không có accessToken mới");

        // Gửi lại request cũ
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("⚠️ Refresh token thất bại:", refreshError);
        await authApi.logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
