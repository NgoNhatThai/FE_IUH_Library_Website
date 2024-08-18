import { ImageModel } from './imageModel';

export interface ArticleModel {
  id?: string;
  body?: string;
  slug?: string;
  tag?: string[] | string;
  title?: string;
  quote?: string;
  author?: string;
  avatarId?: string;
  metaData?: string;
  category?: string[];
  searchText?: string;
  createdDate?: string;
  modifiedDate?: string;
  publishedDate?: string;
  status?: ArticleStatus;
  organizationId?: string;
  avatar?: ImageModel | string;
}

export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PUBLISH = 'PUBLISH',
  DELETED = 'DELETED',
  ONGOING = 'ONGOING',
}
