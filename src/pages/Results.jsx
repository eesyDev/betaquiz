import React from 'react';
import { Header, Sidebar, Footer } from '../components';


const Results = ({isOpen}) => {
  return (
    <div className={isOpen ? 'content with-sidebar results' : 'content with-sidebar results m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        res
        <Footer/>
      </div>
    </div>
  )
}

export default Results