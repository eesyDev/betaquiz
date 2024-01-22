import React from 'react';
import { Header, Sidebar } from '../components';


const Groups = ({isOpen}) => {
  return (
    <div className={isOpen ? 'content with-sidebar groups' : 'content with-sidebar groups m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        Groups
      </div>
    </div>
  )
}

export default Groups