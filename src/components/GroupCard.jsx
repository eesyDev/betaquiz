import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({group}) => {
  return (
    <Link to={`${group.id}`} className='group-card'>{group.name}</Link>
  )
}

export default GroupCard