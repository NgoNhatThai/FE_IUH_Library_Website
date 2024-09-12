import { UserModal } from './userInfo';

export interface CommentModel {
  _id?: string;
  reviewId?: string;
  chapterId?: string;
  user?: string | UserModal;
  content?: string;
  postDate?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
