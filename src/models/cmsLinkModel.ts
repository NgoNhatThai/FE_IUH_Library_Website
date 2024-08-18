import { ArticleModel } from './articleModel';
import { CategoryModel } from './categoryModel';
import { ImageModel } from './imageModel';
import { ProductModel } from './productModel';
import { PromotionModel } from './promotionModel';

export interface CmsLinkModel {
  id?: string;
  name?: string;
  target?: string;
  linkType?: CmsLinkType;
  orderNumber?: number;
  avatarMetadata?: ImageModel[];
  categoryId?: string;
  organizationId?: string;
  targetObject?:
    | ArticleModel
    | ProductModel
    | CategoryModel
    | PromotionModel
    | string;
}

export enum CmsLinkType {
  PRODUCT = 'PRODUCT',
  PRODUCT_CATEGORY = 'PRODUCT_CATEGORY',
  PROMOTION = 'PROMOTION',
  CMS = 'CMS',
  URL = 'URL',
}
