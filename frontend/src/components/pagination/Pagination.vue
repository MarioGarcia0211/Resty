<template>
  <nav v-if="totalPages > 1" class="mt-3">
    <ul class="pagination justify-content-center">
      <!-- Botón inicio -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === 1 }"
        @click="changePage(1)"
      >
        <a class="page-link">Inicio</a>
      </li>

      <!-- Botón anterior -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === 1 }"
        @click="changePage(currentPage - 1)"
      >
        <a class="page-link">Anterior</a>
      </li>

      <!-- Páginas (máx 3) -->
      <li
        v-for="page in visiblePages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        <a class="page-link">{{ page }}</a>
      </li>

      <!-- Botón siguiente -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPages }"
        @click="changePage(currentPage + 1)"
      >
        <a class="page-link">Siguiente</a>
      </li>

      <!-- Botón fin -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPages }"
        @click="changePage(totalPages)"
      >
        <a class="page-link">Fin</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const emit = defineEmits(["page-changed"]);

const visiblePages = computed(() => {
  const pages = [];
  let start = Math.max(1, props.currentPage - 1);
  let end = Math.min(props.totalPages, props.currentPage + 1);

  // asegurar que siempre muestre 3 números si es posible
  if (end - start < 2) {
    if (start === 1) {
      end = Math.min(3, props.totalPages);
    } else if (end === props.totalPages) {
      start = Math.max(1, props.totalPages - 2);
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

function changePage(page) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-changed", page);
  }
}
</script>

<style scoped>
.pagination button,
.pagination a,
.pagination span {
  cursor: pointer;
}

.pagination {
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pagination .page-item .page-link {
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: var(--color-secondary);
  background-color: var(--color-bg-light);
  transition: all 0.2s ease;
}

.pagination .page-item .page-link:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.pagination .page-item.active .page-link {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: 600;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.pagination .page-item.disabled .page-link {
  background-color: var(--color-gray-light);
  color: var(--color-gray-dark);
  cursor: not-allowed;
  opacity: 0.6;
}

/* 📱 Responsive */
@media (max-width: 576px) {
  .pagination {
    justify-content: center;
    gap: 0.3rem;
  }

  .pagination .page-item .page-link {
    padding: 0.4rem 0.7rem; /* Más compacto */
    font-size: 0.85rem;
    border-radius: 8px;
  }

  /* Opcional: ocultar los textos largos en móviles */
  .pagination .page-item:first-child .page-link,
  .pagination .page-item:last-child .page-link {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
