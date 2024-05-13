import React from 'react';
import Masonry from 'react-masonry-css';

import QuestionCard from './QuestionCard';

const MasonryLayout = ({ cards, onTagClick, toggleFavorite, favorites }) => {
    const breackpointColumnsObj = {
        default: 3,
      }
  return (
    <Masonry 
      className='flex animate-slide-fwd masonry-layout'
      breakpointCols={breackpointColumnsObj}>
      { cards?.map((item, index) => (
        <QuestionCard
            key={index} 
            question={item} 
            onTagClick={onTagClick} 
            toggleFavorite={() => toggleFavorite(item)}
            favorites={favorites.includes(item.id)}/>
      )) }
    </Masonry>
  )
}

export default MasonryLayout