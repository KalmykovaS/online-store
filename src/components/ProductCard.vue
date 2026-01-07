<template>
  <RouterLink :to="`/catalog/detail/${String(products.id)}`" class="product-card">
    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-img
          height="200px"
          :src="products.photo"
          cover
          position="top"
      ></v-img>

      <v-card-title>
        {{ products.name }}
      </v-card-title>

      <v-card-subtitle>
        {{ products.price }} ₽
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
            color="orange-lighten-2"
            text="Explore"
        ></v-btn>

        <v-btn
            :class="{ 'active' : productsStore.favorite.includes(products.id) }"
            @click.prevent="customFavorite(products.id)"
        >
          Like
        </v-btn>

      </v-card-actions>

    </v-card>
  </RouterLink>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/pinia/product.ts';
import { ref } from 'vue';

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
  //width: 200px;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //gap: 40px;

  img {
    width: 100px;
  }
}
</style>
