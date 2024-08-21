import axios from 'axios';
import { CategoryResponse } from '@/models';
import { ADMIN_ROUTE_URL } from '@/constants';

export const categoryService = {
  getAllCategories: async (): Promise<CategoryResponse> => {
    return axios({
      baseURL: `${ADMIN_ROUTE_URL}/get-all-category`,
      method: 'GET',
      headers: {},
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};
