export interface ZaloArticleModel {
  id: string;
  type: ZaloPostType;
  title: string;
  status: string;
  totalView: number;
  totalShare: number;
  thumb: string;
  linkView: string;
  createdDate: string;
  updatedDate: string;
}

export interface ZaloPostRequest {
  type?: string;
  pageSize?: number;
  pageIndex?: number;
}

export interface ZaloPostResponse {
  error: number;
  message: string;
  data: ZaloPostResponseData;
}

export interface ZaloPostResponseData {
  medias: ZaloArticleModel[];
  total: number;
}

export enum ZaloPostType {
  NORMAL = 'normal',
  VIDEO = 'video',
}
