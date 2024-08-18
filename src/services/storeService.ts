import axios from 'axios';

import { StoreConfig } from '@/models';
import { ALL_STORE_URL, STORE_CONFIG_URL } from '../constants/url';
import config from '../../config';

export const storeService = {
  getConfigById: async (storeId: string): Promise<StoreConfig> => {
    return axios({
      url: STORE_CONFIG_URL,
      method: 'GET',
      params: {
        organizationId: storeId,
      },
    })
      .then((res) => res.data?.content?.[0])
      .catch((err) => {
        throw err;
      });
  },
  getAll: async (): Promise<StoreConfig[]> => {
    return axios({
      url: ALL_STORE_URL,
      method: 'GET',
      headers: {
        'zapp-id': config.APP_ID,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};
