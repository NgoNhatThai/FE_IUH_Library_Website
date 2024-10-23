export interface userInfo {
  userRaw: UserModal;
  access_token: string;
  refresh_token: string;
}
export interface UserResponse {
  data: userInfo;
  message: string;
}

export interface UserModal {
  _id: string;
  userName: string;
  avatar: string;
  studentCode: number;
  password: string;
  memberShip: string;
  isManager?: boolean;
  refresh_token: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
