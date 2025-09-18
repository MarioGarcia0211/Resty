<template>
  <div class="input-group">
    <!-- Input -->
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      v-model="query"
      @keyup.enter="emitSearch"
    />

    <!-- Botón limpiar -->
    <button
      v-if="query"
      class="btn btn-outline-danger"
      @click="clearSearch"
      type="button"
    >
      <i class="bi bi-x-circle"></i>
    </button>

    <!-- Botón buscar -->
    <button class="btn btn-outline-secondary" @click="emitSearch" type="button">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Buscar..." },
});

const emit = defineEmits(["update:modelValue", "search"]);

const query = ref(props.modelValue);

watch(query, (val) => {
  emit("update:modelValue", val);

  if (val === "") {
    emit("search", "");
  }
});

function emitSearch() {
  emit("search", query.value);
}

function clearSearch() {
  query.value = "";
  emit("search", "");
}
</script>
