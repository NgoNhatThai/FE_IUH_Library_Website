import axios, { AxiosInstance } from 'axios';

import { LOCAL_STORAGE } from '@/constants';

const axiosClient = (): AxiosInstance => {
  let token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) || '';

  const axiosOption = axios.create({
    baseURL: '',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
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
