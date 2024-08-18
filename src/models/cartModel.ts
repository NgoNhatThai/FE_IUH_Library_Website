import { ProductAddonRequest, ProductModel } from './productModel';

export interface CartModel {
  id?: string;
  createdDate?: string;
  modifiedDate?: string;
  unitPrice?: number;
  price?: number;
  productId?: string;
  quantity?: number;
  customerNote?: string;
  customerId?: string;
  productDTO?: ProductModel;
  exceedQuantity?: boolean;
  isSelected?: boolean;
  addOnsProduct?: ProductAddonRequest[];
}
