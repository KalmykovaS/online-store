import { defineStore } from 'pinia';
import type { paths } from "../../schema";
import axios from 'axios';
import type { AxiosResponse } from 'axios';

interface IProductState {
  items: IProductItem;
  isLoading: boolean;
  isError: boolean;
}

type IProductItem = paths["/api/products"]["get"]["responses"][200]["content"]["application/json"]["data"];

export const useProductStore = defineStore('product', {
  state: ():IProductState => {
    return {
      items: [],
      isLoading: false,
      isError: false,
    }
  },
  actions: {
    async fetchProducts(): Promise<void> {
      const responce: AxiosResponse = await axios.get('https://shop-trainy.doorly.ru/api/products')
      this.items = responce.data.data
    }
  }
})