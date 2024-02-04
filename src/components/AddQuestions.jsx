import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { RadioGroup, Radio, FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TagInput, SelectFromExistingQuestions } from '../components';
import { useCreateQuestionMutation, useEditQuestionMutation } from '../services/questonsApi';
import { addQuestion, editQuestion, updateQuestion, removeQuestion } from '../redux/slices/questionsSlice';


const AddQuestions = () => {
    const [qForm, setQform] = useState('exs-question')
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [currentAnswers, setCurrentAnswers] = useState([{ title: '', correct: false },
    { title: '', correct: false },
    { title: '', correct: false },
    { title: '', correct: false },
    ]);
    const [questions, setQuestions] = useState([]);
    const [subject, setSubject] = useState(1);
    const [classNumber, setClassNumber] = useState([3]);

    const dispatch = useDispatch();

    const [createQuestion] = useCreateQuestionMutation();
    const [editQuestion] = useEditQuestionMutation();
    const selectedTags = useSelector(state => state.tags.selectedTags);
    const tagIds = selectedTags.map(tag => tag.id);

    const addedQuestions = useSelector(state => state.questions.addedQuestions);
    const editedQuestion = useSelector(state => state.questions.editedQuestion);
    const classNumberState = useSelector(state => state.questions.class_number);


    const handleEditQuestion = (question) => {
        dispatch(editQuestion(question));
        setCurrentQuestion(question.title);
        setCurrentAnswers(question.question_answers);
        setSubject(question.subject);
    };

    const handleCancelEdit = () => {
        dispatch(editQuestion(null));
        // setCurrentQuestion('');
        // setCurrentAnswers([]);
        // setSubject(1);
        // setClassNumber([3]);
    };

    const handleUpdateQuestion = async (id) => {
        const data = {
            title: currentQuestion,
            question_answers: [...currentAnswers],
            // Другие поля, если есть
        };

        try {
            const result = await editQuestion(id, data);
            dispatch(updateQuestion(result.data));
            handleCancelEdit(); // Сбросьте состояние формы после успешного обновления
        } catch (error) {
            console.error('Ошибка при обновлении вопроса', error);
        }
    };

    const handleRemoveQuestion = (question) => {
        console.log(question);
        dispatch(removeQuestion(question));
    }

    const handleCheckboxChange = (index) => {
        const newOptions = currentAnswers.map((answer, i) => ({
            ...answer,
            correct: i === index,
        }));
        setCurrentAnswers(newOptions);
    };

    console.log(addedQuestions);

    const handleAddQuestion = async (event) => {
        event.preventDefault();
        const hasCorrectAnswer = currentAnswers.some(answer => answer.correct);

        const isAnyAnswerEmpty = currentAnswers.some((answer) => answer.title.trim() === '');

        if (qForm !== 'new-question') {
            // Выбрана другая форма, не выполняем проверку
            return;
        }

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
            class_number: classNumberState,
            file: questionImage
        };

        try {
            const result = await createQuestion(data);
            dispatch(addQuestion({ ...result.data }));


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
            <div className="change-state__btns-wrap flex g-20">
                <div className="btn btn--secondary" onClick={() => setQform('new-question')}>Добавить новый вопрос</div>
                <div className="btn btn--green" onClick={() => setQform('exs-question')}>Выбрать из существующих</div>
            </div>
            <div className="added-questions">
                {
                    addedQuestions && addedQuestions?.map((question, index) => (
                        <div className="question-item">
                            <div className="id">{question?.id}</div>
                            <div>{question?.title}</div>
                            <ul>
                                {question?.question_answers?.map((answer, index) => (
                                    <li key={index}>{answer?.title}</li>
                                ))}
                            </ul>
                            <Button onClick={() => handleEditQuestion(question.id)}>Редактировать</Button>
                            <Button onClick={() => handleRemoveQuestion(question.id)}>Удалить</Button>
                        </div>
                    ))
                }
                {editedQuestion && (
                    <div>
                        <TextField
                            label="Редактировать вопрос"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            fullWidth
                        />
                        <Button onClick={handleUpdateQuestion}>Обновить вопрос</Button>
                        <Button onClick={handleCancelEdit}>Отмена</Button>
                    </div>
                )}
            </div>
            {
                qForm === 'new-question' ? (

                    <div className="new-queston">
                        <TextField
                            label="Введите вопрос"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            fullWidth
                        />
                        <TagInput />
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
                            <img src={questionImage} alt="Question" style={{ maxWidth: '100%', maxHeight: '200px', width: '400px', objectFit: 'cover' }} />
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
                                            sx={{ fontSize: "14px" }}
                                            onChange={() => handleCheckboxChange(index)}
                                        />}
                                        label={`Правильный ответ`}
                                        sx={{ width: "25%" }}
                                    />
                                </div>
                            ))}
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                            Добавить вопрос
                        </Button>
                    </div>
                ) : <SelectFromExistingQuestions />
            }
        </div>
    )
}

export default AddQuestions