import axios from 'axios';

import config from '../../config';
import { HomeConfigModel } from '@/models';
import { HOME_CONFIG_URL } from '@/constants';

export const homeConfigService = {
  getConfig: async (): Promise<HomeConfigModel> => {
    return axios({
      baseURL: `${HOME_CONFIG_URL}/home-page`,
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
