import { defineStore } from 'pinia';
import type { paths } from "../../schema";
import axios from 'axios';
import type { AxiosResponse } from 'axios';

interface IProductState {
  items: IProductItem;
  isLoading: boolean;
  isError: boolean;
  pagination: IProductPagination;
  sizes: IProductSizes["data"];
}

type IProductItemResponse = paths["/api/products"]["get"]["responses"][200]["content"]["application/json"];
type IProductItem = IProductItemResponse["data"];
//type IProductPaginationResponce = IProductItemResponse["meta"];
type IProductPagination = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}
type IProductsItemRequest = paths["/api/products"]["get"]["parameters"]["query"];
type IProductSizes = paths["/api/sizes"]["get"]["responses"][200]["content"]["application/json"];

export const useProductStore = defineStore('product', {
  state: ():IProductState => {
    return {
      items: [],
      isLoading: false,
      isError: false,
      pagination: {
        currentPage: 0,
        lastPage: 0,
        perPage: 0,
        total: 0,
      },
      sizes: [],
    }
  },
  actions: {
    async fetchProducts(page: number = 1): Promise<void> {
      try {
        this.isLoading = true;
        this.isError = false;
        const params: IProductsItemRequest = { page: page };
        const responce: AxiosResponse<IProductItemResponse> = await axios.get('https://shop-trainy.doorly.ru/api/products', { params: params });
        this.items = responce.data.data;
        const responceMeta = responce.data.meta;
        this.pagination = {
          currentPage: Number(responceMeta?.current_page),
          lastPage: Number(responceMeta?.last_page),
          perPage: Number(responceMeta?.per_page),
          total: Number(responceMeta?.total),
        }
      }
      catch (error) {
        console.error(error);
        this.isError = true;
      }
      finally {
        this.isLoading = false;
      }
    },

    async fetchSizes(): Promise<void> {
      try {
        const responce: AxiosResponse<IProductSizes> = await axios.get('https://shop-trainy.doorly.ru/api/sizes')
        this.sizes = responce.data.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
})