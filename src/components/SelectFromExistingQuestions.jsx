import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useGetAllExistingQuestionsQuery } from '../services/questonsApi';

import { addQuestion, editQuestion, updateQuestion, removeQuestion } from '../redux/slices/questionsSlice';


const SelectFromExistingQuestions = ({ onSelect }) => {
  const {data: availableQuestions} = useGetAllExistingQuestionsQuery();
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
    const selectedQuestionsData = availableQuestions.filter((question) =>
      selectedQuestions.includes(question.id)
    );
    selectedQuestionsData.forEach((question) => {
        dispatch(addQuestion(question));
      });
    
      setSelectedQuestions([]);
    // console.log(selectedQuestionsData)
    // dispatch(addQuestion(selectedQuestionsData));
    // setSelectedQuestions([]);
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
