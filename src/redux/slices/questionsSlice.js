import { createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    addedQuestions: [],
    editedQuestion: null,
    class_number: null,
  },
  reducers: {
    addQuestion: (state, action) => {
      state.addedQuestions.push(action.payload);
    },
    editQuestion: (state, action) => {
      state.editedQuestion = action.payload;
    },
    updateQuestion: (state, action) => {
      const index = state.addedQuestions.findIndex(question => question.id === action.payload.id);
      if (index !== -1) {
        state.addedQuestions[index] = action.payload;
        state.editedQuestion = null;
      }
    },
    removeQuestion: (state, action) => {
      state.addedQuestions = state.addedQuestions.filter(question => question.id !== action.payload);
    },
    addClassNumber: (state, action) => {
        state.class_number = action.payload
    },
    clearAddedQuestions: (state) => {
      state.addedQuestions = [];
  }
  },
});

export const { addQuestion, editQuestion, updateQuestion, removeQuestion, addClassNumber, clearAddedQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
