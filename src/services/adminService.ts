import { BankConfig } from '@/models/bankConfigModel';
import axiosClient from './axiosService';
import { ADMIN_ROUTE_URL } from '@/constants';
import { Config } from '@/models/configModel';
import { CategoryModel } from '@/models/categoryModel';
import { AuthorModel } from '@/models/authorModel';
import { MajorModel } from '@/models/majorModel';
export const adminService = {
  configBankAccount: async (data: BankConfig): Promise<BankConfig> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/config-bank-account`,
      method: 'POST',
      data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getConfigBankAccount: async (): Promise<any> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-bank-account`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllBank: async (): Promise<any> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-banks`,
      method: 'GET',
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllRequest: async (): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-list-amount-request`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  acceptRequest: async (data: {
    userId: string;
    requestId: string;
  }): Promise<Request> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/accept-amount-request`,
      method: 'POST',
      data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllCategory: async (): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-all-category`,
      method: 'GET',
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  getConfig: async (): Promise<Config> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-config`,
      method: 'GET',
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  createOrUpdateConfig: async (data: Config): Promise<Config> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/create-config`,
      method: 'POST',
      data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllAuthor: async (): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-all-author`,
      method: 'GET',
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllMajor: async (): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-all-major`,
      method: 'GET',
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  createCategory: async (data: CategoryModel): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/create-category`,
      method: 'POST',
      data,
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  createAuthor: async (data: AuthorModel): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/create-author`,
      method: 'POST',
      data,
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  createMajor: async (data: MajorModel): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/create-major`,
      method: 'POST',
      data,
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  searchUser: async (text: string): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/search-user`,
      method: 'GET',
      params: {
        text,
      },
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  getAllaccount: async (): Promise<[]> => {
    return axiosClient()({
      baseURL: `${ADMIN_ROUTE_URL}/get-all-user?pageIndex=0&pageSize=50`,
      method: 'GET',
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
};
