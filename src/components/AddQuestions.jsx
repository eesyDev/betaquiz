import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { RadioGroup, Radio, FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';

import { TagInput } from '../components';
import { useCreateQuestionMutation } from '../services/questonsApi';


const AddQuestions = () => {
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [currentAnswers, setCurrentAnswers] = useState([  { title: '', correct: false },
                                                            { title: '', correct: false },
                                                            { title: '', correct: false },
                                                            { title: '', correct: false },
                                                        ]);
    const [tags, setTags] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [subject, setSubject] = useState(1);
    const [classNumber, setClassNumber] = useState([3]);

    const [createQuestion] = useCreateQuestionMutation();
    const selectedTags = useSelector(state => state.tags.selectedTags);
    const tagIds = selectedTags.map(tag => tag.id);

    const handleCheckboxChange = (index) => {
        const newOptions = currentAnswers.map((answer, i) => ({
            ...answer,
            correct: i === index,
        }));
        setCurrentAnswers(newOptions);
    };

    console.log(tagIds);

    const handleAddQuestion = async (event) => {
        event.preventDefault(); 
        const hasCorrectAnswer = currentAnswers.some(answer => answer.correct);

        const isAnyAnswerEmpty = currentAnswers.some((answer) => answer.title.trim() === '');

        if (isAnyAnswerEmpty) {
            alert('Введите все варианты ответа');
            return;
        }
        
        if (!currentQuestion) {
            alert('Заголовок');
            return;
        }
        if (!hasCorrectAnswer) {
            alert('Выберите правильный вариант ответа');
            return;
        }

        const data = {
            title: currentQuestion,
            question_answers: [...currentAnswers],
            tags: [...tagIds],
            subject: subject,
            class_number: [...classNumber],
            file: questionImage
          };
          console.log(data);

          try {
            const result = await createQuestion(data);
            
            console.log(result);

        } catch (error) {
            console.error("Ошибка при создании вопроса", error);
        }
        setQuestions((prevQuestions) => [...prevQuestions, data]);
        setCurrentQuestion('');
        setCurrentAnswers(['', '', '', '']);
        setQuestionImage(null);
    }

  return (
    <div>
        <TextField
            label="Введите вопрос"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            fullWidth
            // error={Boolean(!currentQuestion)}
            // helperText={'empty'}
        />
        <TagInput/>
        <input
            type="file"
            onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setQuestionImage(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
            }}
        />
        {questionImage && (
            <img src={questionImage} alt="Question" style={{ maxWidth: '100%', maxHeight: '200px', width: '400px', objectFit: 'cover'}} />
        )}
        <Box mt={4}>
            {[...Array(4)].map((option, index) => (
            <div key={index} className='option-variant-item' >
                <TextField
                    label={`Вариант ${index + 1}`}
                    value={currentAnswers[index]?.title ?? ''}
                    // error={Boolean(!currentAnswers[index])}
                    // helperText={'empty'}
                    onChange={(e) => {
                    const newOptions = [...currentAnswers];
                    newOptions[index] = { ...newOptions[index], title: e.target.value };
                    setCurrentAnswers(newOptions);
                    }}
                    fullWidth
                />
                <FormControlLabel
                    control={<Checkbox
                    checked={currentAnswers[index].correct}
                    color="success"
                    sx={{fontSize: "14px"}}
                    onChange={() => handleCheckboxChange(index)}
                    />}
                    label={`Правильный ответ`}
                    sx={{width: "25%"}}
                />
            </div>
            ))}
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddQuestion}>
            Добавить вопрос
        </Button>
    </div>
  )
}

export default AddQuestions