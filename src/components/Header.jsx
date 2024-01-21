import React from 'react';
import { LuCalendarDays } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";


const Header = () => {
	const isLoggedIn = true
  return (
    <header className='header'>
      <div className="wrapper">
        <div className="header__date">
          <div className="header__date-icon">
            <LuCalendarDays />
          </div>
		<span>21.02.2024</span>
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