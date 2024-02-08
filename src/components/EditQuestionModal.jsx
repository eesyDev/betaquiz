import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { useCreateQuestionMutation, useGetAllExistingQuestionsQuery } from '../services/questonsApi';
import { addQuestion } from '../redux/slices/questionsSlice';


const EditQuestionModal = ({ selectedQuestion, handleCloseModal, isModalOpen }) => {
    const modalRef = useRef(null);
    const [currentAnswers, setCurrentAnswers] = useState(selectedQuestion?.question_answers || []);
    const [currentQuestion, setCurrentQuestion] = useState(selectedQuestion?.title || '');

    const [createEditedQuestion] = useCreateQuestionMutation();

    const addedQuestions = useSelector(state => state.questions.addedQuestions);
    const dispatch = useDispatch();
    const { data: availableQuestions } = useGetAllExistingQuestionsQuery();

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();

        const data = {
            title: currentQuestion,
            question_answers: [...currentAnswers],
            tags: selectedQuestion?.tags,
            subject: selectedQuestion?.subject,
            class_number: selectedQuestion?.class_number,
            file: selectedQuestion?.file
        };
        try {
            const result = await createEditedQuestion(data);
            const newQuestion = result.data;
            // существующие выбранные вопросы из локального хранилища
            const existingSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions')) || [];
            const newEdidtedQuestion = result.data.id;
            const updatedSelectedQuestions = [...existingSelectedQuestions, newEdidtedQuestion];
            localStorage.setItem('selectedQuestions', JSON.stringify(updatedSelectedQuestions));
            dispatch(addQuestion(newQuestion));
            handleCloseModal();

            } catch (error) {
                console.error('Ошибка при обновлении вопроса', error);
            }
        };

    console.log(addedQuestions)


        const handleClickOutsideModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        useEffect(() => {
            if (isModalOpen) {
                document.addEventListener('mousedown', handleClickOutsideModal);
            } else {
                document.removeEventListener('mousedown', handleClickOutsideModal);
            }
            return () => {
                document.removeEventListener('mousedown', handleClickOutsideModal);
            };
        }, [isModalOpen]);

        const handleCheckboxChange = (index) => {
            const newOptions = currentAnswers.map((answer, i) => ({
                ...answer,
                correct: i === index,
            }));
            setCurrentAnswers(newOptions);
            console.log(newOptions);
        };

        const handleChange = (e) => {
            const newTitle = e.target.value;
            setCurrentQuestion(newTitle);
        };

        return (
            <div className="modal lg-modal">
                <div className="modal-content" ref={modalRef}>
                    <h2 className="h2">Редактировать вопрос</h2>
                    <h4 className='title'><TextField value={currentQuestion} onChange={handleChange} /></h4>
                    <span className='vars-title'>Варианты ответа</span>
                    <ul>
                        {currentAnswers.map((answer, index) => (
                            <div key={index} className='option-variant-item' >
                                <TextField
                                    label={`Вариант ${index + 1}`}
                                    value={answer?.title ?? ''}
                                    onChange={(e) => {
                                        const newOptions = [...currentAnswers];
                                        newOptions[index] = { ...newOptions[index], title: e.target.value };
                                        setCurrentAnswers(newOptions);
                                    }}
                                    fullWidth
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={answer.correct}
                                        color="success"
                                        sx={{ fontSize: "14px" }}
                                        onChange={() => handleCheckboxChange(index)}
                                    />}
                                    label={`Правильный ответ`}
                                    sx={{ width: "25%" }}
                                />
                            </div>
                        ))}
                    </ul>
                    <button type="submit" className='btn btn--primary' onClick={handleUpdateQuestion}>Update</button>
                    <button className='btn--transparent' onClick={handleCloseModal}><IoIosClose /></button>
                </div>
            </div>
        )
    }

    export default EditQuestionModal
