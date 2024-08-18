// import { ItemCartModel } from '@/models/itemCartModel';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThemeConfig } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface InitialStateType {
//   checkList: ItemCartModel[];
//   total: number;
// }

// const initialState: InitialStateType = {
//   checkList: [],
//   total: 0,
// };

// const checkListSlice = createSlice({
//   name: 'checkList',
//   initialState,
//   reducers: {
//     addCheckListItem: (state, action: PayloadAction<ItemCartModel>) => {
//       state.checkList.push(action.payload);
//       state.total++;
//     },
//     setFullListItems: (state, action: PayloadAction<ItemCartModel[]>) => {
//       state.checkList = action.payload;
//       state.total = action.payload.length;
//     },
//     removeCheckListItem: (state, action: PayloadAction<{ id: string }>) => {
//       state.checkList = state.checkList.filter(
//         (item) => item.id !== action.payload.id,
//       );
//       state.total--;
//     },
//     removeFullItems: (state) => {
//       state.checkList = [];
//       state.total = 0;
//     },
//     removeListItems: (state, action: PayloadAction<string[]>) => {
//       state.checkList = state.checkList.filter(
//         (item) => !action.payload.includes(item.id),
//       );
//       state.total = state.checkList.length;
//     },
//     getCheckList: (state, action: PayloadAction<ItemCartModel[]>) => {
//       state.checkList = action.payload;
//       state.total = action.payload.length;
//     },
//     modifyQuantity: (
//       state,
//       action: PayloadAction<{ id: string; quantity: number }>,
//     ) => {
//       state.checkList = state.checkList.map((item) =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item,
//       );
//     },
//   },
// });

// const { reducer, actions } = checkListSlice;

// export const {
//   addCheckListItem,
//   removeCheckListItem,
//   setFullListItems,
//   removeFullItems,
//   removeListItems,
//   modifyQuantity,
//   getCheckList
// } = actions;

// export default reducer;
interface InitialStateType {
    themeConfig: ThemeConfig;
}
const initialState: InitialStateType = {
    themeConfig: {
        light: {
            color: {
                primary: '#FF8922',
                secondary: '#FF8922',
                background: '#FFFFFF',
                foreground: '#FFFFFF',
                default: '#FFFFFF',
                text: '#333333',
                border: '#E5E5E5',
                mix: '#FFFFFF'
            },
            slider: {
                height: 9,
                width: 16,
                radius: 0,
                borderWidth: 0,
                borderColor: '#FFFFFF'
            },
            product: {
                height: 4,
                width: 3,
                radius: 0,
                borderWidth: 0,
                borderColor: '#FFFFFF'
            },
            category: {
                height: 3,
                width: 4,
                radius: 0,
                borderWidth: 0,
                borderColor: '#FFFFFF'
            },
            article: {
                height: 3,
                width: 4,
                radius: 0,
                borderWidth: 0,
                borderColor: '#FFFFFF'
            }
        },
        dark: {
            color: {
                primary: '#FF8922',
                secondary: '#FF8922',
                background: '#333333',
                foreground: '#333333',
                default: '#333333',
                text: '#FFFFFF',
                border: '#4A4A4A',
                mix: '#333333'
            },
            slider: {
                height: 9,
                width: 16,
                radius: 0,
                borderWidth: 0,
                borderColor: '#333333'
            },
            product: {
                height: 4,
                width: 3,
                radius: 0,
                borderWidth: 0,
                borderColor: '#333333'
            },
            category: {
                height: 3,
                width: 4,
                radius: 0,
                borderWidth: 0,
                borderColor: '#333333'
            },
            article: {
                height: 3,
                width: 4,
                radius: 0,
                borderWidth: 0,
                borderColor: '#333333'
            }
        }
    }
};
const themeConfigSlice = createSlice({
    name: 'themeConfig',
    initialState,
    reducers: {
        setThemeConfig: (state, action: PayloadAction<ThemeConfig>) => {
            state.themeConfig = action.payload;
        }
    }
});
const { reducer, actions } = themeConfigSlice;
export const { setThemeConfig } = actions;
export default reducer;
