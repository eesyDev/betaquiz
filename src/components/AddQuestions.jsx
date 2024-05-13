import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


import { TagInput, SelectFromExistingQuestions, QuestionModal, EditQuestionModal, CreateQuestion, QuestionItem } from '../components';
import { useCreateQuestionMutation, useEditQuestionMutation, useGetAllExistingQuestionsQuery } from '../services/questonsApi';
import { addQuestion, editQuestion, updateQuestion, removeQuestion } from '../redux/slices/questionsSlice';


const AddQuestions = () => {
    const [qForm, setQform] = useState('new-question')
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [currentAnswers, setCurrentAnswers] = useState([{ title: '', correct: false },
    { title: '', correct: false },
    { title: '', correct: false },
    { title: '', correct: false },
    ]);

    const [activeButton, setActiveButton] = useState('new-question');
    const [toggleActive, setToggleActive] = useState(false);

    const [subject, setSubject] = useState(1);

    const [createQuestion] = useCreateQuestionMutation();
    const [editQuestion] = useEditQuestionMutation();
    const selectedTags = useSelector(state => state.tags.selectedTags);
    const tagIds = selectedTags.map(tag => tag.id);

    const addedQuestions = useSelector(state => state.questions.addedQuestions);
    const editedQuestion = useSelector(state => state.questions.editedQuestion);
    const classNumberState = useSelector(state => state.questions.class_number);

    const dispatch = useDispatch();
    const { data: availableQuestions } = useGetAllExistingQuestionsQuery();

    // Загрузка сохраненных выбранных вопросов при перезагрузке компонента
    useEffect(() => {
        const storedSelectedQuestions = localStorage.getItem('selectedQuestions');
        if (storedSelectedQuestions) {
            const parsedSelectedQuestions = JSON.parse(storedSelectedQuestions);

            // Фильтрация вопросов, которые есть в availableQuestions и которых ещё нет в addedQuestions
            const selectedQuestionsData = availableQuestions?.filter((question) =>
                parsedSelectedQuestions?.includes(Number(question.id)) &&
                !addedQuestions.some((addedQuestion) => addedQuestion.id === question.id)
            );

            selectedQuestionsData?.forEach((question) => {
                dispatch(addQuestion(question));
            });
        }
    }, [availableQuestions, addedQuestions, dispatch]);

    const handleUpdateQuestion = async (id) => {
        const data = {
            title: currentQuestion,
            question_answers: [...currentAnswers],
        };

        try {
            const result = await editQuestion(id, data);
            dispatch(updateQuestion(result.data));
        } catch (error) {
            console.error('Ошибка при обновлении вопроса', error);
        }
    };


    const handleCheckboxChange = (index) => {
        const newOptions = currentAnswers.map((answer, i) => ({
            ...answer,
            correct: i === index,
        }));
        setCurrentAnswers(newOptions);
    };


    const handleAddQuestion = async (event) => {
        event.preventDefault();
        const hasCorrectAnswer = currentAnswers.some(answer => answer.correct);

        const isAnyAnswerEmpty = currentAnswers.some((answer) => answer.title.trim() === '');

        if (qForm !== 'new-question') {
            return;
        }

        if (!classNumberState) {
            alert('Введите номер класса');
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
            class_number: [classNumberState],
            file: questionImage
        };

        try {
            const result = await createQuestion(data);
            dispatch(addQuestion({ ...result.data }));

            // Добавляем новый вопрос в localStorage
            const existingQuestions = JSON.parse(localStorage.getItem('selectedQuestions')) || [];
            const updatedQuestions = [...existingQuestions, result.data.id];
            localStorage.setItem('selectedQuestions', JSON.stringify(updatedQuestions));

        } catch (error) {
            console.error("Ошибка при создании вопроса", error);
        }
        setCurrentQuestion('');
        setCurrentAnswers(['', '', '', '']);
        setQuestionImage(null);
    }
    const handleButtonClick = (buttonKey) => {
        setActiveButton(buttonKey);  // Обновляем состояние активной кнопки
        setQform(buttonKey); 
        setToggleActive(!toggleActive);
    };

    return (
        <div>
            <div className="added-questions">
                {
                    addedQuestions && addedQuestions?.map((question, index) => (
                        <QuestionItem question={question} key={index} isDelete  isAuthor/>
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
                        <Button >Отмена</Button>
                    </div>
                )}
            </div>
            <div className={`change-state__btns-wrap flex g-20 switch-toggles ${toggleActive ? 'active' : ''}`}>
                <div 
                    className={`btn create-new ${activeButton === 'new-question' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('new-question')}
                >
                    Добавить новый вопрос
                </div>
                <div 
                    className={`btn add-existing ${activeButton === 'exs-question' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('exs-question')}
                >
                    Выбрать из существующих
                </div>
            </div>

            {
                qForm === 'new-question' ? (
                    <CreateQuestion 
                        currentQuestion={currentQuestion} 
                        setCurrentQuestion={setCurrentQuestion} 
                        currentAnswers={currentAnswers} 
                        setCurrentAnswers={setCurrentAnswers} 
                        handleCheckboxChange={handleCheckboxChange} 
                        handleAddQuestion={handleAddQuestion}/>
                    
                ) : <SelectFromExistingQuestions />
            }
        </div>
    )
}

export default AddQuestions