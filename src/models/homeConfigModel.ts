import { CmsCategoryModel } from './cmsCategoryModel';

export interface HomeConfigModel {
  status?: string;
  message?: string;
  data?: HomeConfigTypeModel;
}

export interface HomeConfigItemModel {
  id?: number;
  orderNumber?: number;
  cmsCategoryId?: number;
  cmsCategory?: CmsCategoryModel;
}

export interface HomeConfigTypeModel {
  _id?: string;
  name?: string;
  desc?: string;
  address?: string;
  phone?: string;
  email?: string;
  banners?: string[];
  logo?: string;
  categories?: string[];
  createdAt?: string;
  updatedAt?: string;
}
