export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}
export interface CategoryResponse {
  status: string;
  message: string;
  data: CategoryModel[];
}
export interface CategoryModel {
  _id?: string;
  name?: string;
  desc?: string;
  image?: string;
  status?: CategoryStatus;
  createdAt?: string;
  updatedAt?: string;
  children?: CategoryModel[];
  avatarMetadata?: any; // Add this line
}
