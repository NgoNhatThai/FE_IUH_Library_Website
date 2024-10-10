export interface AmountModel {
  _id?: string;
  userId?: string;
  total?: number;
  history?: HistoryModel[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export interface HistoryModel {
  amount?: number;
  remain?: number;
  date?: string;
  _id?: string;
}
