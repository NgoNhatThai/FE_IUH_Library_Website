import { OrderCourierService } from '@/models';

export interface StoreConfig {
  id?: string;
  accumulatePointsForGifts?: string;
  cancellationReasons?: string[];
  expiredMonthReceiveGiftReferral?: number;
  hotline?: string;
  minimumFreeShipOrderTotalPriceLabel?: string;
  minimumFreeShipOrderTotalPriceValue?: number;
  newbieCommission?: number;
  referralCommission?: number;
  referralConversionRate?: number;
  shipPrice?: number;
  transferContent?: string;
  allowPurchaseWhenOutOfStock?: boolean;
  maxDayResetMembership?: number;
  onePointToMoney?: string;
  courierService?: OrderCourierService[];
  name?: string;
  phoneNumber?: string;
  address?: string;
  vat?: string;
}

