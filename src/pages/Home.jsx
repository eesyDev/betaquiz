import React from 'react';
import { Header, Sidebar } from '../components';
import { useGetStudentsQuery } from '../services/studentsApi';

const Home = ({isOpen}) => {
  const studentsArr = useGetStudentsQuery();

  console.log(studentsArr)
  return (
    <div className={isOpen ? 'content with-sidebar home' : 'content with-sidebar home m-less'}>
      <Sidebar />
        <div className='container'>
          <Header/>
          homepage
        </div>
    </div>
  )
}

export default Home