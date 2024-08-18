export interface FileUpload {
  bannerType?: BannerType;
  createdDate?: string;
  generatedName?: string;
  id?: number;
  link?: string;
  mimeType?: string;
  originalName?: string;
  path?: string;
  redirectId?: number;
  size?: number;
  thumbnail?: string;
  thumbnailPath?: string;
  thumbnailSize?: number;
}

export interface Banner extends FileUpload {
  title: string;
  description: string;
}

export enum BannerType {
  SALE_PACKAGE = 'SALE_PACKAGE',
  NEW_PRODUCT = 'NEW_PRODUCT',
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
  NEWS = 'NEWS',
}

export enum UploadMediaType {
  PROFILES = 'PROFILES',
  PRODUCTS = 'PRODUCTS',
  BANNERS = 'BANNERS',
  CMS = 'CMS',
  SAPO = 'SAPO',
  NHANHVN = 'NHANHVN',
  KIOTVIET = 'KIOTVIET',
  HARAVAN = 'HARAVAN',
  OTHER = 'OTHER',
}
