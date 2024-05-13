import React from 'react';
import { CreateQuestion, Sidebar, Header, Breadcrumbs, Footer } from '../components';

const CreateQuestionPage = ({isOpen}) => {
  return (
    <div className={isOpen ? 'content with-sidebar create-question' : 'content with-sidebar groups m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        <div className="inner">
        <Breadcrumbs />
          <h1 className="h1">Мои группы</h1>
          <div className="groups__wrapper">
            <CreateQuestion />
          </div>
        </div>   
        <Footer/>  
      </div>
    </div>
  )
}

export default CreateQuestionPage