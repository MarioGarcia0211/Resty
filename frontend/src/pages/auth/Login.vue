<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow w-50">
      <h3 class="mb-3 text-center">Iniciar Sesión</h3>

      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="contrasena"
            type="password"
            class="form-control"
            placeholder="********"
            required
          />
        </div>

        <button class="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const email = ref("");
const contrasena = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  await authStore.loginUser(email.value, contrasena.value);

  if (authStore.isAuthenticated) {
    router.push("/dashboard"); // Redirige si login fue exitoso
  }
};
</script>
