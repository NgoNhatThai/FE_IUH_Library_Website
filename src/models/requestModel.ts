import { BankConfig } from './bankConfigModel';
import { UserModel } from './userModel';

export interface Request {
  _id?: string;
  userId?: UserModel;
  amount?: number;
  date?: string;
  bankConfigId?: BankConfig;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  status?: string;
}
