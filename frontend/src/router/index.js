import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Layouts
import SuperAdminLayout from "../layouts/SuperAdminLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import WaiterLayout from "../layouts/WaiterLayout.vue";

// Auth
import Login from "../pages/auth/Login.vue";

// Pages
import SuperAdminDashboard from "../pages/superadmin/Dashboard.vue";
import AdminRestaurante from "../pages/admin/Restaurante.vue";
import MeseroPedidos from "../pages/waiter/Pedidos.vue";

const routes = [
  { path: "/", name: "Login", component: Login },

  // SUPERADMIN
  {
    path: "/superadmin",
    component: SuperAdminLayout,
    meta: { requiresAuth: true, role: "superadmin" },
    children: [
      {
        path: "dashboard",
        name: "SuperAdminDashboard",
        component: SuperAdminDashboard,
      },
    ],
  },

  // ADMIN
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, role: "admin" },
    children: [
      {
        path: "restaurante",
        name: "AdminRestaurante",
        component: AdminRestaurante,
      },
    ],
  },

  // MESERO
  {
    path: "/mesero",
    component: WaiterLayout,
    meta: { requiresAuth: true, role: "mesero" },
    children: [
      { path: "pedidos", name: "MeseroPedidos", component: MeseroPedidos },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardas de navegación
router.beforeEach((to) => {
  const authStore = useAuthStore();
  authStore.loadFromStorage();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "Login" };
  }

  if (to.meta.role && authStore.user?.rol !== to.meta.role) {
    // Si no tiene permisos → redirige según su rol
    switch (authStore.user?.rol) {
      case "superadmin":
        return { name: "SuperAdminDashboard" };
      case "admin":
        return { name: "AdminRestaurante" };
      case "mesero":
        return { name: "MeseroPedidos" };
      default:
        return { name: "Login" };
    }
  }

  if (to.name === "Login" && authStore.isAuthenticated) {
    // Redirigir al layout correcto según rol
    switch (authStore.user?.rol) {
      case "superadmin":
        return { name: "SuperAdminDashboard" };
      case "admin":
        return { name: "AdminRestaurante" };
      case "mesero":
        return { name: "MeseroPedidos" };
    }
  }
});

export default router;
