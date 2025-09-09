<template>
  <div>
    <div class="card shadow-sm border-0 p-4 mb-4">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2"
      >
        <div>
          <h1 class="h3 fw-bold text-dark mb-1">Restaurantes</h1>
        </div>
        <button class="btn btn-primary px-4 shadow-sm" @click="abrirModal()">
          <i class="bi bi-plus-circle me-1"></i> Nuevo restaurante
        </button>
      </div>
    </div>

    <RestaurantList
      :restaurants="restaurantStore.restaurantes"
      @edit="abrirModal"
      @delete="eliminarRestaurante"
    />

    <RestaurantForm :form="form" @saved="recargar" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRestaurantStore } from "../../stores/restaurant";
import * as bootstrap from "bootstrap";
import RestaurantList from "../../components/restaurant/RestaurantList.vue";
import RestaurantForm from "../../components/restaurant/RestaurantForm.vue";

const restaurantStore = useRestaurantStore();

const form = reactive({
  _id: null,
  nombre: "",
  direccion: "",
  telefono: "",
  logo_url: null,
});

onMounted(() => {
  restaurantStore.fetchRestaurantes();
});

function abrirModal(r = null) {
  if (r) {
    Object.assign(form, r);
  } else {
    form.nombre = "";
    form.direccion = "";
    form.telefono = "";
    form.logo_url = null;
    delete form._id;
  }
  new bootstrap.Modal(document.getElementById("restaurantModal")).show();
}

async function eliminarRestaurante(id) {
  if (confirm("¿Seguro que deseas eliminar este restaurante?")) {
    await restaurantStore.eliminarRestaurante(id);
  }
}

function recargar() {
  restaurantStore.fetchRestaurantes();
}
</script>
