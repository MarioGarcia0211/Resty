<template>
  <!-- Mobile: Offcanvas -->
  <div
    class="offcanvas offcanvas-start bg-light border-end d-lg-none"
    tabindex="-1"
    id="sidebarMobile"
    aria-labelledby="sidebarMobileLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-primary" id="sidebarMobileLabel">Menú</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Cerrar"
      ></button>
    </div>

    <!-- Scroll interno para links -->
    <div class="offcanvas-body p-0" style="overflow-y: auto; max-height: 100vh">
      <nav class="nav flex-column p-3">
        <router-link
          to="/superadmin/dashboard"
          class="nav-link link-dark fw-medium"
          active-class="active-link"
        >
          Dashboard
        </router-link>
        <router-link
          to="/superadmin/restaurantes"
          class="nav-link link-dark fw-medium"
          active-class="active-link"
        >
          Restaurantes
        </router-link>
        <router-link
          to="/superadmin/usuarios"
          class="nav-link link-dark fw-medium"
          active-class="active-link"
        >
          Usuarios
        </router-link>
      </nav>
    </div>
  </div>
  <!-- Desktop: Aside fijo con scroll -->
  <aside
    class="d-none d-lg-block bg-light border-end"
    style="
      position: fixed;
      top: 56px; /* altura del navbar */
      bottom: 0;
      left: 0;
      width: 250px;
      overflow-y: auto;
    "
  >
    <nav class="nav flex-column p-3">
      <router-link
        to="/superadmin/dashboard"
        class="nav-link link-dark fw-medium"
        active-class="active-link"
      >
        Dashboard
      </router-link>
      <router-link
        to="/superadmin/restaurantes"
        class="nav-link link-dark fw-medium"
        active-class="active-link"
      >
        Restaurantes
      </router-link>
      <router-link
        to="/superadmin/usuarios"
        class="nav-link link-dark fw-medium"
        active-class="active-link"
      >
        Usuarios
      </router-link>

      <!-- <router-link
        v-for="n in 20"
        :key="n"
        to="/superadmin/dashboard"
        class="nav-link link-dark fw-medium"
        active-class="active-link"
      >
        Item {{ n }}
      </router-link> -->
    </nav>
  </aside>
</template>

<script setup>
import { onMounted } from "vue";
import * as bootstrap from "bootstrap";

onMounted(() => {
  const sidebarEl = document.getElementById("sidebarMobile");
  if (sidebarEl) {
    new bootstrap.Offcanvas(sidebarEl);
  }
});
</script>

<style scoped>
.active-link {
  background-color: #e9f2ff;
  color: #0d6efd !important;
  border-radius: 6px;
  padding-left: 12px;
}

.nav-link:hover {
  background-color: #f1f1f1;
  border-radius: 6px;
}
</style>
