import { defineStore } from "pinia";
import * as restaurantService from "../services/restaurant.service";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurantes: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    search: "",
  }),
  actions: {
    async fetchRestaurantes(page = this.page, search = this.search) {
      this.loading = true;
      try {
        const res = await restaurantService.listarRestaurantes(
          page,
          this.limit,
          search
        );
        this.restaurantes = res.data.data;
        this.total = res.data.total;
        this.totalPages = res.data.totalPages;
        this.page = res.data.page;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Error al cargar restaurantes";
      } finally {
        this.loading = false;
      }
    },

    async crearRestaurante(data) {
      const res = await restaurantService.crearRestaurante(data);
      this.fetchRestaurantes();
    },

    async actualizarRestaurante(id, data) {
      await restaurantService.actualizarRestaurante(id, data);
      this.fetchRestaurantes(this.page, this.search);
    },

    async eliminarRestaurante(id) {
      await restaurantService.eliminarRestaurante(id);
      this.fetchRestaurantes(this.page, this.search);
    },
  },
});
