import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiQuestionFill } from 'react-icons/ri';

import logo from '../img/logo.svg';
import logoCollapsed from '../img/BQ.svg';


const Sidebar = ({ isAddingQuiz }) => {
  const isOpen = useSelector((state) => state.burger.isOpen);

  const activeLink = 'active';
  const normalLink = 'normal';
  
  return (
    <div className={isOpen ? 'sidebar' : 'sidebar collapsed'}>
      <div className="sidebar__top">
        <div className="logo">
          <Link to='/'><img src={isOpen ? logo : logoCollapsed}/></Link>
        </div>
      </div>
      <div className="sidebar__body">
        <div className="sidebar__body-menu">
          <NavLink 
          to='/classes'
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <IoBookOutline/><span className={isOpen ? '' : 'collapsed'}>Уроки</span>
          </NavLink>
          <NavLink 
          to="/mygroups"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <GrGroup/><span className={isOpen ? '' : 'collapsed'}>Мои группы</span>
          </NavLink>
          <NavLink 
          to="/questions/all-questions"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <RiQuestionFill/><span className={isOpen ? '' : 'collapsed'}>Вопросы</span>
          </NavLink>
          <NavLink 
          to="/results"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <LuClipboardList/><span className={isOpen ? '' : 'collapsed'}>Результаты</span>
          </NavLink>
          <NavLink 
          to="/quizes"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdOutlineQuiz/>
            <span className={isOpen ? '' : 'collapsed'}>Квизы</span>
          </NavLink>
        </div>
        { isAddingQuiz && 
          <div className="sidebar__quiz-btns">
            <button className="btn btn--red">
              <AiOutlineQuestionCircle/>
              { isOpen ? <span>Добавить вопрос</span> : ''}
            </button>
            <button className="btn btn--green">
              <IoMdAddCircleOutline/>
              { isOpen ? <span>Опубликовать квиз</span> : ''}
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar