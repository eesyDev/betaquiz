import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useGetTeacherLessonsQuery } from '../../services/lessonsApi';
import { useGetTeacherGroupsQuery } from '../../services/teacherGroupApi';
import { Header, Sidebar, Calendar, Footer } from '../../components';
import ClassSkeleton from './Skeleton';
import { formatDate, formatTimeRange } from '../../utils/dateUtils';
import { setLessons } from '../../redux/slices/lessonsSlice';

const Classes = ({ isOpen, isCalendarOpen }) => {
    const [lessonsData, setLessonsData] = useState([]);
    const [groups, setGroups] = useState([]);
    const reqData = { status: 0 };
	const dispatch = useDispatch();
	
    const { data: lessons, isLoading: isLoadingLessons } = useGetTeacherLessonsQuery(reqData);
    const { data: groupsData, isLoading: isLoadingGroups } = useGetTeacherGroupsQuery();

    useEffect(() => {
        if (groupsData) {
            setGroups(groupsData.items);
        }
    }, [groupsData]);

	useEffect(() => {
        if (lessons) {
            dispatch(setLessons(lessons?.items));
			setLessonsData(lessons?.items)
        }
    }, [lessons, dispatch]);

    const classesWithGroups = useMemo(() => {
        return lessonsData?.map(cls => {
            const linkedGroups = (cls.group_ids || []).map(groupId => {
                const group = groups?.find(group => group.id === groupId);
                return group ? { id: group.id, name: group.name } : null;
            }).filter(Boolean);

            return { ...cls, groups: linkedGroups };
        });
    }, [lessonsData, groups]);

	const events = lessonsData?.map(lesson => ({
		id: lesson.id,
		Subject: lesson.topic,
		StartTime: new Date(lesson.time_from),
		EndTime: new Date(lesson.time_to)
	  }));

	console.log(events)


    return (
        <div className={isOpen ? 'content with-sidebar classes' : 'content with-sidebar classes m-less'}>
            <Sidebar />
            <div className='container'>
                <Header />
                <div className="inner">
                    <h1 className="h1">Уроки</h1>
                    {isCalendarOpen ? 
                        <Calendar scheduleData={events} /> :
                        <div className='lessons'>
                            <ul className="lessons__list">
                                <li className="lessons__list-title">
                                    <span className="date">Дата</span>
                                    <span className="time">Время</span>
                                    <span className="group">Группа</span>
                                    <span className="class">Урок</span>
                                </li>
                                {isLoadingLessons ? [...Array(8)].map((_, index) => <ClassSkeleton key={index} />) :
                                    classesWithGroups.map((lesson, index) => (
                                        <li className="lessons__list-item" key={lesson.id}>
                                            <Link to={`/classes/${lesson.id}`}>
                                                <span className="date">{formatDate(new Date(lesson.time_from))}</span>
                                                <span className="time">{formatTimeRange(new Date(lesson.time_from), new Date(lesson.time_to))}</span>
                                                <span className="group">{lesson.groups[0]?.name || '-'}</span>
                                                <span className="class">{lesson.topic}</span>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    }
                </div>
                <Footer />
            </div>    
        </div>
    );
};

export default Classes;
