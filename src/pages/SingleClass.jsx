import React from 'react';
import { Header, Sidebar } from '../components';

const SingleClass = () => {
  return (
    <div className='content with-sidebar'>
        <Sidebar/>
        <div className="container">
            <Header/>
            Class
        </div>
    </div>
  )
}

export default SingleClass