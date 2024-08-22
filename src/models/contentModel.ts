import { ChapterModel } from './chapterModel';

export interface ContentModel {
  _id?: string;
  numberOfChapter?: number;
  chapters?: ChapterModel[];
}
