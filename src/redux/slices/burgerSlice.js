import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    toggleBurger: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleBurger } = burgerSlice.actions;

export default burgerSlice.reducer;
