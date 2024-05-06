import React, { useState, useEffect } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GrGroup } from "react-icons/gr";
import { Link, useParams } from 'react-router-dom';

import { Header, Sidebar, Footer } from '../components';
import { useGetSubjectByIdQuery } from '../services/lessonsApi';
import { useGetTeacherGroupsQuery } from '../services/teacherGroupApi';
import { useGetGroupStudentsQuery } from '../services/teacherGroupApi';



const SingleClass = ({isOpen}) => {
    const { id } = useParams();
	const [lesson, setlessons] = useState([]);
	const [groups, setGroups] = useState([]);
	const [students, setStudents] = useState([]);

	const { data: groupsData } = useGetTeacherGroupsQuery();
	const { data: lessonData, isFetching } = useGetSubjectByIdQuery({lesson_id: id, status: 0});
	
  
	useEffect(() => {
	  if (groupsData) {
		setGroups(groupsData?.items);
	  }
	}, [groupsData]);

	useEffect(() => {
		if (lessonData) {
			setlessons(lessonData?.items)
		}
	}, [lessonData]);


	const linkTwoArrs = (lesson, groups) => {
		// Проверяем, является ли lessons массивом
		if (!Array.isArray(lesson)) {
		  const linkedGroups = (lesson?.group_ids || []).map(groupId => {
			const group = groups?.find(group => group?.id === groupId);
			return group ? { id: group.id, name: group.name } : null;
		  }).filter(Boolean);
	  
		  return {
			...lesson,
			groups: linkedGroups,
		  };
		}
	  
		// Если lessons - массив, применяем предыдущую логику
		return lesson?.map(cls => {
		  const linkedGroups = (cls?.group_ids || []).map(groupId => {
			const group = groups?.find(group => group?.id === groupId);
			return group ? { id: group.id, name: group.name } : null;
		  }).filter(Boolean);
	  
		  return {
			...cls,
			groups: linkedGroups,
		  };
		});
	  };


	  
	const classesWithGroups = linkTwoArrs(lesson, groups);
	const groupId = classesWithGroups[0]?.group_ids[0]

	const { data: studentsData, isFetching: isStudentsFetching } = useGetGroupStudentsQuery({group_ids: [groupId]});

	useEffect(() => {
		if (studentsData) {
			setStudents(studentsData)
		}
	}, [studentsData]);

	const linkLessonAndStudents = (lesson, students) => {
		// Проверяем, является ли lessons массивом
		if (!Array.isArray(lesson)) {
		  const linkedStudents = (lesson.details || []).map(studentId => {
			const studentsNames = students?.find(student => student?.student_id === studentId?.customer_id);
			return studentsNames ? { id: studentsNames.student_id, name: studentsNames.name } : null;
		  }).filter(Boolean);
	  
		  return {
			...lesson,
			students: linkedStudents,
		  };
		}
	  
		// Если lessons - массив, применяем предыдущую логику
		return lesson.map(cls => {
		  const linkedStudents = (cls.details || []).map(studentId => {
			const studentsNames = students?.find(student => student?.student_id === studentId?.customer_id);
			return studentsNames ? { id: studentsNames.student_id, name: studentsNames.name } : null;
		  }).filter(Boolean);
	  
		  return {
			...cls,
			students: linkedStudents,
		  };
		});
	  };
	  const lessonWithStudents = linkLessonAndStudents(lesson, studentsData);

	console.log(lessonWithStudents)

	//** Formatting time-and-date */

	const timeFromDate = new Date(lesson[0]?.time_from);
	const timeToDate = new Date(lesson[0]?.time_to);
	const hoursFrom = timeFromDate.getHours();
	const minutesFrom = timeFromDate.getMinutes();
	const hoursTo = timeToDate.getHours();
	const minutesTo = timeToDate.getMinutes();

	const formattedDateFrom = `${timeFromDate.getDate() < 10 ? '0' : ''}${timeFromDate.getDate()}.${(timeFromDate.getMonth() + 1) < 10 ? '0' : ''}${timeFromDate.getMonth() + 1}.${timeFromDate.getFullYear()}`;

	const formattedTimeFromTo = `${hoursFrom < 10 ? '0' : ''}${hoursFrom}:${minutesFrom < 10 ? '0' : ''}${minutesFrom } - ${hoursTo < 10 ? '0' : ''}${hoursTo}:${minutesTo < 10 ? '0' : ''}${minutesTo}`;

	//** !-- Formatting time-and-date --! */

  return (
    <div className={isOpen ? 'content with-sidebar single-class' : 'content with-sidebar single-class m-less'}>
        <Sidebar/>
        <div className="container">
            <Header/>
            <div className="inner">
              	<h1 className='h1'>{`Урок ${classesWithGroups[0]?.groups[0]?.name ? classesWithGroups[0]?.groups[0]?.name : '-'}`}</h1>
				<div className="single-class__info layer">
					<div className="single-class__top">
						<div className="single-class__heading">
							<IoMdInformationCircleOutline /> <span>Информация об уроке</span>
						</div>
						
						<ul>
							<li className="single-class__list-title">
								<span className="date">Дата</span>
								<span className="time">Время</span>
								<span className="group">Группа</span>
								<span className="class">Урок</span>
							</li>
							{
								
							}
							<li className="single-class__list-item">
								<span className="date">{formattedDateFrom}</span>
								<span className="time">{formattedTimeFromTo}</span>
								<span className="group">{`${classesWithGroups[0]?.groups[0]?.name ? classesWithGroups[0]?.groups[0]?.name : '-'}`}</span>
								<span className="class">{classesWithGroups[0]?.topic}</span>
							</li>
						</ul>
					</div>
					<div className="single-class__group">
						<div className="single-class__heading">
							<GrGroup /> <span>Группа {`${classesWithGroups[0]?.groups[0]?.name ? classesWithGroups[0]?.groups[0]?.name : '-'}`}</span>
						</div>
						<ol className="pupil">
							{
								lessonWithStudents[0]?.students.map((student) => (
									<li>{student.name}</li>
								))
							}
						</ol>
					</div>
				</div>
            </div>
			<Footer/>
        </div>
    </div>
  )
}

export default SingleClass