<template>
  <div>
    <h1>Каталог</h1>
    <ProductCard
        v-for="card in productsStore.items"
        :key="card.id"
        :products="card"
    />
    <ProductPagination
        :products-pagination="productsStore.pagination"
        @change-page="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/pinia/product.ts";
import ProductPagination from "@/components/ProductPagination.vue";

const productsStore = useProductStore();

async function changePage(nextPage: number) {
  await productsStore.fetchProducts(nextPage);
}

onMounted(async () => {
  await productsStore.fetchProducts()
  console.log('items', productsStore.items)
})
</script>

<style lang="scss" scoped></style>