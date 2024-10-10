import { USER_ROUTE_URL } from '@/constants';
import { UserResponse } from '@/models/userInfo';
import axios from 'axios';
import axiosClient from './axiosService';
import { BookModel } from '@/models/bookModel';
import { UserModel } from '@/models';
import { AmountModel } from '@/models/amountModel';

export const userService = {
  login: async (data: {
    studentCode: string;
    password: string;
    email: string;
    loginWithManagerRole: boolean;
  }): Promise<UserResponse> => {
    return axios({
      baseURL: `${USER_ROUTE_URL}/login`,
      method: 'POST',
      headers: {},
      data,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  verify: async (studentCode: string): Promise<UserResponse> => {
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
  comment: async (
    userId: string,
    bookId: string,
    comment: string,
  ): Promise<{}> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/comment`,
      method: 'POST',
      data: {
        userId,
        bookId,
        comment,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  commentChapter: async (
    userId: string,
    chapterId: string,
    comment: string,
  ): Promise<{}> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/comment-in-chapter`,
      method: 'POST',
      data: {
        userId,
        chapterId,
        comment,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getNotification: async (userId: string): Promise<[]> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/get-notification`,
      method: 'GET',
      params: {
        userId,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  changeNotificationStatus: async (
    userId: string,
    notificationId: string,
  ): Promise<{}> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/change-notification-status`,
      method: 'GET',
      params: {
        userId,
        notificationId,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getUserInfo: async (userId: string): Promise<UserModel> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/get-user-info`,
      method: 'GET',
      params: {
        userId,
      },
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
  getUserAmount: async (userId: string): Promise<AmountModel> => {
    return axiosClient()({
      baseURL: `${USER_ROUTE_URL}/get-user-amount`,
      method: 'GET',
      params: {
        userId,
      },
    })
      .then((res) => res.data.data)
      .catch((error) => {
        throw error;
      });
  },
};
