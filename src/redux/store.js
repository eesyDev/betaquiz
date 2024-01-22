import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import calendarReducer from './slices/calendarSlice';

const store = configureStore({
  reducer: {
    burger: burgerReducer,
    calendar: calendarReducer
  },
})

export default store