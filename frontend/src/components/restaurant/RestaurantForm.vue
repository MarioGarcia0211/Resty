<template>
  <div class="modal fade" id="restaurantModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content rounded-4 shadow-lg border-0">
        <form @submit.prevent="guardar" novalidate>
          <!-- Header -->
          <div class="modal-header bg-primary text-white rounded-top-4">
            <h5 class="modal-title fw-bold">
              {{ form._id ? "Editar restaurante" : "Nuevo restaurante" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Body -->
          <div class="modal-body p-4">
            <div class="row g-3">
              <!-- Nombre -->
              <div class="col-md-6">
                <label class="form-label fw-semibold">Nombre *</label>
                <input
                  v-model="form.nombre"
                  class="form-control"
                  :class="{ 'is-invalid': errores.nombre }"
                  required
                />
                <div v-if="errores.nombre" class="invalid-feedback">
                  {{ errores.nombre }}
                </div>
              </div>

              <!-- Teléfono -->
              <div class="col-md-6">
                <label class="form-label fw-semibold">Teléfono *</label>
                <input
                  v-model="form.telefono"
                  class="form-control"
                  :class="{ 'is-invalid': errores.telefono }"
                  placeholder="+57 300 123 4567"
                  required
                />
                <div v-if="errores.telefono" class="invalid-feedback">
                  {{ errores.telefono }}
                </div>
              </div>

              <!-- Dirección -->
              <div class="col-12">
                <label class="form-label fw-semibold">Dirección *</label>
                <input
                  v-model="form.direccion"
                  class="form-control"
                  :class="{ 'is-invalid': errores.direccion }"
                  placeholder="Calle 123 #45-67, Buenaventura"
                  required
                />
                <div v-if="errores.direccion" class="invalid-feedback">
                  {{ errores.direccion }}
                </div>
              </div>

              <!-- Logo -->
              <div class="col-12">
                <label class="form-label fw-semibold">Logo</label>
                <input
                  type="file"
                  class="form-control"
                  @change="onFileChange"
                />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer d-flex justify-content-end px-4 py-3">
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-save me-1"></i> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as bootstrap from "bootstrap";
import { useRestaurantStore } from "../../stores/restaurant";
import { useToast } from "vue-toastification";
import { reactive, onMounted } from "vue";

const props = defineProps({
  form: Object,
});

const emit = defineEmits(["saved"]);
const restaurantStore = useRestaurantStore();
const toast = useToast();

// Estado de errores
const errores = reactive({
  nombre: "",
  telefono: "",
  direccion: "",
});

// Resetear formulario y errores
function resetForm() {
  props.form._id = null;
  props.form.nombre = "";
  props.form.telefono = "";
  props.form.direccion = "";
  props.form.logo_url = null;

  errores.nombre = "";
  errores.telefono = "";
  errores.direccion = "";
}

// Detectar cuando el modal se cierre
onMounted(() => {
  const modal = document.getElementById("restaurantModal");
  modal.addEventListener("hidden.bs.modal", resetForm);
});

function onFileChange(e) {
  props.form.logo_url = e.target.files[0];
}

function validar() {
  let valido = true;
  errores.nombre = "";
  errores.telefono = "";
  errores.direccion = "";

  if (!props.form.nombre) {
    errores.nombre = "El nombre es obligatorio.";
    valido = false;
  }

  if (!props.form.telefono) {
    errores.telefono = "El teléfono es obligatorio.";
    valido = false;
  } else {
    const telefonoRegex = /^\+?\d{2,3}\s?\d{3}\s?\d{3}\s?\d{4}$/;
    if (!telefonoRegex.test(props.form.telefono)) {
      errores.telefono =
        "El teléfono no tiene un formato válido (+57 300 123 4567).";
      valido = false;
    }
  }

  if (!props.form.direccion) {
    errores.direccion = "La dirección es obligatoria.";
    valido = false;
  }

  return valido;
}

async function guardar() {
  if (!validar()) {
    toast.error("Por favor corrige los errores en el formulario.");
    return;
  }

  try {
    if (props.form._id) {
      await restaurantStore.actualizarRestaurante(props.form._id, props.form);
      toast.success("Restaurante actualizado con éxito.");
    } else {
      await restaurantStore.crearRestaurante(props.form);
      toast.success("Restaurante creado con éxito.");
    }

    bootstrap.Modal.getInstance(
      document.getElementById("restaurantModal")
    ).hide();

    emit("saved");
  } catch (error) {
    console.error(error);
    toast.error("Ocurrió un error al guardar el restaurante.");
  }
}
</script>
