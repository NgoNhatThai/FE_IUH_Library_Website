import axios, { AxiosInstance } from 'axios';

import { BASE_URL } from '../constants/url';
import { LOCAL_STORAGE } from '@/constants';
import config from '../../config';

const axiosClient = (): AxiosInstance => {
  let token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) || '';

  // token =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb25JZCI6IjllMTc2YmZhLTg1OWEtNDI2YS04MTgwLWVlZmI0MmVkM2RmMiIsInN1YiI6IjRlMDU5ODgxLTFhMGUtNGY5MC1hOGQyLWU1NDBjNDQ0OTg1OCIsImF1dGhlbmNhdGlvblJvbGUiOiJDVVNUT01FUiIsImV4cCI6MTcyMDkyOTU3NSwiaWF0IjoxNzE4NzY5NTc1LCJ1c2VybmFtZSI6IjEwNzEzMjg3MzU1NTk3NjI3OTAifQ.28nyqBI5L_EjP-UHERxMC-0jIda_AUe53w_kuidR8E6zUyT1ztUqtR6L7hv6gmv6cvyb1DEsAqM16ERfqY3JJg'

  const axiosOption = axios.create({
    baseURL: BASE_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
      'ngrok-skip-browser-warning': true,
      'zapp-id': config.APP_ID,
    },
  });

  axiosOption.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosOption.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      throw error;
    },
  );

  return axiosOption;
};

export default axiosClient;
