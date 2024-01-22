import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';
import { useSelector } from 'react-redux';

import { Header } from './components';
import { Home, Login, Groups, Classes, Results, Quizes, SingleClass } from './pages';
import './App.css'

registerLicense(process.env.REACT_APP_SYNCFUSION_KEY);

function App() {
  const isOpen = useSelector((state) => state.burger.isOpen);
  const isCalendar = useSelector((state) => state.calendar.isOpen);
  console.log(isCalendar)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classes" element={<Classes isOpen={isOpen} isCalendarOpen={isCalendar}/>} />
        <Route path="/classes/:id" element={<SingleClass isOpen={isOpen}/>} />
        <Route path="/mygroups" element={<Groups isOpen={isOpen}/>} />
        <Route path="/results" element={<Results isOpen={isOpen}/>} />
        <Route path="/quizes" element={<Quizes isOpen={isOpen}/>} />
      </Routes>
    </div>
  );
}

export default App;
