<template>
  <div>
    <h1>Каталог</h1>
    <ProductCard
        v-for="card in productCards"
        :key="card.id"
        :id="card.id"
        :title="card.title"
        :to="{ name: 'CatalogDetail', params: { id: card.id } }"
        :price="card.price"
        :image="card.image"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import ProductCard from "@/components/ProductCard.vue";
import {useProductStore} from "@/pinia/product.ts";

const productCards = [
  {
    id: 1,
    title: 'Белая куртка',
    price: 5000,
    image: '/public/images/catalog-photo.png',
  },
  {
    id: 2,
    title: 'Белая куртка',
    price: 5000,
    image: '/public/images/catalog-photo.png',
  }
]

const prodictStore = useProductStore();

onMounted(() => {
  prodictStore.fetchProducts()
})
</script>

<style lang="scss" scoped></style>