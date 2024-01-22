import React from 'react';
import { useDispatch } from 'react-redux';
import { LuCalendarDays } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";

import { toggleBurger } from '../redux/slices/burgerSlice';
import { toggleCalendar } from '../redux/slices/calendarSlice';

const Header = () => {
	const isLoggedIn = true;
	const dispatch = useDispatch();

	const handleClick = () => {
	  dispatch(toggleBurger());
	};
	const handleCalendarClick = () => {
		dispatch(toggleCalendar());
	}
  return (
    <header className='header'>
      <div className="wrapper">
		<div className="header__left">
			<div className="burger" onClick={handleClick}>
			<RxHamburgerMenu />
			</div>
			<div className="header__date" onClick={handleCalendarClick}>
			<div className="header__date-icon">
				<LuCalendarDays />
			</div>
			<span>21.02.2024</span>
			</div>
		</div>
	  	
        <div className="header__user">
			{
				!isLoggedIn ? 
				<div className="header__user-login">
					<span>Log in</span>
					<div className="icon"><FiLogIn/></div>
				</div> : 
				<div className="header__user-logout">
					<span>Мағжан Жұмабай</span>
					<div className="icon"><FiLogOut/></div>
				</div>
			}
        </div>

      </div>
    </header>
  )
}

export default Header