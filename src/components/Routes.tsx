import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import About from './About';
import Main from './Main';
import ChatPage from './Chat/ChatPage';
import { Maps } from './Maps/MapBlack';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/about' element={<About />} />
        <Route path='/main' element={<Main />} />
        <Route path='/room' element={<ChatPage />} />
        <Route path='/map' element={<Maps />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
