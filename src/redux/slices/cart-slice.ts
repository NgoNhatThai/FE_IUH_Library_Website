import { ItemCartModel } from '@/models/itemCartModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  checkList: ItemCartModel[];
  total: number;
}

const initialState: InitialStateType = {
  checkList: [],
  total: 0,
};

const checkListSlice = createSlice({
  name: 'checkList',
  initialState,
  reducers: {
    addCheckListItem: (state, action: PayloadAction<ItemCartModel>) => {
      state.checkList.push(action.payload);
      state.total++;
    },
    setFullListItems: (state, action: PayloadAction<ItemCartModel[]>) => {
      state.checkList = action.payload;
      state.total = action.payload.length;
    },
    removeCheckListItem: (state, action: PayloadAction<{ id: string }>) => {
      state.checkList = state.checkList.filter(
        (item) => item.id !== action.payload.id,
      );
      state.total--;
    },
    removeFullItems: (state) => {
      state.checkList = [];
      state.total = 0;
    },
    removeListItems: (state, action: PayloadAction<string[]>) => {
      state.checkList = state.checkList.filter(
        (item) => !action.payload.includes(item.id),
      );
      state.total = state.checkList.length;
    },
    getCheckList: (state, action: PayloadAction<ItemCartModel[]>) => {
      state.checkList = action.payload;
      state.total = action.payload.length;
    },
    modifyQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      state.checkList = state.checkList.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
    },
  },
});

const { reducer, actions } = checkListSlice;

export const {
  addCheckListItem,
  removeCheckListItem,
  setFullListItems,
  removeFullItems,
  removeListItems,
  modifyQuantity,
  getCheckList
} = actions;

export default reducer;
