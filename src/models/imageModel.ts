export interface ImageModel {
  id?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  downloadUrl?: string;
  large?: ImageSizeModel;
  medium?: ImageSizeModel;
  small?: ImageSizeModel;
}

export interface ImageSizeModel {
  url?: string;
  mimeType?: string;
  name?: string;
  width?: number;
  height?: number;
}
