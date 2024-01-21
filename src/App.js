import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';

import { Header } from './components';
import { Home, Login, Groups, Classes, Results, Quizes, SingleClass } from './pages';
import './App.css'

registerLicense(process.env.REACT_APP_SYNCFUSION_KEY);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classes" element={<Classes/>} />
        <Route path="/classes/:id" element={<SingleClass/>} />
        <Route path="/mygroups" element={<Groups />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quizes" element={<Quizes />} />
      </Routes>
    </div>
  );
}

export default App;
