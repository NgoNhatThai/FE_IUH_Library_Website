export interface BookModel {
  _id?: string;
  title?: string;
  categoryId?: string;
  authorId?: string;
  majorId?: string;
  content?: string;
  review?: string;
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
