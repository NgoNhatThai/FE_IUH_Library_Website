import { ImageModel } from './imageModel';

export interface OrganizationModel {
  id?: string;
  address?: string; //
  provinceId?: string; //
  districtId?: string; //
  wardId?: string; //
  countryCode?: string; //
  createdDate?: string | Date | null;
  introduction?: string;
  logoMetadata?: ImageModel[];
  modifiedDate?: string | Date | null;
  name?: string; //
  phoneNumber?: string; //
  vat?: string;
  workspace?: string;
  longitude?: string; //
  latitude?: string; //
  status?: OrganizationStatus;
  licenseType?: OrganizationLicenseType; //
  businessModel?: OrganizationBusinessType; //
  industry?: OrganizationIndustryType; //
  managementDTOs?: OrganizationManagement[]; // Các organization đang quản lí
  managementUser?: OrganizationManager; // Thông tin người quản lí organization
  sapoStoreId?: string;
  token?: string;
  logo?: string | Blob;
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum OrganizationLicenseType {
  LLC1 = 'LLC1', //Công ty TNHH 1
  LLC2 = 'LLC2', // Công ty TNHH 2
  JOINSTOCK = 'JOINSTOCK', // Công ty cổ phần
  PARTNER = 'PARTNER', // Công ty đối tác
  PRIVATE = 'PRIVATE', // Công ty tư nhân
  PERSONAL = 'PERSONAL', // Công ty TNHH MTV
}

export enum OrganizationBusinessType {
  DIRECT_SALES = 'DIRECT_SALES',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FREEMIUM = 'FREEMIUM',
  FRANCHISOR = 'FRANCHISOR',
  SUB_FRANCHISOR = 'SUB_FRANCHISOR',
  SUB_FRANCHISEE = 'SUB_FRANCHISEE',
  B2B = 'B2B',
  B2C = 'B2C',
  C2C = 'C2C',
  SAAS = 'SAAS',
  MANUFACTURING = 'MANUFACTURING',
  RETAIL = 'RETAIL',
  OTHERS = 'OTHERS ',
}

export enum OrganizationIndustryType {
  FNB = 'FNB', //Food and Beverage Department (ngành thực phẩm và dịch vụ ăn uống)
  ECOM = 'ECOM', // thương mại
  TECH = 'TECH', // công nghệ
  HEALTH = 'HEALTH', // sức khoẻ
  FIN = 'FIN', // finance: tài chính
  EDU = 'EDU', // giáo dục
  REAL_ESTATE = 'REAL_ESTATE', // bất động sản
  RETAIL = 'RETAIL', // Bán lẻ
  OTHER = 'OTHER',
}

export interface OrganizationManagement {
  id?: number;
  managedOrganizationId?: number;
  createdDate?: string | Date | null;
}

export interface OrganizationManager {
  id?: string;
  address?: string;
  avatarMetadata?: ImageModel[];
  birthday?: string;
  createdDate?: string;
  fullName?: string;
  modifiedDate?: string;
  phoneNumber?: string;
  email?: string;
  status?: string;
  username?: string;
  organizationId?: string;
  organizationDTO?: OrganizationModel;
  roleId?: string;
}
