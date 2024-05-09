import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lessons: []
};

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        setLessons(state, action) {
            state.lessons = action.payload;
        }
    }
});

export const { setLessons } = lessonsSlice.actions;

export default lessonsSlice.reducer;
