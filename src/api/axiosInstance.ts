import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000, // Tự động hủy yêu cầu sau 10 giây neu không có phản hồi
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercept thêm token vào header nếu có
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept xử lý lỗi chung
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
