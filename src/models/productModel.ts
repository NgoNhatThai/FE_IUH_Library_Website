import {
  AttributeDisplayModel,
  AttributeModel,
  AttributeValueModel,
  CategoryModel,
  ImageModel,
  ModifySetModel,
  ProductComboModel,
  ProductTagModel,
  WarehouseModel,
} from '.';

export interface ProductModel {
  id?: string;
  _id?: string;
  parentId?: string;
  workspace?: string;
  merchantProductId?: number;
  productCategoryId?: string;
  code?: string;
  barcode?: string;
  name?: string;
  otherName?: string;
  importPrice?: number;
  oldPrice?: number;
  price?: number;
  wholesalePrice?: number;
  vat?: number;
  imageUrl?: string;
  images?: string[];
  avatarMetadata?: ImageModel[];
  coversMetadata?: ImageModel[];
  status?: ProductStatus;
  description?: string;
  content?: string;
  width?: number;
  length?: number;
  height?: number;
  weight?: number;
  quantityOnHand?: number;
  warrantyAddress?: string;
  warrantyPhone?: string;
  warranty?: string;
  warrantyContent?: string;
  createdDate?: string;
  modifiedDate?: string;
  productCategoryDTO?: CategoryModel;
  attributeDTOIds?: number[];
  attributeValueDTOIds?: number[];
  children?: ProductModel[];
  attributeValueDTOs?: AttributeValueModel[];
  attributeDisplayDTOs?: AttributeDisplayModel[];
  attributeValueIds?: string;
  attributes?: AttributeModel[];
  unit?: string;
  totalSales?: number;
  totalReturns?: number;
  tagIds?: string[];
  nhanhVnId?: string;
  tagDTOs?: ProductTagModel[];
  recommendedProductIds?: string[];
  addOnsProductIds?: string[];
  addOnsProducts?: ProductModel[];
  recommendedProducts?: ProductModel[];
  productCombos?: ProductComboModel[];
  modifySetDTOs?: ModifySetModel[];
  type?: ProductType;
  warehouseIds?: string[];
  warehouseDTO?: WarehouseModel;
  display?: boolean;
}

export interface ProductAddonRequest {
  productId?: string;
  quantity?: number;
  productDTO?: ProductModel;
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export enum ProductType {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  TOPPING = 'TOPPING',
  ACCESSORY = 'ACCESSORY',
  MEMBERSHIP = 'MEMBERSHIP',
  DIGITAL_DOWNLOAD = 'DIGITAL_DOWNLOAD',
  GIFT_CARD = 'GIFT_CARD',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FOOD = 'FOOD',
  SOFTWARE = 'SOFTWARE',
  BOOK = 'BOOK',
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  COMBO = 'COMBO',
}
