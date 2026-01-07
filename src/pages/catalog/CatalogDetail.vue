<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
            :src="productDetailStore.items.photo"
            aspect-ratio="1"
            cover
            position="top"
            class="rounded-lg"
        />
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-bold mb-2">
          {{ productDetailStore.items.name }}
        </h1>

        <v-chip
            v-if="isNew"
            color="green"
            variant="flat"
            class="mb-4"
        >
          Новинка
        </v-chip>

        <div class="text-h5 font-weight-medium mb-6">
          {{ productDetailStore.items.price }} ₽
        </div>

        <v-btn
            color="primary"
            size="large"
        >
          Добавить в корзину
        </v-btn>

        <div>111:{{ productsStore.favorite }}</div>

<!--        <v-btn-->
<!--            :class="{ 'active' : productsStore.favorite.includes(productDetailStore.items.id) }"-->
<!--            @click.prevent="customFavorite(productDetailStore.items.id)"-->
<!--        >-->
<!--          Like-->
<!--        </v-btn>-->

        <div class="text-h6 font-weight-medium mt-6">
          {{ productDetailStore.items.description }}
        </div>

      </v-col>
    </v-row>

    <v-divider class="my-8" />

    <h2 class="text-h5 mb-4">Другие варианты</h2>

    <v-row>
      <v-col
          v-for="item in productDetailStore.items.similarProducts"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-card>
          <v-img
              :src="item.photo"
              height="200"
              cover
              position="top"
          />

          <v-card-title class="text-subtitle-1">
            {{ item.name }}
          </v-card-title>

          <v-card-text>
            <div class="text-body-1 font-weight-medium">
              {{ item.price }} ₽
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductDetailStore } from "@/pinia/productDetail.ts";
import { useProductStore } from '@/pinia/product.ts';

const productDetailStore = useProductDetailStore();
const productsStore = useProductStore();

const route = useRoute();
const routeId = computed(() => route.params.id);

onMounted(async () => {
  await productDetailStore.fetchProductDetail(routeId.value);
})

const isNew = computed(() => productDetailStore.items.is_new);

function customFavorite(id: number) {
  if (productsStore.favorite.includes(id)) {
    productsStore.favorite = productsStore.favorite.filter((itemId: number) => itemId !== id);
  } else {
    productsStore.favorite.push(id);
  }
}

</script>

<style scoped></style>