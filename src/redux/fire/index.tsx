import { createSlice } from '@reduxjs/toolkit';

interface FireState {
  isFired: boolean;
}

const initialState: FireState = {
  isFired: false,
};

const fireSlice = createSlice({
  name: 'fire',
  initialState,
  reducers: {
    fireAction: (state) => {
      state.isFired = true;
    },
    extinguishAction: (state) => {
      state.isFired = false;
    },
  },
});

export const { fireAction, extinguishAction } = fireSlice.actions;

export default fireSlice.reducer;
