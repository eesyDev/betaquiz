import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";

import logo from '../img/logo.svg';
import logoCollapsed from '../img/BQ.svg';


const Sidebar = () => {
  const isOpen = useSelector((state) => state.burger.isOpen);

  const activeLink = 'active';
  const normalLink = 'normal';
  
  return (
    <div className={isOpen ? 'sidebar' : 'sidebar collapsed'}>
      <div className="sidebar__top">
        <div className="logo">
          <img src={isOpen ? logo : logoCollapsed}/>
        </div>
      </div>
      <div className="sidebar__body">
        <div className="sidebar__body-menu">
          <NavLink 
          to='/classes'
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <IoBookOutline/><span className={isOpen ? '' : 'collapsed'}>Classes</span>
          </NavLink>
          <NavLink 
          to="/mygroups"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <GrGroup/><span className={isOpen ? '' : 'collapsed'}>My Groups</span>
          </NavLink>
          <NavLink 
          to="/results"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <LuClipboardList/><span className={isOpen ? '' : 'collapsed'}>Results</span>
          </NavLink>
          <NavLink 
          to="/quizes"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdOutlineQuiz/>
            <span className={isOpen ? '' : 'collapsed'}>Quizes</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar