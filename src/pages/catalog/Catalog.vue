<template>
  <div>
    <h1>Каталог</h1>
    <v-select
        label="Select"
        :items="productsStore.sizes"
        v-model="selectedItem"
        return-object
    >
      <template v-slot:selection="{ item }">
        {{ item.raw.name }}
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" :title="item.raw.name"></v-list-item>
      </template>
    </v-select>
    <div class="cards-wrapper">
      <ProductCard
          v-for="card in productsStore.items"
          :key="card.id"
          :products="card"
      />
    </div>
    <ProductPagination
        :products-pagination="productsStore.pagination"
        @change-page="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/pinia/product.ts";
import ProductPagination from "@/components/ProductPagination.vue";

const productsStore = useProductStore();

async function changePage(nextPage: number) {
  await productsStore.fetchProducts(nextPage);
}

const selectedItem = ref(null);

onMounted(async () => {
  await Promise.all([
    productsStore.fetchProducts(),
    productsStore.fetchSizes()
  ]);
  console.log('items', productsStore.items)
})
</script>

<style lang="scss" scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>