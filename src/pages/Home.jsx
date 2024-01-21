import React from 'react';
import { Header, Sidebar } from '../components';

const Home = () => {
  return (
    <div className='content with-sidebar'>
      <Sidebar />
        <div className='container'>
          <Header/>
          homepage
        </div>
    </div>
  )
}

export default Home