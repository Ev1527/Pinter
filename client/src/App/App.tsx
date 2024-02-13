import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation';
import Error from '../components/404/Error';
import Registration from '../components/auth/Registration';
import Authorization from '../components/auth/Authorization';
import { useAppDispatch } from '../redux/store';
import { checkAuth } from '../components/auth/authSlice';
import About from '../components/about/About';
import { loadParties } from '../components/party/partySlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  axios.defaults.baseURL = 'https://pinter.fun';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadParties());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/about' element={<About />} />
          <Route path='/parties' element={<Party />} />
          <Route path='/auth/registration' element={<Registration />} />
          <Route path='/auth/authorization' element={<Authorization />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
