<template>
  <!-- Mobile: Offcanvas -->
  <div
    class="offcanvas offcanvas-start border-end d-lg-none custom-offcanvas"
    tabindex="-1"
    id="sidebarMobile"
    aria-labelledby="sidebarMobileLabel"
  >
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title fw-bold text-primary" id="sidebarMobileLabel">
        Menú
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Cerrar"
      ></button>
    </div>

    <!-- Scroll interno -->
    <div class="offcanvas-body p-0" style="overflow-y: auto; max-height: 100vh">
      <nav class="nav flex-column p-3">
        <router-link
          to="/superadmin/dashboard"
          class="nav-link sidebar-link"
          active-class="active-link"
          @click="closeOffcanvas"
        >
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </router-link>
        <router-link
          to="/superadmin/restaurantes"
          class="nav-link sidebar-link"
          active-class="active-link"
          @click="closeOffcanvas"
        >
          <i class="bi bi-shop me-2"></i> Restaurantes
        </router-link>
        <router-link
          to="/superadmin/usuarios"
          class="nav-link sidebar-link"
          active-class="active-link"
          @click="closeOffcanvas"
        >
          <i class="bi bi-people me-2"></i> Usuarios
        </router-link>
      </nav>
    </div>
  </div>

  <!-- Desktop: Aside fijo -->
  <aside class="d-none d-lg-block custom-sidebar border-end">
    <nav class="nav flex-column p-3">
      <router-link
        to="/superadmin/dashboard"
        class="nav-link sidebar-link"
        active-class="active-link"
      >
        <i class="bi bi-speedometer2 me-2"></i> Dashboard
      </router-link>
      <router-link
        to="/superadmin/restaurantes"
        class="nav-link sidebar-link"
        active-class="active-link"
      >
        <i class="bi bi-shop me-2"></i> Restaurantes
      </router-link>
      <router-link
        to="/superadmin/usuarios"
        class="nav-link sidebar-link"
        active-class="active-link"
      >
        <i class="bi bi-people me-2"></i> Usuarios
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { onMounted } from "vue";
import * as bootstrap from "bootstrap";

let offcanvasInstance;

onMounted(() => {
  const sidebarEl = document.getElementById("sidebarMobile");
  if (sidebarEl) {
    offcanvasInstance = new bootstrap.Offcanvas(sidebarEl);
  }
});

function closeOffcanvas() {
  if (offcanvasInstance) {
    offcanvasInstance.hide();

    setTimeout(() => {
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) {
        backdrop.remove();
        document.body.classList.remove(
          "offcanvas-backdrop",
          "show",
          "modal-open"
        );
        document.body.style.overflow = "";
      }
    }, 300);
  }
}
</script>

<style scoped>
/* Sidebar general */
.custom-sidebar {
  position: fixed;
  top: 56px; /* altura del navbar */
  bottom: 0;
  left: 0;
  width: 250px;
  background-color: #f4f6f9;
  overflow-y: auto;
  box-shadow: inset -1px 0 0 var(--color-gray-light);
}

/* Mobile offcanvas */
.custom-offcanvas {
  width: 250px;
  max-width: 80%;
  background: #ffff;
}

/* Links */
.sidebar-link {
  color: var(--color-text-dark);
  font-weight: 500;
  border-radius: 6px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.sidebar-link:hover {
  color: var(--color-primary);
  transform: translateX(3px);
}

.active-link {
  background: var(--color-primary-light);
  border-left: 4px solid var(--color-primary);
  font-weight: 600;
  color: var(--color-primary) !important;
}
</style>
