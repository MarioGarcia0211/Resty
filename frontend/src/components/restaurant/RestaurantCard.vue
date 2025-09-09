<template>
  <div class="card restaurant-card shadow-sm h-100 d-flex flex-column">
    <!-- Imagen / Logo -->
    <div class="image-cap">
      <img
        v-if="restaurant.logo_url"
        :src="restaurant.logo_url"
        class="logo-thumbnail"
        alt="Logo"
      />
      <div
        v-else
        class="no-logo d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-shop text-muted fs-2"></i>
      </div>
    </div>

    <!-- Contenido -->
    <div class="card-body d-flex flex-column h-100 text-center">
      <h5 class="restaurant-name mb-2">
        {{ restaurant.nombre || "Sin nombre" }}
      </h5>

      <p class="info-text">
        <i class="bi bi-geo-alt-fill text-primary me-1"></i>
        {{ restaurant.direccion || "Sin dirección" }}
      </p>
      <p class="info-text mb-3">
        <i class="bi bi-telephone-fill text-success me-1"></i>
        {{ formatPhone(restaurant.telefono) || "Sin teléfono" }}
      </p>

      <!-- Botones -->
      <div class="mt-auto d-flex justify-content-center gap-2">
        <button
          class="btn btn-warning btn-sm px-3 rounded-pill"
          @click="$emit('edit', restaurant)"
        >
          <i class="bi bi-pencil-square me-1"></i> Editar
        </button>
        <button
          class="btn btn-danger btn-sm px-3 rounded-pill"
          @click="$emit('delete', restaurant._id)"
        >
          <i class="bi bi-trash me-1"></i> Eliminar
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="card-footer footer-text">
      <small>
        <i class="bi bi-calendar-event me-1 text-muted"></i>
        {{ formatDateTime(restaurant.createdAt) }}
      </small>
    </div>
  </div>
</template>

<script setup>
import { formatDateTime, formatPhone } from "../../utils/format";
defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.restaurant-card {
  border: none;
  border-radius: 0.8rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: #fff;
  overflow: hidden;
}

/* Hover card */
.restaurant-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

/* Encabezado con degradado */
.image-cap {
  margin: 0;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-accent)
  );
}

/* Imagen / Logo */
.logo-thumbnail,
.no-logo {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #fafafa;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

/* Hover zoom en la imagen */
.logo-thumbnail:hover,
.no-logo:hover {
  transform: scale(1.1);
}

/* Nombre */
.restaurant-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-top: 10px;
}

/* Info */
.info-text {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
}

/* Footer */
.footer-text {
  background: #fff;
  border-top: 1px solid #f1f1f1;
  text-align: center;
  color: #888;
  font-size: 0.8rem;
}
</style>
