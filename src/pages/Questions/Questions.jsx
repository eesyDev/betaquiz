import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useGetAllExistingQuestionsQuery } from '../../services/questonsApi';
import { Sidebar, Header, Footer, QuestionCard, Breadcrumbs } from '../../components';
import QuestionCardSkeleton from './Skeleton';
import { getFavorites, toggleFavorite as toggleFavoriteUtils, uniqueByTitle } from '../../utils/dateUtils';

const Questions = ({ isOpen }) => {

    const { data: availableQuestions, isLoading, error } = useGetAllExistingQuestionsQuery();
    const [selectedTags, setSelectedTags] = useState([]);
    const [favorites, setFavorites] = useState(getFavorites());

    useEffect(() => {
      setFavorites(getFavorites());
    }, []);

    const toggleFavorite = (question) => {
		const wasAdded = toggleFavoriteUtils(question.id);
		if (wasAdded) {
			toast.success(`${question.title} added to favorites`);
		} else {
			toast.error(`${question.title} removed from favorites`);
		}
		setFavorites(getFavorites());
    };

    const handleTagChange = (tag) => {
        setSelectedTags(prevTags =>
                prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };
    const clearTags = () => setSelectedTags([]);

    const questions = uniqueByTitle(availableQuestions);

    const filteredQuestions = questions?.filter(question =>
        selectedTags.length === 0 || question.tags.some(tag => selectedTags.includes(tag))
    );

    console.log(filteredQuestions)
    // if (error) return <p>Error loading questions!</p>;
    // if (!availableQuestions?.length) return <p>No questions available.</p>;
  return (
    <div className={isOpen ? 'content with-sidebar all-questions' : 'content with-sidebar all-qustions m-less'}>
        <Sidebar />
        <div className='container'>
          <Header/>
          <div className="inner">
            <Breadcrumbs/>
            <h1 className='h1'>All questions</h1>
            <div className='tags-wrapper'>
                {availableQuestions?.flatMap(question => question.tags).filter((v, i, a) => a.indexOf(v) === i).map(tag => (
                    <span key={tag} onClick={() => handleTagChange(tag)} className={selectedTags.includes(tag) ? 'selected tag' : 'tag'}>
                        #{tag}
                    </span>
                ))}
                <button onClick={clearTags} className={selectedTags?.length === 0? 'hidden clear-tag' : 'clear-tag'}>Очистить теги</button>
            </div>
            <div className="all-questions__wrapper">
            { isLoading ? [...Array(4)].map((_, index) => <QuestionCardSkeleton key={index} />): filteredQuestions?.map((question) => (
                <QuestionCard 
                key={question.id} 
                question={question} 
                onTagClick={handleTagChange} 
                toggleFavorite={() => toggleFavorite(question)}
				isFavorite={favorites.includes(question.id)}/>
            )
            )}
          </div>
          </div>
          <Footer/>
        </div>
    </div>
  )
}

export default Questions