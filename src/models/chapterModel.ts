export interface ChapterModel {
  _id?: string;
  title?: string;
  bookId?: string;
  contentId?: string;
  images?: string[];
  mp3s?: string[];
  numberOfPage?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  allChapters?: ChapterModel[];
}

export interface ChapterResponse {
  status: string;
  message: string;
  data: ChapterModel;
}
