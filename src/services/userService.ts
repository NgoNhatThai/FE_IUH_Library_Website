import { AUTH_ROUTE_URL } from '@/constants';
import { UserResponse } from '@/models/userInfo';
import axios from 'axios';

export const userService = {
  login: async (studentCode: string): Promise<UserResponse> => {
    return axios({
      baseURL: `${AUTH_ROUTE_URL}/verify`,
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
};
