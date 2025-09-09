<template>
  <div>
    <div class="card shadow-sm border-0 p-4 mb-4">
      <h1 class="h3 mb-0">Restaurantes</h1>
    </div>

    <div class="mb-3">
      <button class="btn btn-primary" @click="abrirModal()">
        Nuevo Restaurante
      </button>
    </div>

    <RestaurantList
      :restaurants="restaurantStore.restaurantes"
      @edit="abrirModal"
      @delete="eliminarRestaurante"
    />

    <!-- Modal Crear/Editar -->
    <div class="modal fade" id="restaurantModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="guardar">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ form._id ? "Editar" : "Nuevo" }} Restaurante
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input v-model="form.nombre" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Dirección</label>
                <input v-model="form.direccion" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input v-model="form.telefono" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Logo</label>
                <input
                  type="file"
                  class="form-control"
                  @change="onFileChange"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRestaurantStore } from "../../stores/restaurant";
import * as bootstrap from "bootstrap";
import RestaurantList from "../../components/restaurant/RestaurantList.vue";

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

function onFileChange(e) {
  form.logo_url = e.target.files[0];
}

async function guardar() {
  if (form._id) {
    await restaurantStore.actualizarRestaurante(form._id, form);
  } else {
    await restaurantStore.crearRestaurante(form);
  }
  bootstrap.Modal.getInstance(
    document.getElementById("restaurantModal")
  ).hide();
}

async function eliminarRestaurante(id) {
  if (confirm("¿Seguro que deseas eliminar este restaurante?")) {
    await restaurantStore.eliminarRestaurante(id);
  }
}
</script>
