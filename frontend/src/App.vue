<template>
  <div :class="layoutClass">
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const layoutClass = computed(() => {
  if (route.name === "Login") {
    return "bg-login";
  }
  return "bg-main";
});
</script>
