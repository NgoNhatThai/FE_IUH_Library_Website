import { userInfo } from '@/models/userInfo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  userRaw: {};
  access_token: string;
  refresh_token: string;
}

const initialState: InitialStateType = {
  userRaw: {},
  access_token: '',
  refresh_token: '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<userInfo>) => {
      state.userRaw = action.payload.userRaw;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
  },
});

const { reducer, actions } = userInfoSlice;

export const { setUserInfo } = actions;

export default reducer;
