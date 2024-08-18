import { ProductModel } from './productModel';

export interface AttributeModel {
  id?: number;
  name?: string;
  code?: string;
  orderNumber?: number;
  description?: string;
  productAttributeValueDTOs?: AttributeValueModel[];
  productCategoryDTOs?: ProductModel[];
  productCategoryDTOIds?: number[];
  mustEnter?: boolean;
  attributesSelected?: string[];
}

export interface AttributeDisplayModel {
  attributeId?: string;
  attributeName?: string;
  orderNumber?: number;
  attributeValues?: AttributeValueDisplayModel[];
}

export interface AttributeValueDisplayModel {
  attributeValueId?: string;
  attributeValueName?: string;
  orderNumber?: number;
}

export interface AttributeValueModel {
  attributeValueId?: string;
  attributeValueName?: string;
}
