import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import calendarReducer from './slices/calendarSlice';
import { postApi } from '../services/studentsApi';

const store = configureStore({
  reducer: {
    burger: burgerReducer,
    calendar: calendarReducer,
    [postApi.reducerPath] : postApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            ),
})

export default store