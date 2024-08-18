export enum LocationType {
  CITY = 'CITY',
  DISTRICT = 'DISTRICT',
  WARD = 'WARD',
}

export interface Location {
  id: number;
  parentId: number;
  value: string;
  label: string;
  cityId: number;
  cityLocationId: number;
  districtId: number;
  districtLocationId: number;
  name: string;
}

export interface LocationReq {
  type?: LocationType;
  parentId?: number;
}

export interface LocationRes {
  code: number;
  message: string[];
  data: Location[];
}
