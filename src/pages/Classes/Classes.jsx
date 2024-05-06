import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetLessonsQuery, useGetTeacherLessonsQuery } from '../../services/lessonsApi';
import { useGetTeacherGroupsQuery } from '../../services/teacherGroupApi';

import { Header, Sidebar, Calendar, Footer } from '../../components';
import { scheduleData } from '../../data/data';
import ClassSkeleton from './Skeleton';


const Classes = ({isOpen, isCalendarOpen}) => {
	const [lessons, setlessons] = useState([]);
	const [groups, setGroups] = useState([]);

	const reqData = {status: 0}
	const { data: lessonsData, isLoading: isLoadingLessons } = useGetTeacherLessonsQuery(reqData);
	const { data: groupsData, isLoading: isLoadingGroups } = useGetTeacherGroupsQuery();
	
  
	useEffect(() => {
	  if (groupsData) {
		setGroups(groupsData?.items);
	  }
	}, [groupsData]);

	useEffect(() => {
		if (lessonsData) {
			setlessons(lessonsData?.items)
		}
	}, [lessonsData]);

	console.log(lessonsData)

	const linkClassesWithGroups = (lessons, groups) => {
		return lessons.map(cls => {
		  const linkedGroups = (cls.group_ids || []).map(groupId => {
			const group = groups.find(group => group.id === groupId);
			return group ? { id: group.id, name: group.name } : null;
		  }).filter(Boolean);
	  
		  return {
			...cls,
			groups: linkedGroups,
		  };
		});
	  };
	const classesWithGroups = linkClassesWithGroups(lessons, groups);
	  
	const events = lessons.map(lesson => ({
		id: lesson.id,
		Subject: lesson.topic,
		StartTime: new Date(lesson.time_from),
		EndTime: new Date(lesson.time_to)
	  }));

	const isCalendar = isCalendarOpen;


    return (
		<div className={isOpen ? 'content with-sidebar classes' : 'content with-sidebar classes m-less'}>
			<Sidebar/>
			<div className='container'>
				<Header/>
				<div className="inner">
					<h1 className="h1">Уроки</h1>
					{
					isCalendar ? 
						<Calendar scheduleData={events}/> :
						<div className='lessons'>
							<ul className="lessons__list">
								<li className="lessons__list-title">
									<span className="date">Дата</span>
									<span className="time">Время</span>
									<span className="group">Группа</span>
									<span className="class">Урок</span>
								</li>
								{
									isLoadingLessons ? 
										[...Array(8)].map((item, index) => <ClassSkeleton/>)
										: 
									classesWithGroups?.map((lesson, index) => {
										const timeFromDate = new Date(lesson?.time_from);
										const timeToDate = new Date(lesson?.time_to);
										const hoursFrom = timeFromDate.getHours();
										const minutesFrom = timeFromDate.getMinutes();
										const hoursTo = timeToDate.getHours();
										const minutesTo = timeToDate.getMinutes();

										const formattedDateFrom = `${timeFromDate.getDate() < 10 ? '0' : ''}${timeFromDate.getDate()}-${(timeFromDate.getMonth() + 1) < 10 ? '0' : ''}${timeFromDate.getMonth() + 1}-${timeFromDate.getFullYear()}`;

										const formattedTimeFromTo = `${hoursFrom < 10 ? '0' : ''}${hoursFrom}:${minutesFrom < 10 ? '0' : ''}${minutesFrom } - ${hoursTo < 10 ? '0' : ''}${hoursTo}:${minutesTo < 10 ? '0' : ''}${minutesTo}`;
										return (
											<li className="lessons__list-item" key={index}>
												<Link to={`/classes/${lesson.id}`}>
													<span className="date">{formattedDateFrom}</span>
													<span className="time">{formattedTimeFromTo}</span>
													<span className="group">{lesson?.groups[0]?.name ? lesson?.groups[0]?.name : '-'}</span>
													<span className="class">{lesson?.topic}</span>
												</Link>
											</li>
										)
									})
								}
								
							</ul>
						</div>
					}
				</div>
				
				<Footer/>
			</div>	
		</div>
	);
};
export default Classes;