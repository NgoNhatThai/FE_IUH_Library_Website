export interface ReviewModel {
  _id?: string;
  bookId?: string;
  totalLike?: number;
  totalView?: number;
  comments?: string[];
  rate?: number;
  rating?: string[];
  createdAt?: string;
  updatedAt?: string;
}
