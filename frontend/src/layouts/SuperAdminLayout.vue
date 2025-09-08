<template>
  <div class="app-container">
    <Navbar />
    <div class="d-flex cont-fluid">
      <Sidebar />
      <main class="flex-grow-1 p-4 bg-light main-content">
        <div class="card shadow-sm border-0 p-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/navbar/Navbar.vue";
import Sidebar from "../components/sidebar/Sidebar.vue";
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Contenedor principal (sidebar + main) */
.cont-fluid {
  flex: 1;
  display: flex;
  min-height: calc(100vh - 56px - 70px); /* Navbar (56px) + Footer (~70px) */
}

/* Contenido principal */
.main-content {
  overflow-y: auto;
}
</style>
