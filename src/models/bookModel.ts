import { AuthorModel } from './authorModel';
import { CategoryModel } from './categoryModel';
import { ContentModel } from './contentModel';
import { MajorModel } from './majorModel';
import { ReviewModel } from './reviewModel';

export interface BookModel {
  _id?: string;
  title?: string;
  categoryId?: string | CategoryModel;
  authorId?: string | AuthorModel;
  majorId?: string | MajorModel;
  content?: string | ContentModel;
  review?: string | ReviewModel;
  limit?: string;
  image?: string;
  desc?: string;
  createDate?: Date;
  postDate?: Date;
  updateDate?: Date;
  price?: number;
  type?: string;
  status?: string;
}

export interface BookResponse {
  status: string;
  message: string;
  data: BookModel[];
}

export interface BookDetailResponse {
  status: string;
  message: string;
  data: BookModel;
}
