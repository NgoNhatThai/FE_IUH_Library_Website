export enum AuthorStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}
export interface AuthorModel {
  _id?: string;
  name?: string;
  desc?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  birthDate?: string;
  status?: AuthorStatus;
}
