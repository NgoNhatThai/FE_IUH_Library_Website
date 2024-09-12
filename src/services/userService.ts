import { USER_ROUTE_URL } from '@/constants';
import { UserResponse } from '@/models/userInfo';
import axios from 'axios';
import axiosClient from './axiosService';
import { BookModel } from '@/models/bookModel';

export const userService = {
  login: async (studentCode: string): Promise<UserResponse> => {
    return axios({
      baseURL: `${USER_ROUTE_URL}/verify`,
      method: 'POST',
      headers: {},
      data: {
        studentCode,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  follow: async (userId: string, bookId: string): Promise<{}> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/follow`,
      method: 'POST',
      data: {
        userId,
        bookId,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  unfollow: async (userId: string, bookId: string): Promise<{}> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/un-follow`,
      method: 'GET',
      params: {
        userId,
        bookId,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  checkFollowBook: async (userId: string, bookId: string): Promise<Boolean> => {
    return axios({
      baseURL: `${USER_ROUTE_URL}/check-follow-book`,
      method: 'GET',
      headers: {},
      params: {
        userId: userId,
        bookId: bookId,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getFollowList: async (params: {}): Promise<BookModel[]> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/get-follow-list`,
      method: 'GET',
      headers: {},
      params: {
        ...params,
      },
    })
      .then((res) => res.data.data)
      .catch((err) => {
        throw err;
      });
  },
};
