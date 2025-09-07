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

    if (error.response?.status === 401 && authStore.refreshToken) {
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

        error.config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        return api(error.config);
      } catch (err) {
        authStore.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
