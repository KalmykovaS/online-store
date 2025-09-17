<template>
  <div>
    <span>Current page: {{ productsPagination.currentPage }}</span>
    <span>Last page: {{ productsPagination.lastPage }}</span>
    <span>Per page: {{ productsPagination.perPage }}</span>
    <span>Total: {{ productsPagination.total }}</span>
    <div>
      <button @click="handleClick(Direction.Down)"> < </button>
      <div>{{ productsPagination.currentPage }}</div>
      <button @click="handleClick(Direction.Up)"> > </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProductPagination {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

const emits = defineEmits<{
  (e: 'changePage', nextPage: number): void
}>();

const props = defineProps<{
  productsPagination: IProductPagination;
}>();

const enum Direction {
  Up = 'up',
  Down = 'down'
}

function handleClick(type: Direction) {
  let nextPage: number = 1;
  if (type === Direction.Down) {
    nextPage = props.productsPagination.currentPage - 1;
    if (nextPage <= 0) {
      nextPage = 1;
    }
  } else {
    nextPage = props.productsPagination.currentPage + 1;
    if (nextPage > props.productsPagination.lastPage) {
      nextPage = props.productsPagination.lastPage;
    }
  }
  emits('changePage', nextPage)
}

//disabled
// стили
</script>

<style lang="scss" scoped>

</style>