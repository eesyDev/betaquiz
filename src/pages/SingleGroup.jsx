import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Header, Sidebar, Footer, Breadcrumbs } from '../components';
import { useGetGroupByIdQuery, useGetGroupStudentsQuery } from '../services/teacherGroupApi';



const SingleGroup = ({isOpen}) => {
    const { id } = useParams();

    const { data: groupData, isFetching } = useGetGroupByIdQuery({group_ids: [id]})
    const { data: studentsData, isFetching: isStudentsFetching } = useGetGroupStudentsQuery({group_ids: [id]});

    console.log(studentsData)
  return (
    <div className={isOpen ? 'content with-sidebar single-group' : 'content with-sidebar single-group m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        <div className="inner">
          <Breadcrumbs/>
          <h1 className="h1">{groupData?.items[0]?.name}</h1>
          <div className="layer">
            <h3 className="h3">Ученики</h3>
            <div className="single-group__students-list">
              {
                studentsData?.map((student) => (
                  <div className='single-group__students-list-item'>{student.name}</div>
                ))
              }
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default SingleGroup