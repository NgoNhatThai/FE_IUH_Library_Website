import axios from 'axios';

import { HomeConfigModel } from '@/models';
import { HOME_CONFIG_URL } from '@/constants';
import { HOME_CONFIG_ID } from '@/constants';

export const homeConfigService = {
  getConfig: async (): Promise<HomeConfigModel> => {
    return axios({
      baseURL: `${HOME_CONFIG_URL}/${HOME_CONFIG_ID}`,
      method: 'GET',
      headers: {},
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};
