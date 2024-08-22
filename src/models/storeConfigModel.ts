export interface StoreConfig {
  // id?: string;
  // accumulatePointsForGifts?: string;
  // cancellationReasons?: string[];
  // expiredMonthReceiveGiftReferral?: number;
  // hotline?: string;
  // minimumFreeShipOrderTotalPriceLabel?: string;
  // minimumFreeShipOrderTotalPriceValue?: number;
  // newbieCommission?: number;
  // referralCommission?: number;
  // referralConversionRate?: number;
  // shipPrice?: number;
  // transferContent?: string;
  // allowPurchaseWhenOutOfStock?: boolean;
  // maxDayResetMembership?: number;
  // onePointToMoney?: string;
  // courierService?: OrderCourierService[];
  // phoneNumber?: string;
  // vat?: string;

  // new
  _id?: string;
  name?: string;
  address?: string;
  desc?: string;
  logo?: string;
  email?: string;
  banner?: string[];
  categories?: string[];
  linkWebsite?: string;
  phone?: string;
}
