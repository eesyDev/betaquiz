import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import calendarReducer from './slices/calendarSlice';
import { postApi } from '../services/studentsApi';
import { authApi } from '../services/authApi';
import { teacherApi } from '../services/teacherApi';
import { registerApi } from '../services/registerApi';


const store = configureStore({
  reducer: {
    burger: burgerReducer,
    calendar: calendarReducer,
    [postApi.reducerPath] : postApi.reducer,
    [authApi.reducerPath] : authApi.reducer,
    [teacherApi.reducerPath] : teacherApi.reducer,
    [registerApi.reducerPath] : registerApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            authApi.middleware,
            teacherApi.middleware,
            registerApi.middleware
            ),
})

export default store