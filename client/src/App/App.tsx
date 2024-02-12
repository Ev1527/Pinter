import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Navigation from '../features/navigation/Navigation';
import Error from '../features/404/Error';
import Registration from '../features/auth/Registration';
import Authorization from '../features/auth/Authorization';
import { useAppDispatch } from '../redux/store';
import { checkAuth } from '../features/auth/authSlice';
import About from '../features/about/components/About';
import Party from '../features/parties/components/Party';
import PartyItem from '../features/parties/components/PartyItem';
import ChatPage from '../features/chat/ChatPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  axios.defaults.baseURL = 'https://pinter.fun';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/about' element={<About />} />
          <Route path='/parties' element={<Party />} />
          <Route path='/parties/:id' element={<PartyItem />} />
          <Route path='/chat/:partyId/*' element={<ChatPageWrapper />} />
          <Route path='/auth/registration' element={<Registration />} />
          <Route path='/auth/authorization' element={<Authorization />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

const ChatPageWrapper: React.FC = () => {
  const { partyId } = useParams();

  // Если partyId не существует, перенаправляем на страницу ошибки или другую страницу
  if (!partyId) {
    return <Navigate to="/error" />;
  }
  
  return <ChatPage partyId={partyId} />;
};


export default App;
