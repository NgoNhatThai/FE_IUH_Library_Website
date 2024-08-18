import { UserModel } from './userModel';

export enum MembershipRankStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export interface MembershipRank {
  id?: string;
  backgroundMetadata?: BackGroundMetaData[];
  name?: string;
  minExpense?: number;
  conditionRule?: string;
  pointRedemptionRate?: number;
  conditionLabel?: string;
  conditionPrice?: number;
  percentDiscount?: number;
  status?: MembershipRankStatus;
  color?: string;
  customerDTOs: UserModel[];
}

export interface MemberHistoryResponse {
  customerId?: string;
  reason: string;
  data?: string;
  createdDate?: Date;
}

export interface BackGroundMetaData {
  downloadUrl?: string;
  id?: string;
}
