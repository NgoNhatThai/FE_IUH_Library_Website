import { CmsLinkModel } from './cmsLinkModel';
import { ImageModel } from './imageModel';

export interface CmsCategoryModel {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  avatarMetadata?: ImageModel[];
  createdDate?: string;
  modifiedDate?: string;
  organizationId?: string;
  target?: string;
  linkDTOs?: CmsLinkModel[];
  renderType?: CmsCategoryRenderType;
  children?: CmsCategoryModel[];
}

export enum CmsCategoryRenderType {
  SLIDER = 'SLIDER',
  CATEGORY = 'CATEGORY',
  PRODUCT_GROUP = 'PRODUCT_GROUP',
  PROMOTION = 'PROMOTION',
  ARTICLE = 'ARTICLE',
  LINK = 'LINK',
  MEMBER_CARD = 'MEMBER_CARD',
  PROMOTION_NUMBER = 'PROMOTION_NUMBER',
  MY_PARTNER = 'MY_PARTNER',
}
