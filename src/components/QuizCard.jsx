import React from 'react';
import { MdCalendarMonth } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";


const QuizCard = ({subject, theme, grade, author, icon, group, createdAt}) => {
    const gradeColor = grade === 'Легкий' ? '#69F0AE' :
        grade === 'Средний' ? '#FFE57F' : '#F44336'

  return (
    <div className='quiz-card'>
        <div className="quiz-card__top">
            <div className="grade"><span className='grade-color' style={{backgroundColor: gradeColor}}></span>{grade}</div>
            <div className="info">
                <div className="date"><MdCalendarMonth/> {createdAt}</div>
                <div className="author"><FaUserCircle/> {author}</div>
            </div>
        </div>
        <div className="quiz-card__icon"><img src={icon} alt="" /></div>
        <div className="quiz-card__bottom">
            <div className="subject">{subject}</div>
            <div className="theme">{theme}</div>
            <div className="group">Класс: {group}</div>
        </div>
    </div>
  )
}

export default QuizCard