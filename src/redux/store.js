import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import calendarReducer from './slices/calendarSlice';
// import { postApi } from '../services/studentsApi';
import { authApi } from '../services/authApi';
import { teacherApi } from '../services/teacherApi';
import { registerApi } from '../services/registerApi';
import { teacherGroupApi } from '../services/teacherGroupApi';
import { lessonsApi } from '../services/lessonsApi';
import { studentsApi } from '../services/studentsApi';
import authReducer from './slices/authSlice';


const store = configureStore({
  reducer: {
    burger: burgerReducer,
    calendar: calendarReducer,
    // [postApi.reducerPath] : postApi.reducer,
    [authApi.reducerPath] : authApi.reducer,
    [teacherApi.reducerPath] : teacherApi.reducer,
    [registerApi.reducerPath] : registerApi.reducer,
    [teacherGroupApi.reducerPath] : teacherGroupApi.reducer,
    [lessonsApi.reducerPath] : lessonsApi.reducer,
    [studentsApi.reducerPath] : studentsApi.reducer, 
    authSlice: authReducer

  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // postApi.middleware,
            authApi.middleware,
            teacherApi.middleware,
            registerApi.middleware,
            teacherGroupApi.middleware,
            lessonsApi.middleware,
            studentsApi.middleware
            ),
})

export default store