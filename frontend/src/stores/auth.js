// src/stores/auth.js
import { defineStore } from "pinia";
import { login } from "../services/auth.service";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

  actions: {
    async loginUser(email, contrasena) {
      const toast = useToast();
      try {
        const data = await login(email, contrasena);

        this.user = data.user;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.isAuthenticated = true;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: this.user,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
          })
        );

        toast.success("Bienvenido " + this.user.nombre);
      } catch (error) {
        toast.error(error.response?.data?.error || "Error al iniciar sesión");
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      localStorage.removeItem("auth");
    },

    loadFromStorage() {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsed = JSON.parse(data);
        this.user = parsed.user;
        this.accessToken = parsed.accessToken;
        this.refreshToken = parsed.refreshToken;
        this.isAuthenticated = true;
      }
    },
  },
});
