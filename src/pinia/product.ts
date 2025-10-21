import { defineStore } from 'pinia';
import type { paths } from "../../schema";
// import axios from 'axios';
//import type { AxiosResponse } from 'axios';
import { inject } from 'vue';
import type { AxiosResponse, AxiosInstance } from 'axios';

type ISelectSizeItem = {
  id: number;
  name: string;
}

type ISelectColorItem = {
  id: number;
  name: string;
  hex: string;
}

interface IProductState {
  items: IProductItem;
  isLoading: boolean;
  isError: boolean;
  pagination: IProductPagination;
  sizes: IProductSizes["data"];
  selectedItem: ISelectSizeItem | null;
  colors: IProductColors["data"];
  selectedColorItem: ISelectColorItem | null;
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
type IProductColors = paths["/api/colors"]["get"]["responses"][200]["content"]["application/json"];

const axios = inject('axios') as AxiosInstance;

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
      selectedItem: null,
      colors: [],
      selectedColorItem: null,
    }
  },
  actions: {
    async fetchProducts(page: number = 1): Promise<void> {
      try {
        this.isLoading = true;
        this.isError = false;
        const params: IProductsItemRequest = { page: page };
        if (this.selectedItem) {
          params.size_id = this.selectedItem.id
        }
        if (this.selectedColorItem) {
          params.color_id = this.selectedColorItem.id
        }
        const responce: AxiosResponse<IProductItemResponse> = await axios.get('/products', { params: params });
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
        const responce: AxiosResponse<IProductSizes> = await axios.get('/sizes')
        this.sizes = responce.data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchColors(): Promise<void> {
      try {
        const responce: AxiosResponse<IProductColors> = await axios.get('/colors')
        this.colors = responce.data.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
})