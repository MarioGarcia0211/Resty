// src/services/axios.js
import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // Ajusta al backend
});

// Añadir token a cada request
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

// Refrescar token si expira
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const authStore = useAuthStore();

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("http://localhost:4000/api/auth/refresh", {
          refreshToken: authStore.refreshToken,
        });

        authStore.accessToken = res.data.accessToken;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: authStore.user,
            accessToken: authStore.accessToken,
            refreshToken: authStore.refreshToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        authStore.logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
