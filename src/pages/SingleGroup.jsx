import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Header, Sidebar } from '../components';
import { useGetSingleSubjectQuery } from '../services/lessonsApi';
import { useGetStudentsQuery } from '../services/studentsApi';


const SingleGroup = ({isOpen}) => {
    const { id } = useParams();

    // const { data, isFetching } = useGetSingleSubjectQuery(id)
    const { data, isFetching } = useGetStudentsQuery()


    console.log(data)
  return (
    <div className={isOpen ? 'content with-sidebar results' : 'content with-sidebar results m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        
      </div>
    </div>
  )
}

export default SingleGroup