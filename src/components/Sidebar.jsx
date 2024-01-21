import React from 'react';
import { Link } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import logo from '../img/logo.svg';


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar__top">
        <div className="logo">
          <img src={logo}/>
        </div>
        <div className="burger">
          <RxHamburgerMenu />
        </div>
      </div>
      <div className="sidebar__body">
        <ul className="sidebar__body-menu">
          <li><Link to="/classes"><IoBookOutline/><span>Classes</span></Link></li>
          <li><Link to="/mygroups"><GrGroup/><span>My Groups</span></Link></li>
          <li><Link to="/results"><LuClipboardList/><span>Results</span></Link></li>
          <li><Link to="/quizes"><MdOutlineQuiz/><span>Quizes</span></Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar