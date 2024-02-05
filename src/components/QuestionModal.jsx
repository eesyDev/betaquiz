import React, { useEffect, useRef } from 'react';
import { IoIosClose } from "react-icons/io";


const QuestionModal = ({selectedQuestion, handleCloseModal, isModalOpen}) => {

    const modalRef = useRef(null);

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

  return (
    <div className="modal">
          <div className="modal-content" ref={modalRef}>
            {/* Добавьте здесь отображение данных выбранного вопроса */}
            <h4 className='title'>{selectedQuestion?.title}</h4>
            <span className='vars-title'>Варианты ответа</span>
            <ul>
                {selectedQuestion?.question_answers?.map((answer, index) => (
                    <li key={index}><span className={`indicator ${answer?.correct ? 'green' : 'red'}`}></span>{answer?.title}</li>
                ))}
            </ul>
            <button className='btn--transparent' onClick={handleCloseModal}><IoIosClose/></button>
          </div>
        </div>
  )
}

export default QuestionModal