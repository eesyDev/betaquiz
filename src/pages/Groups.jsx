import React, { useState, useEffect } from 'react';
import { Header, Sidebar, GroupCard } from '../components';
import { useGetTeacherGroupsQuery } from '../services/teacherGroupApi';


const Groups = ({isOpen}) => {
  const [groups, setGroups] = useState([])
  const { data, isLoading } = useGetTeacherGroupsQuery();

  useEffect(() => {
    if (data) {
      setGroups(data.items);
    }
  }, [data]);

  console.log(data);
  return (
    <div className={isOpen ? 'content with-sidebar groups' : 'content with-sidebar groups m-less'}>
      <Sidebar/>
      <div className="container">
        <Header/>
        <div className="inner">
          <h1 className="h1">Мои группы</h1>
          <div className="groups__wrapper">
            {
              groups.map((item, index) => (
                <GroupCard group={item} key={index}/>
              ))
            }
          </div>
        </div>     
      </div>
    </div>
  )
}

export default Groups