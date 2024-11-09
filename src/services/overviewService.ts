import { OVERVIEW_ROUTE_URL } from '@/constants';
import axiosClient from './axiosService';

export const overviewService = {
  getTransactionOverview: async (
    startDate: string,
    endDate: string,
  ): Promise<any> => {
    return axiosClient()({
      baseURL: `${OVERVIEW_ROUTE_URL}/transaction-overview`,
      method: 'GET',
      params: {
        startDate,
        endDate,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  getRevenueOverTime: async (
    startDate: string,
    endDate: string,
    userId?: string,
  ): Promise<any> => {
    return axiosClient()({
      baseURL: `${OVERVIEW_ROUTE_URL}/revenue-over-time`,
      method: 'GET',
      params: {
        startDate,
        endDate,
        userId,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  getTopUsersByDepositAmount: async (
    startDate: string,
    endDate: string,
    limit: number,
  ): Promise<any> => {
    return axiosClient()({
      baseURL: `${OVERVIEW_ROUTE_URL}/top-users-by-deposit`,
      method: 'GET',
      params: {
        startDate,
        endDate,
        limit,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  getAverageProcessingTime: async (
    startDate: string,
    endDate: string,
  ): Promise<any> => {
    return axiosClient()({
      baseURL: `${OVERVIEW_ROUTE_URL}/average-processing-time`,
      method: 'GET',
      params: {
        startDate,
        endDate,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  getUserDepositRate: async (): Promise<any> => {
    return axiosClient()({
      baseURL: `${OVERVIEW_ROUTE_URL}/user-deposit-rate`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  getTopBooksByViews: async (
    startDate: string,
    endDate: string,
    limit: number,
  ): Promise<any> => {
    return axiosClient()({
      baseURL: `${OVERVIEW_ROUTE_URL}/top-view`,
      method: 'GET',
      params: {
        startDate,
        endDate,
        limit,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
};
