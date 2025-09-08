<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top"
  >
    <div class="container-fluid">
      <!-- Botón abrir sidebar solo en móvil -->
      <button
        class="btn btn-outline-primary d-lg-none me-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMobile"
        aria-controls="sidebarMobile"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand fw-bold text-primary">Superadmin</a>

      <!-- Opciones de usuario -->
      <div class="ms-auto d-flex align-items-center">
        <span class="me-3 fw-semibold text-secondary">
          {{ authStore.user?.nombre || "Invitado" }}
        </span>
        <button class="btn btn-outline-primary btn-sm" @click="logout">
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.logout();
  router.push("/");
}
</script>
