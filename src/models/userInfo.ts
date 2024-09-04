export interface userInfo {
  userRaw: {
    _id: string;
    userName: string;
    avatar: string;
    studentCode: number;
    password: string;
    memberShip: string;
    refresh_token: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  access_token: string;
  refresh_token: string;
}
