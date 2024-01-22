import React from 'react';
import { Header, Sidebar } from '../components';

const Home = ({isOpen}) => {
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