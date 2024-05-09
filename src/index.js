import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import './font/stylesheet.css';
import './styles/index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      <Toaster/>
      <App />
    </Provider>
  </Router>
);
// reportWebVitals();
