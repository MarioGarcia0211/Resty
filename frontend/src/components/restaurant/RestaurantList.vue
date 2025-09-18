<template>
  <div class="row g-3">
    <div
      v-for="r in restaurants"
      :key="r._id"
      class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <RestaurantCard
        :restaurant="r"
        @edit="$emit('edit', r)"
        @delete="$emit('delete', r._id)"
      />
    </div>
  </div>
</template>

<script setup>
import RestaurantCard from "./RestaurantCard.vue";

defineProps({
  restaurants: {
    type: Array,
    required: true,
  },
});
</script>
