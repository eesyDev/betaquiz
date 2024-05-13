import React, { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

import { QuestionModal, EditQuestionModal } from '../components';
import { removeQuestion } from '../redux/slices/questionsSlice';

const QuestionItem = ({question, isAuthor, isDelete, selectedQuestions, handleCheckboxChange, isCheckbox}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const dispatch = useDispatch();


    const handleRemoveQuestion = (question) => {
        // Получение текущего массива из localStorage
        const storedSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions')) || [];

        // // Фильтрация массива, чтобы удалить вопрос с определенным id
        const updatedQuestions = storedSelectedQuestions.filter((storageQuestion) => storageQuestion !== question);

        // // Сохранение обновленного массива обратно в localStorage
        localStorage.setItem('selectedQuestions', JSON.stringify(updatedQuestions));
        dispatch(removeQuestion(question));

    }

    const handleOpenModal = (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
        setIsModalOpen(false);
    };

    const handleOpenEditModal = (question) => {
        setSelectedQuestion(question);
        setIsModalEditOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedQuestion(null);
        setIsModalEditOpen(false);
    };

  return (
    <div className="question-item">
        {/* <div className="id">{question?.id}</div> */}
        {isCheckbox && (
            <Checkbox
                checked={selectedQuestions?.includes(question?.id)}
                onChange={() => handleCheckboxChange(question)}
                className='checkbox-item'
              />
        )}
        <div className='question-item-title'>{question?.title}</div>
        <div className="question-item-bottom">
            {isAuthor || isDelete ?
                <div className="question-item-bottom-left">
                    {isAuthor &&
                    <button className='btn--rounded' onClick={() => handleOpenEditModal(question)}><HiOutlinePencilSquare /></button>
                    }
                    {isDelete && 
                    <button className='btn--rounded' onClick={() => handleRemoveQuestion(question.id)}><RiDeleteBin2Line /></button>
                    }
                    
                </div> : null
            }
            {isAuthor || isDelete ?
                <a className='btn--transparent' onClick={() => handleOpenModal(question)}><FaRegEye /></a> : <button className='btn btn--primary' onClick={() => handleOpenModal(question)}>Подробнее</button>
            }
        </div>
        {
            isModalOpen && (
                <QuestionModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} selectedQuestion={selectedQuestion} />
            )
        }
        {
            isModalEditOpen && (
                <EditQuestionModal isModalOpen={isModalEditOpen} handleCloseModal={handleCloseEditModal} selectedQuestion={selectedQuestion} />
            )
        }
    </div>
  )
}

export default QuestionItem