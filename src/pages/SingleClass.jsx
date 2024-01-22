import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GrGroup } from "react-icons/gr";

import { Header, Sidebar } from '../components';



const SingleClass = ({isOpen}) => {
  return (
    <div className={isOpen ? 'content with-sidebar single-class' : 'content with-sidebar single-class m-less'}>
        <Sidebar/>
        <div className="container">
            <Header/>
            <div className="inner">
              	<h1 className='h1'>Урок ALA_M_6KOY_A (5) Математика</h1>
				<div className="single-class__info layer">
					<div className="single-class__top">
						<div className="single-class__heading blue">
							<IoMdInformationCircleOutline /> <span>Информация об уроке</span>
						</div>
						<ul>
							<li className="single-class__list-title">
								<span className="date">Дата</span>
								<span className="time">Время</span>
								<span className="group">Группа</span>
								<span className="class">Урок</span>
							</li>
							<li className="single-class__list-item">
								<span className="date">30.05.2023</span>
								<span className="time">08:45 — 10:15</span>
								<span className="group">ALA_M_6KOY_A(5)</span>
								<span className="class">Математика</span>
							</li>
						</ul>
					</div>
					<div className="single-class__group">
						<div className="single-class__heading lilac">
							<GrGroup /> <span>Группа ALA_M_6KOY_A5</span>
						</div>
						<ol className="pupil">
							<li>Абдулдаев Мағжан (9 лет)  </li>
							<li>Дамир Қайратұлы</li>
							<li>Дуйсен Сара (11 лет +6мес)</li>
							<li>Linda Concao</li>
						</ol>
					</div>
				</div>
            </div>
        </div>
    </div>
  )
}

export default SingleClass