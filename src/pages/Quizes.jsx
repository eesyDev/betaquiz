import React, { useState, useEffect } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';

import { Header, Sidebar, QuizCard, Footer } from '../components';
import { quizesData } from '../data/data';
import { useGetAllExistingQuizQuery } from '../services/questonsApi';

const Quizes = ({ isOpen }) => {
	const [filteredQuizes, setFilteredQuizes] = useState(quizesData);
	const [subject, setSubject] = useState('');
	const [grade, setGrade] = useState('');
	const [group, setGroup] = useState('');

	const { data: quizes } = useGetAllExistingQuizQuery();

	console.log(quizes);

	const subjects = [...new Set(quizesData.map((quiz) => quiz.subject))];
	const grades = [...new Set(quizesData.map((quiz) => quiz.grade))];
	const groups = [...new Set(quizesData.map((quiz) => quiz.group))];


	const handleFilter = (grade, group, subject) => {
		const newFilteredQuizes = quizesData.filter((quiz) => {
		  return (
			(!grade || quiz.grade === grade) &&
			(!group || quiz.group === group) &&
			(!subject || quiz.subject === subject)
		  );
		});
		setFilteredQuizes(newFilteredQuizes);
	  };

	useEffect(() => {
		handleFilter(grade, group, subject);
	}, [grade, group, subject]);
	
  return (
    <div className={isOpen ? 'content with-sidebar quizes' : 'content with-sidebar quizes m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        <div className="inner">
          <h1 className="h1">Квизы</h1>
		  <div className="quizes__filter filter">
		  	<select value={grade} onChange={(e) => setGrade(e.target.value)}>
				<option value="">Сложность</option>
				{grades.map((subject) => (
				<option key={subject} value={subject}>
					{subject}
				</option>
				))}
			</select>
			<select value={subject} onChange={(e) => setSubject(e.target.value)}>
				<option value="">Предмет</option>
				{subjects.map((subject) => (
				<option key={subject} value={subject}>
					{subject}
				</option>
				))}
			</select>
			<select value={group} onChange={(e) => setGroup(e.target.value)}>
				<option value="">Класс</option>
				{groups.map((subject) => (
				<option key={subject} value={subject}>
					{subject}
				</option>
				))}
			</select>
			{/* <button className='filter' onClick={() => handleFilter(grade, group, subject)}>Filter</button> */}
		  </div>
          <div className='quizes__cards-wrapper'>
            {
              filteredQuizes.map((item, index) => (
                <QuizCard 
					key={index}
					grade={item.grade}
					author={item.author}
					createdAt={item.createdAt}
					subject={item.subject}
					theme={item.theme}
					group={item.group}
					icon={item.icon}
				/>
              ))
            }
          </div>
		  <Link to='/create-quiz' className="create-quiz-btn">
			<BsPencilSquare/>
		  </Link>
        </div>
		<Footer/>
      </div>
    </div>
  )
}

export default Quizes