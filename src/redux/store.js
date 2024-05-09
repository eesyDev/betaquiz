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
import { questionApi } from '../services/questonsApi';
import authReducer from './slices/authSlice';
import tagsReducer from './slices/tagsSlice';
import questionsReducer from './slices/questionsSlice';
import lessonsSlice from './slices/lessonsSlice';


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
    [questionApi.reducerPath] : questionApi.reducer,
    authSlice: authReducer,
    tags: tagsReducer,
    questions: questionsReducer,
    lessons: lessonsSlice,

  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // postApi.middleware,
            authApi.middleware,
            teacherApi.middleware,
            registerApi.middleware,
            teacherGroupApi.middleware,
            lessonsApi.middleware,
            studentsApi.middleware,
            questionApi.middleware,
            ),
})

export default store