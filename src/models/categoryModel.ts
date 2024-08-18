import { ImageModel } from './imageModel';
import { ProductModel } from './productModel';

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export interface CategoryModel {
  id?: string;
  workspace?: string;
  parentId?: number | null;
  name?: string;
  order?: number;
  code?: string;
  description?: string;
  image?: Blob | string;
  imageUrl?: string;
  avatarMetadata?: ImageModel[];
  status?: CategoryStatus;
  children?: CategoryModel[];
  productDTOs?: ProductModel[];
  display?: boolean;
  area?: string;
}
