import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleCalendar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleCalendar } = calendarSlice.actions;

export default calendarSlice.reducer;
