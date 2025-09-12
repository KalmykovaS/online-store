<template>
  <div>
    <h1>Каталог детальная {{ routeId }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeId = computed(() => route.params.id);

</script>

<style scoped></style>