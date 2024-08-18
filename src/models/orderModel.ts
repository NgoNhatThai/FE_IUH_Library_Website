import {
  ProductAddonRequest,
  ProductModel,
  PromotionModel,
  UserDeliveryAddress,
  UserModel,
} from '@/models';

export interface OrderModel {
  id?: string;
  orderCode?: string;
  cancellationReason?: string;
  createdDate?: string;
  membershipLevelDiscount?: number;
  modifiedDate?: string;
  note?: string;
  paymentImage?: string;
  paymentMethod?: OrderPaymentMethod;
  recipientAddress?: string;
  recipientProvince?: string;
  recipientDistrict?: string;
  recipientFullName?: string;
  recipientPhoneNumber?: string;
  recipientWard?: string;
  orderStatus?: OrderStatus;
  transitStatus?: OrderTransitStatus;
  totalAmount?: number;
  totalMoneyDiscount?: number;
  totalOldProductPrice?: number;
  totalPayment?: number;
  totalMoneyDiscountFromPoint?: number;
  totalPointReceiveByOrder?: number;
  totalPointReceiveByVoucher?: number;
  shipFee?: number;
  quantity?: number;
  nhanhVnId?: string;
  shipDiscount?: number;
  totalShipFeeIsPayable?: number;
  totalUsePoint?: number;
  couponCodes?: string[];
  organizationId?: number;
  customerName?: string;
  receivingLocation?: OrderReceivingLocation;
  pickupDate?: string;
  customerDTO?: UserModel;
  productDTOs?: ProductAddonRequest[];
  courierService?: OrderCourierService;
  customerOrderDetailDTOs?: CustomerOrderDetail[];
}

export interface OrderRequest {
  organizationId?: string;
  paymentMethod?: OrderPaymentMethod;
  cartItemIds?: string[];
  productId?: string;
  quantity?: number;
  product?: ProductModel;
  addOnsProduct?: string;
  note?: string;
  receivingLocation?: OrderReceivingLocation;
  customerDeliveryAddressId?: string;
  customerDeliveryAddress?: UserDeliveryAddress;
  couponCodes?: string[];
  promotionOrderRequest?:
    | Record<string, { id?: string; promotion: PromotionModel }>
    | Array<Record<string, string>>;
  rewardsRedemptionGifts?: RewardsRedemptionGifts[];
  pickupDate?: string;
  zaloOrderId?: string;
  courierService?: OrderCourierService | string;
}

export interface OrderCalculateRequest extends OrderRequest {}

export interface OrderCalculateResponse {
  couponCodeHasBeenApplieds?: string;
  gifts?: string[];
  shipDiscount?: number;
  shipFee?: number;
  totalAmount?: number;
  totalMoneyDiscount?: number;
  totalMoneyDiscountFromPoint?: number;
  totalOldProductPrice?: number;
  totalPayment?: number;
  totalPointReceiveByVoucher?: number;
  totalShipFeeIsPayable?: number;
  surcharges?: OrderSurcharge[];
}

export interface OrderSurcharge {
  surchargeId?: string;
  surchargeName?: string;
  total?: number;
}

export interface RewardsRedemptionGifts {
  giftId?: string;
  quantity?: number;
}

export interface CustomerOrderDetail {
  productCurrentPrice?: number;
  quantity?: number;
  customerNote?: string;
  totalProductPrice?: string;
  purchaseType?: CustomerOrderPurchaseType;
  addOnsProductDTOs?: OrderAddOnProduct[];
  product?: ProductModel;
  rewardsRedemption?: boolean;
  id?: string;
}

export interface OrderAddOnProduct {
  quantity?: number;
  totalPrice?: number;
  productId?: string;
  productDTO?: ProductModel;
}

export enum OrderStatus {
  ALL = '',
  NEW = 'NEW',
  WAITING_CONFIRM = 'WAITING_CONFIRM',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  WAITING_PICKUP = 'WAITING_PICKUP',
  SHIPPING = 'SHIPPING',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
  RETURNED = 'RETURNED',
}

export enum OrderTransitStatus {
  CANCELED = 'CANCELED',
  NOT_RECEIVED = 'NOT_RECEIVED',
  RECEIVED = 'RECEIVED',
  PICKED_UP = 'PICKED_UP',
  ON_DELIVERY = 'ON_DELIVERY',
  DELIVERED_NOT_SETTLED = 'DELIVERED_NOT_SETTLED',
  SETTLED = 'SETTLED',
  FAILED_TO_PICKUP = 'FAILED_TO_PICKUP',
  POSTPONED_PICKUP = 'POSTPONED_PICKUP',
  FAILED_TO_DELIVER = 'FAILED_TO_DELIVER',
  DELIVERY_DELAY = 'DELIVERY_DELAY',
  SETTLED_RETURN = 'SETTLED_RETURN',
  DISPATCHING_PICKUP = 'DISPATCHING_PICKUP',
  RETURNED = 'RETURNED',
  RETURN_IN_PROGRESS = 'RETURN_IN_PROGRESS',
  RETURNED_COMPLETE = 'RETURNED_COMPLETE',
  SHIPPER_REPORT_PICKED_UP = 'SHIPPER_REPORT_PICKED_UP',
  SHIPPER_REPORT_FAILED_TO_PICKUP = 'SHIPPER_REPORT_FAILED_TO_PICKUP',
  SHIPPER_REPORT_PICKUP_DELAY = 'SHIPPER_REPORT_PICKUP_DELAY',
  SHIPPER_REPORT_DELIVERED = 'SHIPPER_REPORT_DELIVERED',
  SHIPPER_REPORT_FAILED_TO_DELIVER = 'SHIPPER_REPORT_FAILED_TO_DELIVER',
  SHIPPER_REPORT_DELIVERY_DELAY = 'SHIPPER_REPORT_DELIVERY_DELAY',
}

export enum OrderCourierService {
  GHTK = 'GHTK',
  GHN = 'GHN',
  VIETTEL = 'VIETTEL',
  VNPOST = 'VNPOST',
  JnT = 'JnT',
  NINJA_VAN = 'NINJA_VAN',
  BEST = 'BEST',
  GRAB = 'GRAB',
  NOW = 'NOW',
  AHA_MOVE = 'AHA_MOVE',
}

export enum OrderReceivingLocation {
  STORE = 'STORE',
  HOUSE = 'HOUSE',
}

export enum OrderPaymentMethod {
  COD = 'COD',
  GATEWAY = 'GATEWAY',
}

export enum CustomerOrderPurchaseType {
  PAYMENT = 'PAYMENT',
  GIFT = 'GIFT ',
}

export interface CountStatusOrder {
  CANCELED?: number;
  SHIPPING?: number;
  NEW?: number;
  WAITING_PICKUP?: number;
  WAITING_CONFIRM?: number;
}
export interface ReorderStatus {}
