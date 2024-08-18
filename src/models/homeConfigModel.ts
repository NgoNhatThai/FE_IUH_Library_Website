import { CmsCategoryModel } from './cmsCategoryModel';

export interface HomeConfigModel {
  id?: string;
  welcomeMessage?: string[];
  configDTOs?: HomeConfigItemModel[];
  slug?: string;
  zappId?: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface HomeConfigItemModel {
  id?: number;
  orderNumber?: number;
  cmsCategoryId?: number;
  cmsCategory?: CmsCategoryModel;
}


