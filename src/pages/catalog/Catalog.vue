<template>
  <div>
    <h1>Каталог</h1>

    Выберите размер:
    <v-select
        label="Select"
        :items="productsStore.sizes"
        v-model="productsStore.selectedItem"
        return-object
        @update:modelValue="handleClick"
    >
      <template v-slot:selection="{ item }">
        {{ item.raw.name }}
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" :title="item.raw.name"></v-list-item>
      </template>
    </v-select>

    Выберите цвет:
    <v-select
        label="Select"
        :items="productsStore.colors"
        v-model="productsStore.selectedColorItem"
        return-object
        @update:modelValue="handleClick"
    >
      <template v-slot:selection="{ item }">
        {{ item.raw.name }}
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" :title="item.raw.name"></v-list-item>
      </template>
    </v-select>

    цена:

    <v-range-slider
        v-model="productsStore.range"
        :max="rangeDefault[1]"
        :min="rangeDefault[0]"
        :step="1"
        class="align-center"
        hide-details
        @update:modelValue="throttledProductFetch"
    >
      <template v-slot:prepend>
        <v-text-field
            v-model="productsStore.range[0]"
            density="compact"
            style="width: 70px"
            type="number"
            variant="outlined"
            hide-details
            single-line
        ></v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field
            v-model="productsStore.range[1]"
            density="compact"
            style="width: 70px"
            type="number"
            variant="outlined"
            hide-details
            single-line
        ></v-text-field>
      </template>
    </v-range-slider>

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
import { rangeDefault, useProductStore} from "@/pinia/product.ts";
import ProductPagination from "@/components/ProductPagination.vue";
import { throttle } from 'lodash';

const productsStore = useProductStore();
const throttledProductFetch = throttle(handleClick, 1000);

async function changePage(nextPage: number) {
  await productsStore.fetchProducts(nextPage);
}

//const selectedItem = ref(null);

onMounted(async () => {
  await Promise.all([
    productsStore.fetchProducts(),
    productsStore.fetchSizes(),
    productsStore.fetchColors(),
  ]);
})

async function handleClick() {
  await productsStore.fetchProducts(1)
}
</script>

<style lang="scss" scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>