<template>
  <div>
    <h1>Каталог детальная {{ routeId }}</h1>
    {{ productDetailStore.items }}
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductDetailStore } from "@/pinia/productDetail.ts";

const productDetailStore = useProductDetailStore();

const route = useRoute();

const routeId = computed(() => route.params.id);

onMounted(async () => {
  await productDetailStore.fetchProductDetail(routeId.value);
})

</script>

<style scoped></style>