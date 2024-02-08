import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useGetAllExistingQuestionsQuery } from '../services/questonsApi';

import { addQuestion, editQuestion, updateQuestion, removeQuestion } from '../redux/slices/questionsSlice';


const SelectFromExistingQuestions = ({ onSelect }) => {
  const { data: availableQuestions } = useGetAllExistingQuestionsQuery();
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const dispatch = useDispatch();


  const handleCheckboxChange = (question) => {
    const isChecked = selectedQuestions.includes(question.id);

    if (isChecked) {
      setSelectedQuestions((prevSelected) => prevSelected.filter((id) => id !== question.id));
    } else {
      setSelectedQuestions((prevSelected) => [...prevSelected, question.id]);
    }
  };

  const handleAddQuestions = () => {
    // существующие выбранные вопросы из локального хранилища
    const existingSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions')) || [];

    // Фильтруем новые выбранные вопросы, чтобы убрать уже существующие
    const newSelectedQuestions = selectedQuestions.filter(questionId => !existingSelectedQuestions.includes(questionId));
    // Объединяем существующие выбранные вопросы с новыми выбранными вопросами
    const updatedSelectedQuestions = [...existingSelectedQuestions, ...newSelectedQuestions];
      // Сохраняем обновленные выбранные вопросы в локальном хранилище
    localStorage.setItem('selectedQuestions', JSON.stringify(updatedSelectedQuestions));

    const selectedQuestionsData = availableQuestions.filter((question) =>
      newSelectedQuestions.includes(question.id)
    );
    selectedQuestionsData.forEach((question) => {
      dispatch(addQuestion(question));
    });

    setSelectedQuestions([]);
  };

  return (
    <FormControl fullWidth>
      <FormGroup>
        {availableQuestions?.map((question) => (
          <FormControlLabel
            key={question.id}
            control={
              <Checkbox
                checked={selectedQuestions.includes(question.id)}
                onChange={() => handleCheckboxChange(question)}
              />
            }
            label={question.title}
          />
        ))}
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleAddQuestions}>
        Добавить выбранные вопросы
      </Button>
    </FormControl>
  );
};

export default SelectFromExistingQuestions;
