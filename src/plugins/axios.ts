// plugins/axios.ts
import axios from 'axios';
import type { App } from 'vue';

interface AxiosOptions {
  baseURL: string;
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const axiosInstance = axios.create({
      baseURL: options.baseURL,
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      }
    });

    // Make the Axios instance available globally or through provide/inject
    app.config.globalProperties.$axios = axiosInstance;
    app.provide('axios', axiosInstance);
  }
};