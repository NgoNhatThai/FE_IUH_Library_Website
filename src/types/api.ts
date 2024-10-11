export interface SearchParams {
  searchText?: string;
  pageIndex?: number;
  pageSize?: number;
  status?: string;
  sortBy?: string;
  createFrom?: string;
  createTo?: string;
  ascending?: boolean;
  customerIds?: string;
  [key: string]: any;
  organizationId?: string;
}

export interface PostResponse<T> {
  avatarMetadata?: string;
  linkDTOs: T[];
  name?: string;
  slugs?: string;
}

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

export interface SignRequest {
  token: string;
  phoneNumber?: string;
  zaloMiniAppId?: string;
}

export interface GetPhoneNumber {
  number?: string;
  token?: string;
}

export interface GetLocation {
  /** latitude */
  latitude?: string;
  /** longitude */
  longitude?: string;
  /** timestamp */
  timestamp?: string;
  /** provider */
  provider?: string;
  token?: string;
}

export interface UpdatePhoneNumberOrLocation {
  token?: string;
  phoneNumber?: string | null;
  locationDTO?: {
    provider?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    timestamp?: string | null;
  };
}

export enum QueryKey {
  PRODUCT = 'PRODUCT',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CATEGORY = 'CATEGORY',
  CATEGORY_CHILD = 'CATEGORY_CHILD',
  CATEGORY_COMBO = 'CATEGORY_COMBO',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  CART = 'CART',
  LOCATION_CITY = 'LOCATION_CITY',
  LOCATION_DISTRICT = 'LOCATION_DISTRICT',
  LOCATION_WARD = 'LOCATION_WARD',
  SUBSCRIPTION = 'SUBSCRIPTION',
  ORDER = 'ORDER',
  HOME = 'HOME',
  FAQS = 'FAQS',
  BANNER = 'BANNER',
  BANNER_VOUCHER = 'BANNER_VOUCHER',
  CALCULATE = 'CALCULATE',
  SALE = 'SALE',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  PRODUCT_PAID = 'PRODUCT_PAID',
  TOTAL_ORDER = 'TOTAL_ORDER',
  SALE_DETAIL = 'SALE_DETAIL',
  MEMBERSHIP_RANK = 'MEMBERSHIP_RANK',
  PRODUCT_SEARCH = 'PRODUCT_SEARCH',
  NOTIFICATION = 'NOTIFICATION',
  NOTIFICATION_UNREAD = 'NOTIFICATION_UNREAD',
  BANK_APP = 'BANK_APP',
  SYSTEM_CONFIG = 'SYSTEM_CONFIG',
  ORAGANIZATION_CONFIG = 'ORAGANIZATION_CONFIG',
  POINT_HISTORY = 'POINT_HISTORY',
  USER = 'USER',
  CMS = 'CMS',
  VOUCHER_FOLLOW_OA = 'VOUCHER_FOLLOW_OA',
  HOME_CONFIG_DATA = 'HOME_CONFIG_DATA',
  USER_DELIVERY = 'USER_DELIVERY',
  ZALO_POST = 'ZALO_POST',
  PROMOTION_CAN_USE = 'PROMOTION_CAN_USE',
  PROMOTION = 'PROMOTION',
  POLICIES = 'POLICIES',
  ZAPP = 'ZAPP',
  REQUEST = 'REQUEST',
  CONFIG = 'CONFIG',
  USER_AMOUNT = 'USER_AMOUNT',
  USER_BOOKMARK = 'USER_BOOKMARK',
  BOOK = 'BOOK',
}

export enum SearchKey {
  PRODUCT = 'PRODUCT',
}

export interface ZaloCreateOrder {
  amount: number;
  item?: { id: string; amount: number }[];
  desc: string;
  extradata?: any;
  payload?: any;
  method?: any;
}

export interface CreateOrderReturns {
  orderId: string;
}

export interface BaseApiResponse<T> {
  error: number;
  message: string;
  data: T;
}
