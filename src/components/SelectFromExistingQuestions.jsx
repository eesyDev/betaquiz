import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import Masonry from 'react-masonry-css';

import { useGetAllExistingQuestionsQuery } from '../services/questonsApi';

import { addQuestion, editQuestion, updateQuestion, removeQuestion } from '../redux/slices/questionsSlice';
import QuestionItem from './QuestionItem';


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

  const breackpointColumnsObj = {
    default: 4,
  }

  return (
    <div className="questions">
        <h3 className="h3">Выбрать вопросы из существующих</h3>
        <div className='available-questions'>
        <Masonry 
            className='flex animate-slide-fwd masonry-layout'
            breakpointCols={breackpointColumnsObj}>
            {availableQuestions?.map((question, index) => (
            <QuestionItem question={question} key={index} isCheckbox={true} handleCheckboxChange={handleCheckboxChange} selectedQuestions={selectedQuestions}/>
          ))}
          </Masonry>
          
          <Button variant="contained" color="primary" onClick={handleAddQuestions}>
          Добавить выбранные вопросы
          </Button>
        </div>
    </div>
    
  );
};

export default SelectFromExistingQuestions;
