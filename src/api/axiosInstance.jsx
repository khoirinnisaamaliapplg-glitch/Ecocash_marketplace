import axios from "axios";

// Ekstraksi Base URL dari Environment Variable untuk fleksibilitas deployment
const baseURL = import.meta.env.VITE_API_URL || "https://api.ecocash.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Timeout 10 detik mencegah request menggantung
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor Request: Otomatis menyuntikkan JWT Token jika tersedia
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecocash_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor Response: Penanganan error global (misal: Token Kedaluwarsa)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logika pembersihan state jika token tidak valid/kedaluwarsa
      localStorage.removeItem("ecocash_token");
      localStorage.removeItem("ecocash_role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
