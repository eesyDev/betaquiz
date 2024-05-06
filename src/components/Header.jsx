import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from'react-router-dom';
import { Link } from 'react-router-dom';
import { LuCalendarDays } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";

import { toggleBurger } from '../redux/slices/burgerSlice';
import { toggleCalendar } from '../redux/slices/calendarSlice';
import { logout } from '../redux/slices/authSlice';


const Header = () => {
	const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);

	const dispatch = useDispatch();
	const location = useLocation();

	console.log(location.pathname)

	const handleClick = () => {
	  dispatch(toggleBurger());
	};
	const handleCalendarClick = () => {
		dispatch(toggleCalendar());
	}

	const onClickLogout = async () => {
		try {
		  if (window.confirm('Вы уверены что хотите выйти?')) {
			dispatch(logout());
			window.localStorage.removeItem('token')
		  }
		} catch (err) {
		  console.error('Error logging out', err)
		}
	  }

  return (
    <header className='header'>
      <div className="wrapper">
		<div className="header__left">
			<div className="burger" onClick={handleClick}>
			<RxHamburgerMenu />
			</div>
			{
				location.pathname === '/classes' &&
				<div className="header__date" onClick={handleCalendarClick}>
				<div className="header__date-icon">
					<LuCalendarDays />
				</div>
				<span>21.02.2024</span>
				</div>
			}
		</div>
	  	
        <div className="header__user">
			{
				!isLoggedIn ? 
				<Link to='/login' className="header__user-login">
					<span>Войти</span>
					<div className="icon"><FiLogIn/></div>
				</Link> : 
				<div className="header__user-logout" onClick={onClickLogout}>
					<span>Выйти</span>
					<div className="icon"><FiLogOut/></div>
				</div>
			}
        </div>

      </div>
    </header>
  )
}

export default Header