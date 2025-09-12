<template>
  <div class="product-card">
    <RouterLink :to="to">
      <img
          :src="image"
          alt="product"
      >
    </RouterLink>
    <div class="product-card__info">
      <h2>{{ title }}</h2>
      <p>{{ price }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface ICard {

}

defineProps<{
  to: string;
  id: number;
  title: string;
  price: string;
  image: string;
}>();

</script>

<style lang="scss" scoped>

</style>
