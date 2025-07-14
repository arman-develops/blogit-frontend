import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "https://blog-it-backend-j3e2.onrender.com/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore.getState().token || localStorage.getItem("auth_storage");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
