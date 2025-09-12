<template>
  <div>
    <h1>Каталог</h1>
    <ProductCard
        v-for="card in productCards"
        :id="card.id"
        :title="card.title"
        :to="{ name: 'CatalogDetail', params: { id: card.id } }"
        :price="card.price"
        :image="card.image"
    />
  </div>
</template>

<script lang="ts" setup>
import ProductCard from "@/components/ProductCard.vue";

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
</script>

<style lang="scss" scoped></style>