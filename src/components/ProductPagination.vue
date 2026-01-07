<template>
  <div>
    <span>Current page: {{ productsPagination.currentPage }}</span>
    <span>Last page: {{ productsPagination.lastPage }}</span>
    <span>Per page: {{ productsPagination.perPage }}</span>
    <span>Total: {{ productsPagination.total }}</span>
    <div class="pagination">
      <button @click="handleClick(Direction.Down)"> < </button>
      <div
          v-for="index in downPages"
          key="index"
      >
        <button
            v-if="(productsPagination.currentPage - index) > 0"
            @click="handleClickNumber(productsPagination.currentPage - index)"
        >
            {{ productsPagination.currentPage - index  }}
        </button>
      </div>
      <div class="pagination__current">{{ productsPagination.currentPage }}</div>

      <div
          v-for="index in 3"
          key="index"
      >
        <button
            v-if="(productsPagination.currentPage + index) <= productsPagination.lastPage"
            @click="handleClickNumber(productsPagination.currentPage + index)"
        >
          {{ productsPagination.currentPage + index  }}
        </button>
      </div>

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
  Up = "up",
  Down = "down",
}

function handleClick(type: Direction):void {
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

function handleClickNumber(nextPage: number): void {
  emits('changePage', nextPage)
}

const downPages = [1, 2, 3].reverse();

//disabled
// стили
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &__current {
    color: red;
    font-weight: bold;
  }
}
</style>