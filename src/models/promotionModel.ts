import { ImageModel } from './imageModel';
import { OrganizationModel } from './organizationModel';
import { ProductModel } from './productModel';

export interface PromotionModel {
  id?: string;
  creatorId?: string;
  startDate?: string;
  endDate?: string;
  name?: string;
  description?: string;
  priority?: number;
  avatarMetadata?: ImageModel[];
  status?: PromotionStatus;
  type?: PromotionType;
  createdDate?: string;
  modifiedDate?: string;
  scope?: PromotionScope;
  promotionTargetDTOs?: PromotionTargetModel[];
  promotionApplicationChannel?: PromotionApplyChannel;
  pointOrderDTOs?: PromotionPointOrderModel[];
  pointProductCategoryDTOs?: PromotionPointCategoryModel[];
  pointProductDTOs?: PromotionPointProductModel[];
  promotionProductGiftDTOs?: PromotionProductGiftModel[];
  promotionOrderProductCateDTOs?: PromotionOrderCategoryModel[];
  promotionOrderProductDTOs?: PromotionOrderProductModel[];
  promotionOrderDTOs?: PromotionOrderModel[];
  promotionPointDTOs?: PromotionPointBaseModel[];
  promotionOrderGiftDTOs?: PromotionOrderGiftModel[];
  organizationDTO?: OrganizationModel;
}

export interface PromotionPointBaseModel {
  id?: string;
  discountType?: PromotionDiscountType;
  discountValue?: number;
  discountMaxValue?: number;
  canUse?: boolean;
}

export interface PromotionTargetModel {
  type?: PromotionTargetType;
  targetIds?: string;
}

export interface PromotionPointOrderModel extends PromotionPointBaseModel {
  maxOrderValue?: number;
  minOrderValue?: number;
}

export interface PromotionPointCategoryModel extends PromotionPointBaseModel {
  productCateId?: string;
}

export interface PromotionPointProductModel extends PromotionPointBaseModel {
  minProduct?: number;
  maxProduct?: number;
  productId?: string;
  productDTO?: ProductModel;
}

export interface PromotionProductGiftModel {
  id?: string;
  minProduct?: number;
  maxProduct?: number;
  purchaseProductId?: string;
  purchaseProductDTO?: ProductModel;
  promotionGiftDetailDTOs?: PromotionGiftDetailModel[];
  canUse?: boolean;
}

export interface PromotionGiftDetailModel {
  id?: string;
  numProduct?: number;
  giftProductId?: string;
  giftProductDTO?: ProductModel;
}

export interface PromotionOrderBaseModel {
  id?: string;
  discountType?: PromotionDiscountType;
  discountValue?: number;
  discountMaxValue?: number;
  canUse?: boolean;
}

export interface PromotionOrderCategoryModel extends PromotionOrderBaseModel {
  productCategoryId?: string;
  minProduct?: number;
  maxProduct?: number;
}

export interface PromotionOrderProductModel extends PromotionOrderBaseModel {
  productId?: string;
  minProduct?: number;
  maxProduct?: number;
}

export interface PromotionOrderModel extends PromotionOrderBaseModel {
  maxOrderValue?: number;
  minOrderValue?: number;
}

export interface PromotionOrderGiftModel {
  id?: string;
  minimumTotalOrderAmount?: number;
  promotionGiftDetailDTOs?: PromotionGiftDetailModel[];
  canUse?: boolean;
}

export enum PromotionDiscountType {
  CASH = 'CASH',
  PERCENT = 'PERCENT',
}

export enum PromotionApplyChannel {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export enum PromotionTargetType {
  CUSTOMER = 'CUSTOMER',
  CUSTOMER_GROUP = 'CUSTOMER_GROUP',
  MEMBERSHIP = 'MEMBERSHIP',
}

export enum PromotionStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'INACTIVE',
}

export enum PromotionScope {
  ALL = 'ALL',
  SPECIFIC = 'SPECIFIC',
}

export enum PromotionType {
  ORDER_2_REDUCE = 'ORDER_2_REDUCE',
  ORDER_2_GIFT = 'ORDER_2_GIFT',
  ORDER_2_POINT = 'ORDER_2_POINT',
  ORDER_2_COUPON = 'ORDER_2_COUPON',
  PRODUCT_2_REDUCE = 'PRODUCT_2_REDUCE',
  PRODUCT_2_GIFT = 'PRODUCT_2_GIFT',
  PRODUCT_2_POINT = 'PRODUCT_2_POINT',
  PRODUCT_2_COUPON = 'PRODUCT_2_COUPON',
  PRODUCT_CATEGORY_2_REDUCE = 'PRODUCT_CATEGORY_2_REDUCE',
  REWARDS_REDEMPTION = 'REWARDS_REDEMPTION',
}

export interface PromotionCanUseRequest {
  organizationId?: string;
  totalPayment?: number;
  productRequests?: {
    productId?: string;
    quantity?: number;
  }[];
}
