<template>
  <div class="product-card">
    <RouterLink :to="String(products.id)">
      <img
          :src="products.photo"
          alt="product"
      >
    </RouterLink>
    <div class="product-card__info">
      <h2>{{ products.name }}</h2>
      <p>{{ products.price }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface ICard {
  id: number;
  name: string;
  photo: string;
  price: number;
  color_id: number;
  size_id: number;
}

defineProps<{
  products: ICard;
}>();

</script>

<style lang="scss" scoped>
.product-card img {
  width: 100px;
}
</style>
