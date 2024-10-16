import { Key, ReactNode } from 'react';

import { Dayjs } from 'dayjs';

export interface SearchParams {
  zappId?: string;
  organizationId?: string | null;
  searchText?: string;
  pageIndex?: number | string;
  pageSize?: number | string;
  status?: any;
  sortBy?: Key;
  createFrom?: string;
  createTo?: string;
  ascending?: boolean;
  limitProduct?: number;
  name?: string;
  code?: string;
  // saleScope?: VoucherSaleScope;
  // promotionType?: VoucherPromotionType;
  membershipIds?: string[];
  fromStartDate?: string | null;
  toEndDate?: string | null;
  fromDate?: string | null | EventValue<Dayjs>;
  toDate?: string | null | EventValue<Dayjs>;
  isRewardsRedemption?: boolean;
  [key: string]: any;
}

export enum StatusType {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export enum ProductStatusType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED ',
}

export enum SocketEventType {
  NOTIFICATION = 'Notification',
  ORDER = 'Order',
}

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface ListResponse<T> {
  content: T[];
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements?: number;
  empty: boolean;
}

export interface DataProps {
  [key: string]: any;
}

export interface Pagination {
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
  numberOfElements?: number;
  pageSize?: number;
  pageNumber?: number;
  [key: string]: any;
}

export enum LocationEnum {
  CITY = 'CITY',
  DISTRICT = 'DISTRICT',
  WARD = 'WARD',
}

export type SortType =
  | 'name'
  | 'startDate'
  | 'endDate'
  | 'status'
  | 'type'
  | 'price'
  | 'oldPrice'
  | 'newPrice'
  | 'fullName'
  | 'phoneNumber'
  | 'birthday'
  | 'address'
  | 'orderCode'
  | 'recipientFullName'
  | 'totalPayment'
  | 'paymentMethod'
  | 'orderStatus'
  | 'receivingLocation'
  | 'pickupDate'
  | 'customerOrderDetailDTOs'
  | 'customerName'
  | 'sentDate'
  | 'createdDate'
  | 'createdDate'
  | 'earnings'
  | 'remaining'
  | 'mlmLevel'
  | 'registrationDate'
  | 'level'
  | 'requestDateTime'
  | 'totalSpend'
  | 'minExpense'
  | 'pointRedemptionRate'
  | 'description'
  | 'title'
  | 'targetType'
  | 'promotionCode';

export interface SelectOptionType {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface LocationType {
  type?: number | string;
  parentId?: number | string;
}

export interface OptionsBase {
  label?: ReactNode;
  value?: string;
}
export interface Parameters {
  pageIndex?: number;
  pageSize?: number;
}

export interface LocationItemType {
  cityId: number;
  cityLocationId: number;
  districtId: number;
  districtLocationId: number;
  id: number;
  name: string;
  parentId: number;
}

export interface LocationResponseType {
  code?: number;
  messages?: string[];
  data?: LocationItemType[];
}

export enum ModalType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  INFORMATION = 'INFORMATION',
}

export interface ValidationError {
  error?: string;
  message?: string;
  path?: string;
  status?: number;
  timestamp?: string;
}

export interface ErrorExceptionCode {
  INTERNAL_SERVER_ERROR: 500;
}

export enum ErrorStatus {
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

export interface ErrorResponse {
  message: string;
  status: ErrorStatus;
}

export interface SortTableType<T> {
  key?: keyof T | Key;
  asc?: boolean;
}

export interface ImageDataModel {
  url?: string;
  name?: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export enum ImageGroupType {
  PROFILES = 'PROFILES',
  PRODUCTS = 'PRODUCTS',
  BANNERS = 'BANNERS',
  CMS = 'CMS',
  SAPO = 'SAPO',
  NHANHVN = 'NHANHVN',
  KIOTVIET = 'KIOTVIET',
  HARAVAN = 'HARAVAN',
  TEMPLATE = 'TEMPLATE',
  OTHERS = 'OTHERS',
}

export interface ImageType {
  id: string;
  width: number;
  height: number;
  mimeType: string;
  downloadUrl: string;
  [key: string]: any;
  large: ImageDataModel;
  medium: ImageDataModel;
  small: ImageDataModel;
}

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;

export interface SendNotificationModalType {
  id: Key;
  visible: boolean;
}

export enum NotificationMarketingRecipientType {
  ALL_CUSTOMER = 'ALL_CUSTOMER',
  CUSTOMER = 'CUSTOMER',
  CUSTOMER_GROUP = 'CUSTOMER_GROUP',
  MEMBERSHIP = 'MEMBERSHIP',
}

export enum NotificationMarketingTargetType {
  PRODUCT = 'PRODUCT',
  PROMOTION = 'PROMOTION',
}

export enum NotificationMarketingStatus {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAIL = 'FAIL',
}

export enum NotificationMarketingChannels {
  EMAIL = 'EMAIL',
  ZNS = 'ZNS',
  OA = 'OA',
  SMS = 'SMS',
}
