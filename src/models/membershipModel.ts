import { ImageModel, UserModel } from '@/models';

export interface MembershipModel {
  id?: string;
  backgroundMetadata?: ImageModel;
  conditionRule?: MembershipConditionRule;
  maxExpense?: number;
  minExpense?: number;
  name?: string;
  status?: MembershipStatus;
  textColor?: string;
  customerDTOs?: UserModel;
  organizationId?: string;
  modifiedDate?: string;
  createdDate?: string;
  pointRedemptionRate?: number;
  existingCustomer?: boolean;
}

export enum MembershipConditionRule {
  MONTH_AVERAGE = 'MONTH_AVERAGE',
  CUMULATIVE_TOTAL = 'CUMULATIVE_TOTAL',
  MONTH_TOTAL = 'MONTH_TOTAL',
}

export enum MembershipStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum TypePointHistory {
  ADD = 'ADD',
  SUCCESS = 'SUCCESS',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
}
