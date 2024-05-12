import React from 'react';
import { Header, Sidebar, Footer, Breadcrumbs } from '../components';
import { useGetTeachersQuery } from '../services/teacherApi';


const Home = ({isOpen}) => {
  const teacersData = useGetTeachersQuery();

  // console.log(teacersData)
  return (
    <div className={isOpen ? 'content with-sidebar home' : 'content with-sidebar home m-less'}>
      <Sidebar />
        <div className='container'>
          <Header/>
          <div className="inner">
          <Breadcrumbs />
          homepage
          </div>
          
          <Footer/>
        </div>
    </div>
  )
}

export default Home