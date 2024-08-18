
export interface ZAppModel {
  id?: number;
  createdDate?: string;
  modifiedDate?: string;
  name?: string;
  themeConfig?: string;
  zaloMiniAppId?: string;
}

export interface ThemeConfig {
  light?: ThemeMode;
  dark?: ThemeMode;
  shortName?: string;
}

export interface ImageConfig {
  width?: number;
  height?: number;
  radius?: number;
  borderWidth?: number;
  borderColor?: string;
  [key: string]: any;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  border: string;
  text: string;
  default: string;
  mix: string;
}

export interface ThemeMode {
  color: ThemeColors;
  product: ImageConfig;
  slider: ImageConfig;
  article: ImageConfig;
  category: ImageConfig;
}

export enum ZAppStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETE = 'DELETE',
}
