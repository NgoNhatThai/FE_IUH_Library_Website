import axios from 'axios';

// import config from '@config'
import { ProductModel } from '@/models';
import { ListResponse, SearchParams } from '@/types/api';
import axiosClient from './axiosService';
import { PRODUCT_SEARCH_URL, PRODUCT_URL } from '../constants/url';

export const productService = {
  products: async (
    params: SearchParams,
  ): Promise<ListResponse<ProductModel>> => {
    return axios({
      method: 'GET',
      url: PRODUCT_SEARCH_URL,
      params,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getProductById: async (id: string): Promise<ProductModel> => {
    return axios({
      method: 'GET',
      url: `${PRODUCT_URL}/${id}`,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getProductsFromNhanhVn: async (
    params: SearchParams,
  ): Promise<ListResponse<ProductModel>> => {
    return axiosClient()({
      method: 'GET',
      url: `${PRODUCT_URL}/get-from-nhanhvn`,
      params,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllProductsPaid: async (): Promise<ProductModel[]> => {
    return axiosClient()({
      method: 'GET',
      url: `${PRODUCT_URL}/all-product-paid`,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
};
