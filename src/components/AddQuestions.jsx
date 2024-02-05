import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { RadioGroup, Radio, FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";


import { TagInput, SelectFromExistingQuestions, QuestionModal, TagComponent } from '../components';
import { useCreateQuestionMutation, useEditQuestionMutation, useGetAllExistingQuestionsQuery } from '../services/questonsApi';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [subject, setSubject] = useState(1);
    const [classNumber, setClassNumber] = useState([3]);

    const dispatch = useDispatch();
    const { data: availableQuestions } = useGetAllExistingQuestionsQuery();


      // Загрузка сохраненных выбранных вопросов при перезагрузке компонента
      useEffect(() => {
        const storedSelectedQuestions = localStorage.getItem('selectedQuestions');
        if (storedSelectedQuestions) {
          const parsedSelectedQuestions = JSON.parse(storedSelectedQuestions);
      
          // Фильтрация вопросов, которые есть в availableQuestions
          const selectedQuestionsData = availableQuestions?.filter((question) =>
            parsedSelectedQuestions?.includes(Number(question.id))
          );

          console.log(selectedQuestionsData)

          selectedQuestionsData?.forEach((question) => {
            dispatch(addQuestion(question));
          });
        }
      }, [availableQuestions]);

    const [createQuestion] = useCreateQuestionMutation();
    const [editQuestion] = useEditQuestionMutation();
    const selectedTags = useSelector(state => state.tags.selectedTags);
    const tagIds = selectedTags.map(tag => tag.id);

    const modalRef = useRef(null);

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
    };

    const handleUpdateQuestion = async (id) => {
        const data = {
            title: currentQuestion,
            question_answers: [...currentAnswers],
        };

        try {
            const result = await editQuestion(id, data);
            dispatch(updateQuestion(result.data));
            handleCancelEdit();
        } catch (error) {
            console.error('Ошибка при обновлении вопроса', error);
        }
    };

    const handleRemoveQuestion = (question) => {
        // Получение текущего массива из localStorage
        const storedSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions')) || [];

        // // Фильтрация массива, чтобы удалить вопрос с определенным id
        const updatedQuestions = storedSelectedQuestions.filter((storageQuestion) => storageQuestion !== question);

        // // Сохранение обновленного массива обратно в localStorage
        localStorage.setItem('selectedQuestions', JSON.stringify(updatedQuestions));
        dispatch(removeQuestion(question));

    }

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

    const handleOpenModal = (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setSelectedQuestion(null);
        setIsModalOpen(false);
      };



    return (
        <div>
            <div className="added-questions">
                {
                    addedQuestions && addedQuestions?.map((question, index) => (
                        <div className="question-item">
                            {/* <div className="id">{question?.id}</div> */}
                            <div className='question-item-title'>{question?.title}</div>
                            <div className="question-item-bottom">
                                <div className="question-item-bottom-left">
                                    <button className='btn--rounded' onClick={() => handleEditQuestion(question.id)}><HiOutlinePencilSquare /></button>
                                    <button className='btn--rounded' onClick={() => handleRemoveQuestion(question.id)}><RiDeleteBin2Line /></button>
                                </div>
                                <a className='btn--transparent' onClick={() => handleOpenModal(question)}><FaRegEye /></a>
                            </div>
                        </div>
                    ))
                }
                {
                    isModalOpen && (
                        <QuestionModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} selectedQuestion={selectedQuestion}/>
                    )
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
            <div className="change-state__btns-wrap flex g-20">
                <div className="btn btn--solid-violet" onClick={() => setQform('new-question')}>Добавить новый вопрос</div>
                <div className="btn btn--outlined-violet" onClick={() => setQform('exs-question')}>Выбрать из существующих</div>
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