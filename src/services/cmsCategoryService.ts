import {
  CMS_CATEGORY_SLUG,
  CMS_CATEGORY_SLUG_URL,
  PRODUCT_CATEGORY_URL,
} from '@/constants';
import { CmsCategoryModel } from '@/models';
import axiosClient from './axiosService';
import { ListResponse, SearchParams } from '@/types/api';

export const cmsCategoryService = {
  getCategoryBySlug: async (
    slug: CMS_CATEGORY_SLUG | string,
    organizationId?: string,
  ): Promise<CmsCategoryModel> => {
    return axiosClient()({
      url: `${CMS_CATEGORY_SLUG_URL}/${slug}`,
      method: 'GET',
      params: {
        organizationId,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getCategorySearch: async (
    params: SearchParams,
  ): Promise<ListResponse<CmsCategoryModel>> => {
    return axiosClient()({
      url: `${PRODUCT_CATEGORY_URL}/search`,
      method: 'GET',
      params: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};
