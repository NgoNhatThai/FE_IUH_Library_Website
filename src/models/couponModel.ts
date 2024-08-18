import { PromotionDiscountType } from './promotionModel';

export interface CouponModel {
  id?: string;
  code?: string;
  discountType?: PromotionDiscountType;
  discountValue?: number;
  discountMaxValue?: number;
  usageCount?: number;
  maxUsage?: number;
  releaseDate: string;
  status?: CouponStatus;
}

export enum CouponStatus {
  NEW = 'NEW',
  CANCEL = 'CANCEL',
  USAGE = 'USAGE',
  PUBLISH = 'PUBLISH',
}
