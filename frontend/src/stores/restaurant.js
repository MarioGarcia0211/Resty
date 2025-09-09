// src/stores/restaurant.js
import { defineStore } from "pinia";
import * as restaurantService from "../services/restaurant.service";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurantes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRestaurantes() {
      this.loading = true;
      try {
        const res = await restaurantService.listarRestaurantes();
        this.restaurantes = res.data;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Error al cargar restaurantes";
      } finally {
        this.loading = false;
      }
    },

    async crearRestaurante(data) {
      const res = await restaurantService.crearRestaurante(data);
      this.restaurantes.push(res.data);
    },

    async actualizarRestaurante(id, data) {
      const res = await restaurantService.actualizarRestaurante(id, data);
      const index = this.restaurantes.findIndex((r) => r._id === id);
      if (index !== -1) this.restaurantes[index] = res.data;
    },

    async eliminarRestaurante(id) {
      await restaurantService.eliminarRestaurante(id);
      this.restaurantes = this.restaurantes.filter((r) => r._id !== id);
    },
  },
});
