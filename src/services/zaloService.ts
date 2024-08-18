import { GetLocation, GetPhoneNumber, ZaloCreateOrder } from 'types/api';
import { ShareCurrentPage } from 'types/zmp-sdk';
import api, {
  CreateOrderReturns,
  GetAppInfoReturns,
  GetUserInfoReturns,
  Payment,
  getAppInfo,
} from 'zmp-sdk';
import {
  createShortcut,
  addRating,
  favoriteApp,
  followOA,
  getLocation,
  getPhoneNumber,
  onNetworkStatusChange,
  openChat,
  openShareSheet,
  openWebview,
  unfollowOA,
  getSetting,
  authorize,
  setNavigationBarColor,
  configAppView,
  interactOA,
  openPhone,
  closeLoading,
  requestSendNotification,
} from 'zmp-sdk/apis';
import { getNetworkType } from 'zmp-sdk/apis';
import config from '../config';
import { userService } from './userService';

export const zaloService = {
  getAccessToken: async (): Promise<string> => {
    try {
      await api.login({});
      const accessToken = await api.getAccessToken({});
      return accessToken;
    } catch (error) {
      throw error;
    }
  },
  getUser: async (): Promise<GetUserInfoReturns> => {
    try {
      const response = await api.getUserInfo({});
      return response;
    } catch (error) {
      throw error;
    }
  },
  getCurrentLocation: (): Promise<GetLocation> => {
    return new Promise((resolve, reject) => {
      getLocation({
        success: (data) => {
          resolve(data);
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
  },
  getUserPhoneNumber: (): Promise<GetPhoneNumber> => {
    return new Promise((resolve, reject) => {
      getPhoneNumber({
        success: (data) => {
          resolve(data);
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
  },
  followZaloOA: async () => {
    const oaID = config.OA_ID;
    if (!oaID) throw new Error('OA_ID is not exist');

    try {
      await followOA({
        id: oaID,
      });
    } catch (error) {
      console.log('Follow OA error: ', error);
      throw error;
    }
  },
  interactZaloOA: async () => {
    const oaId = config.OA_ID;
    if (!oaId) throw new Error('OA_ID is not exist');

    try {
      await interactOA({
        oaId,
      });
    } catch (error) {
      console.log('Follow OA error: ', error);
    }
  },
  unFollowOA: async () => {
    const oaID = config.OA_ID;
    if (oaID) {
      try {
        const res = await unfollowOA({
          id: oaID,
        });
      } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    }
  },
  createMiniAppShortcut: async () => {
    try {
      await createShortcut({
        params: {
          utm_source: 'shortcut',
        },
      });
    } catch (error) {
      console.log('Error when create short cut:', error);
    }
  },
  openChatScreen: async (message?: string) => {
    try {
      await openChat({
        type: 'oa',
        id: config.OA_ID,
        message,
      });
    } catch (error) {
      console.log(error);
    }
  },
  onNetworkStatusChange: async () => {
    return new Promise((resolve) => {
      onNetworkStatusChange((data) => {
        resolve(data);
      });
    });
  },
  shareCurrentPage: async (dataShare: ShareCurrentPage) => {
    try {
      const res = await openShareSheet({
        type: 'zmp_deep_link',
        data: dataShare,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAppInfo: async (): Promise<GetAppInfoReturns | undefined> => {
    try {
      const res = await getAppInfo({});
      return res;
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
      return undefined;
    }
  },

  checkNetwork: async () => {
    try {
      const { networkType } = await getNetworkType({});
      return networkType;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  openUrlInWebview: async (url: string) => {
    try {
      await openWebview({
        url,
      });
    } catch (error) {
      console.log(error);
    }
  },
  ratingForMiniApp: async () => {
    try {
      await addRating();
    } catch (error) {
      throw error;
    }
  },
  favoriteMiniApp: async () => {
    try {
      await favoriteApp();
    } catch (error) {
      throw error;
    }
  },
  authorize: async () => {
    try {
      const data = await authorize({
        scopes: ['scope.userInfo'],
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  getSetting: async () => {
    try {
      const data = await getSetting({});
      return data;
    } catch (error) {
      throw error;
    }
  },
  changeStatusBarColor: async (color: string) => {
    try {
      await setNavigationBarColor({
        color,
      });
      await configAppView({
        actionBar: {
          hide: true,
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  },
  createOrder: (data: ZaloCreateOrder): Promise<CreateOrderReturns> => {
    return new Promise((resolve, reject) => {
      Payment.createOrder({
        desc: data.desc,
        item: data.item || [],
        amount: data.amount,
        method: data.method,
        success: (data) => {
          resolve(data);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
  openCallScreen: async (phoneNumber: string) => {
    try {
      await openPhone({
        phoneNumber,
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  },
  sendNotification: async () => {
    try {
      await requestSendNotification({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  },
  closeLoadingScreen: async () => {
    try {
      await closeLoading({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  },
};
