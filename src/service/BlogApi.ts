import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "http://localhost:3500/api",
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
