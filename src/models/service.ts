import { ImageModel } from './imageModel';
import { UserModel } from './userModel';
import { ProductModel } from '@/models';

export interface OrderServiceRequest {
  id?: string;
  customerId?: string;
  customerName?: string;
  requestDateTime?: string;
  completionDateTime?: string;
  attachedImages?: ImageModel[];
  customerNotes?: string;
  selectedPersonnelIds?: string[];
  assignedPersonnelIds?: string[];
  status?: OrderServiceStatus;
  organizationId?: string;
  removeAttachedImageIds?: string;
  serviceRequestItemDTOs?: OrderServiceItem[];
  selectedPersonnels?: UserModel;
  assignedPersonnels?: UserModel;
}

export interface OrderServiceItem {
  id?: string;
  productId?: string;
  name?: string;
  quantity?: number;
  unitPrice?: number;
  discountRequest?: string;
  productDTO?: ProductModel;
}

export enum OrderServiceStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
