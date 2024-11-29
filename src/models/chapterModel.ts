import { CommentModel } from './commentModel';

export interface ChapterModel {
  _id?: string;
  title?: string;
  bookId?: string;
  contentId?: string;
  images?: string[];
  text?: string[];
  mp3s?: string[];
  numberOfPage?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  allChapters?: ChapterModel[];
  comments: CommentModel[];
  bookType?: string;
}

export interface ChapterResponse {
  status: string;
  message: string;
  data: ChapterModel;
}
