<template>
  <Navigation />
  <RouterView />
  {{ saveFavoritesArray }}
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from "@/components/Navigation.vue";
import { onMounted, ref } from "vue";
import { useProductStore } from '@/pinia/product.ts';
import { favoritesKey } from "@/pinia/product.ts";

const productsStore = useProductStore();

const saveFavoritesArray = ref([]);

onMounted(() => {
  const saveFavorites = localStorage.getItem(favoritesKey);
  saveFavoritesArray.value = JSON.parse(saveFavorites);
  productsStore.favorite = JSON.parse(saveFavorites);
})
</script>

<style scoped>

</style>
