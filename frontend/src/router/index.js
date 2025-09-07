import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Importa tus vistas
import Login from "../pages/auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  authStore.loadFromStorage();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "Login" };
  }

  if (to.name === "Login" && authStore.isAuthenticated) {
    return { name: "Dashboard" };
  }
});

export default router;
