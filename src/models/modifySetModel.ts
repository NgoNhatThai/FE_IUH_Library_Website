export interface ModifySetModel {
  id?: string;
  maxQuantity?: number;
  minQuantity?: number;
  name?: string;
  allowMultipleQuantity?: boolean;
  countItems?: number;
  productModifyOptionDTOs?: ModifySetOptionModel[];
  productIds?: string[];
  organizationId?: string;
  orderNumber?: number;
}

export interface ModifySetOptionModel {
  id?: string;
  name?: string;
  price?: number;
  cost?: number;
  defaultSelected?: boolean;
  orderNumber?: number;
  costSetting?: boolean;
  organizationId?: string;
}
