<template>
  <RouterLink :to="`/catalog/detail/${String(products.id)}`" class="product-card">
    <img
        :src="products.photo"
        alt="product"
    >
    <div class="product-card__info">
      <h2>{{ products.name }}</h2>
      <p>{{ products.price }}</p>
      <button
          type="button"
          :class="{ 'active' : productsStore.favorite.includes(products.id) }"
          @click.prevent="customFavorite(products.id)"
      >
        Like
      </button>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/pinia/product.ts';

const productsStore = useProductStore();

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

function customFavorite(id: number) {
  if (productsStore.favorite.includes(id)) {
    productsStore.favorite = productsStore.favorite.filter((itemId: number) => itemId !== id);
  } else {
    productsStore.favorite.push(id);
  }
}

</script>

<style lang="scss" scoped>
.product-card {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  img {
    width: 100px;
  }
}
</style>
