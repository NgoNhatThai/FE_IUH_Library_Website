import { ImageModel } from './imageModel';
import { MembershipModel } from './membershipModel';

export enum UserDeliveryType {
  PERSONAL = 'PERSONAL',
  ORGANIZATION = 'ORGANIZATION',
}

export interface UserDeliveryAddress {
  countryCode?: string;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
  id?: string;
  phoneNumber?: string;
  fullName?: string;
  location?: string;
  customerId?: string;
  default?: boolean;
  type?: UserDeliveryType;
}

export interface UserModel {
  id?: string;
  _id?: string;
  organizationId?: string;
  address?: string;
  affiliateCode?: string;
  avatarMetadata?: ImageModel[];
  birthday?: string;
  createdDate?: string;
  fullName?: string;
  currentPoint?: number;
  modifiedDate?: string;
  nhanhvnId?: string;
  phoneNumber?: string;
  memberCode?: string;
  email?: string;
  referrerCode?: string;
  status?: UserStatus;
  username?: string;
  gender?: UserGender;
  zaloAccessToken?: string;
  longitude?: string;
  latitude?: string;
  lastTimeVisit?: string;
  totalConsumerSpending?: number;
  totalOrder?: number;
  password?: string;
  membershipDTO?: string;
  currentMembership?: MembershipModel;
  totalAmountPurchased?: number;
  customerDeliveryAddressDTOs?: UserDeliveryAddress[];
  avatar?: string;
  userName?: string;
  studentCode?: number;
  refresh_token?: string;
  historyId?: string;
  memberShip?: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
}

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
