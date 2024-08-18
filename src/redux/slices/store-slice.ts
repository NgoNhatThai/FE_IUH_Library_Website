import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { OrganizationModel, StoreConfig } from '@/models';
import { storeService } from '@/services/storeService';

type initialStateType = {
  storeConfig: StoreConfig;
  storeInfo: OrganizationModel;
  stores: OrganizationModel[];
};

const initialState: initialStateType = {
  storeConfig: {},
  stores: [],
  storeInfo: {},
};

export const getStoreConfigById = createAsyncThunk(
  'store-config',
  async (storeId: string, { dispatch }) => {
    try {
      const storeConfigData = await storeService.getConfigById(storeId);
      dispatch(setStoreConfig(storeConfigData));
    } catch (error) {
      console.log('Error when get user info:', error);
    }
  },
);

export const getListStores = createAsyncThunk(
  'stores',
  async (_, { dispatch }) => {
    try {
      const storeConfigData = await storeService.getAll();
      dispatch(setStores(storeConfigData));

      if (!!storeConfigData?.[0]?.id) {
        dispatch(setStoreInfo(storeConfigData[0]));
        dispatch(getStoreConfigById(storeConfigData[0].id));
      }
    } catch (error) {
      console.log('Error when get user info:', error);
    }
  },
);

const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
    setStoreConfig: (state, action) => {
      state.storeConfig = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setStoreInfo: (state, action) => {
      state.storeInfo = action.payload;
    },
  },
});

const { reducer, actions } = storeSlice;

export const { setStoreConfig, setStores, setStoreInfo } = actions;

export default reducer;
