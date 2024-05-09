import React from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";
import { LuUserCircle2 } from "react-icons/lu";
import { FaRegCircleCheck, FaQuestion, FaRegBookmark, FaBookmark } from "react-icons/fa6";


const QuestionCard = ({ question: {title, author, question_answers, tags}, onTagClick, toggleFavorite, isFavorite }) => {
    console.log(isFavorite)
    return (
        <div className='question-card'>
            <div className="question-card__title">
                <div className="title-q"><FaQuestion/></div>
                {title}
            </div>
            <div className="question-card__inner">
                <div className='question-card__answers'>
                    {question_answers?.map((answer) => (
                        <div key={answer?.id} className={answer?.correct ? 'question-card__answer correct' : "question-card__answer"}>
                            {answer?.correct ? <FaRegCircleCheck /> : <MdOutlineCancel />}
                            {answer?.title}
                        </div>
                    ))}
                </div>
                <div className="question-card__tags">
                    {tags?.map((tag, index) => (
                        <span key={index} onClick={() => onTagClick(tag)}>#{tag}</span>
                    ))}
                </div>
                <div className="question-card__btns">
                    <button className='btn btn--primary'>Купить</button>
                    <button onClick={toggleFavorite} className='btn btn--outlined-secondary'>
                        {
                            isFavorite? <div><FaBookmark /> В избранном</div> : 
                            <div><FaRegBookmark /> В избранное</div>
                        }
                        
                    </button>
                </div>
            </div>

        </div>
    )
}

export default QuestionCard