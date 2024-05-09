import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { Header, Sidebar, Footer, Calendar, QuestionCard } from '../../components';
import { useGetTeacherLessonsQuery } from '../../services/lessonsApi';
import { getFavorites, toggleFavorite as toggleFavoriteUtils, uniqueByTitle } from '../../utils/dateUtils'; 
import { useGetAllExistingQuestionsQuery } from '../../services/questonsApi';

const Account = ({ isOpen }) => {
	const [tab, setTab] = useState('my_questions');
    const [favorites, setFavorites] = useState(getFavorites());
	const { data: availableQuestions, isLoading, error } = useGetAllExistingQuestionsQuery();

	// const lessons = useSelector(state => state.lessons.lessons);

    const reqData = { status: 0 };

    const { data: lessons, isLoading: isLoadingLessons } = useGetTeacherLessonsQuery(reqData);


	const handleTabVal = (val) => {
		setTab(val)
	};
	
	const toggleFavorite = (question) => {
		const wasAdded = toggleFavoriteUtils(question.id);
		if (wasAdded) {
			toast.success(`${question.title} added to favorites`);
		} else {
			toast.error(`${question.title} removed from favorites`);
		}
		setFavorites(getFavorites());
	  };

	const events = lessons?.items?.map(lesson => ({
            id: lesson.id,
            Subject: lesson.topic,
            StartTime: new Date(lesson.time_from),
            EndTime: new Date(lesson.time_to)
	}));

	const favoritesQuestions = availableQuestions?.filter(question => favorites.includes(question.id));

	console.log(favoritesQuestions)


	const tabVals = [{key: 'calendar', name: 'Календарь занятий'}, {key: 'my_questions', name: 'Мои вопросы'}, {key: 'recieved_questions', name: 'Купленные вопросы'}, {key:'favorites', name: 'Избранные вопросы'}];
	return (
		<div className={isOpen ? 'content with-sidebar account' : 'content with-sidebar account m-less'}>
			<Sidebar />
			<div className='container'>
				<Header />
				<div className="account__inner">
					<h1 className="h1">Личный кабинет</h1>
					<div className="account__tabs layer">
						<div className="account__tabs-head">
							{ tabVals.map(tabVal => 
							<div className={`account__tab ${tab === tabVal.key ? 'active' : ''}`} key={tabVal.key} onClick={() => handleTabVal(tabVal.key)}>{tabVal.name}</div>
							)}
						</div>
						<div className="account__tabs-content">
						{
							tab ==='my_questions' ? (
								<div className=''>my questions</div>
							) : tab ==='recieved_questions'? (
								<div className=''>recieved questions</div>
							) : tab === 'favorites'? (
								<div className='questions-wrap g-20'>
									{favoritesQuestions?.map((question) => (
										<QuestionCard 
                                            key={question.id} 
                                            question={question} 
                                            // onTagClick={handleTagChange} 
                                            toggleFavorite={() => toggleFavorite(question)}
                                            isFavorite={true}
                                        />
									))}
								</div>
							) : tab === 'calendar'?(
								<div className=''>
									<Calendar scheduleData={events}/>
								</div>
							) : null
						}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Account