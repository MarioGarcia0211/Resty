<template>
  <div>
    <!-- Encabezado -->
    <div class="card shadow-sm border-0 p-4 mb-4">
      <div class="row g-3">
        <!-- Título -->
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h1 class="h3 fw-bold text-dark mb-0">Restaurantes</h1>
        </div>

        <!-- Botón nuevo -->
        <div class="col-12 col-md-6 d-flex justify-content-md-end">
          <button class="btn btn-primary px-4 shadow-sm" @click="abrirModal()">
            <i class="bi bi-plus-circle me-1"></i> Nuevo restaurante
          </button>
        </div>

        <!-- Buscador -->
        <div class="col-12">
          <SearchBar
            v-model="restaurantStore.search"
            placeholder="Buscar restaurante..."
            @search="buscar"
          />
        </div>
      </div>
    </div>

    <!-- Lista -->
    <RestaurantList
      :restaurants="restaurantStore.restaurantes"
      @edit="abrirModal"
      @delete="eliminarRestaurante"
    />

    <!-- Paginación -->
    <Pagination
      :currentPage="restaurantStore.page"
      :totalPages="restaurantStore.totalPages"
      @page-changed="cambiarPagina"
    />

    <!-- Modal -->
    <RestaurantForm :form="form" @saved="recargar" />
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { useRestaurantStore } from "../../stores/restaurant";
import * as bootstrap from "bootstrap";
import RestaurantList from "../../components/restaurant/RestaurantList.vue";
import RestaurantForm from "../../components/restaurant/RestaurantForm.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import SearchBar from "../../components/searchBar/SearchBar.vue";

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

function buscar() {
  if (restaurantStore.search && restaurantStore.search.trim() !== "") {
    restaurantStore.fetchRestaurantes(1, restaurantStore.search);
  } else {
    restaurantStore.fetchRestaurantes(1);
  }
}

function cambiarPagina(page) {
  if (page >= 1 && page <= restaurantStore.totalPages) {
    restaurantStore.fetchRestaurantes(page, restaurantStore.search);
  }
}

const paginasVisibles = computed(() => {
  const total = restaurantStore.totalPages;
  const actual = restaurantStore.page;
  const rango = 2; // cantidad de páginas alrededor de la actual
  let inicio = Math.max(1, actual - rango);
  let fin = Math.min(total, actual + rango);

  // Ajustar cuando esté cerca de los extremos
  if (actual <= rango) {
    fin = Math.min(total, 1 + rango * 2);
  }
  if (actual >= total - rango) {
    inicio = Math.max(1, total - rango * 2);
  }

  const paginas = [];
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i);
  }
  return paginas;
});
</script>
