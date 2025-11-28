import { defineStore } from 'pinia';
import type { paths } from "../../schema";
import axios from 'axios';
//import { inject } from 'vue';
import type { AxiosResponse, AxiosInstance } from 'axios';
import { cloneDeep, isEqual } from 'lodash';

interface IProductState {
  items: IProductItem;
  isLoading: boolean;
  isError: boolean;
}

type IProductItemResponse = paths["/api/products"]["get"]["responses"][200]["content"]["application/json"];
type IProductItem = IProductItemResponse["data"];

export const useProductDetailStore = defineStore('product', {
  state: ():IProductState => {
    return {
      items: [],
      isLoading: false,
      isError: false,
    }
  },
  actions: {
    async fetchProductDetail(id: number): Promise<void> {
      try {
        this.isLoading = true;
        this.isError = false;

        const responce: AxiosResponse<IProductItemResponse> = await axios.get(`https://shop-trainy.doorly.ru/api/products/${id}`);
        this.items = responce.data.data;
      }
      catch (error) {
        console.error(error);
        this.isError = true;
      }
      finally {
        this.isLoading = false;
      }
    },
  }
})