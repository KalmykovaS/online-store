import { inject } from 'vue';
import type { AxiosInstance } from 'axios';

export const useApi = () => {
  const axios = inject('axios') as AxiosInstance;

  const fetchData = async () => {
    try {
      const response = await axios.get('/data');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchData };
};