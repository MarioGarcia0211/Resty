<template>
  <div class="container-login">
    <div class="card card-login shadow-lg border-0">
      <div class="card-body card-body-login">
        <!-- Logo -->
        <div class="text-center mb-3">
          <img src="../../assets/vue.svg" alt="Logo" class="logo" />
        </div>

        <!-- Titulo -->
        <h2 class="text-center mb-4 fw-bold">Iniciar Sesión</h2>

        <form @submit.prevent="handleLogin" novalidate>
          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              placeholder="Ingresa tu correo"
              @blur="validateEmail"
              @input="errors.email = ''"
              required
            />
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email }}
            </div>
          </div>

          <!-- Contraseña -->
          <div class="mb-4">
            <label class="form-label">Contraseña</label>
            <input
              v-model="contrasena"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.contrasena }"
              placeholder="Ingresa tu contraseña"
              @blur="validatePassword"
              @input="errors.contrasena = ''"
              required
            />
            <div v-if="errors.contrasena" class="invalid-feedback">
              {{ errors.contrasena }}
            </div>
          </div>

          <button class="btn btn-primary w-100" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const email = ref("");
const contrasena = ref("");
const errors = ref({ email: "", contrasena: "" });

const router = useRouter();
const authStore = useAuthStore();

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errors.value.email = !email.value
    ? "El correo es obligatorio"
    : !emailRegex.test(email.value)
    ? "Formato de correo inválido"
    : "";
};

const validatePassword = () => {
  errors.value.contrasena = !contrasena.value
    ? "La contraseña es obligatoria"
    : contrasena.value.length < 5
    ? "La contraseña debe tener al menos 5 caracteres"
    : "";
};

const handleLogin = async () => {
  // Validar antes de enviar
  validateEmail();
  validatePassword();

  if (errors.value.email || errors.value.contrasena) return;

  await authStore.loginUser(email.value, contrasena.value);

  if (authStore.isAuthenticated) {
    switch (authStore.user.rol) {
      case "superadmin":
        router.push({ name: "SuperAdminDashboard" });
        break;
      case "admin":
        router.push({ name: "AdminRestaurante" });
        break;
      case "mesero":
        router.push({ name: "MeseroPedidos" });
        break;
    }
  }
};
</script>

<style scoped>
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card-login {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
}

.card-body-login {
  padding: 2rem;
}

.logo {
  max-height: 60px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}

.btn-primary {
  border: none;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
}
</style>
