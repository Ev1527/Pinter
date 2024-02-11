import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Navigation from "../features/navigation/Navigation";
import Error from "../features/404/Error";
import Registration from "../features/auth/Registration";
import Authorization from "../features/auth/Authorization";
import { useAppDispatch } from "../redux/store";
import { checkAuth } from "../features/auth/authSlice";
import About from "../features/about/components/About";
import Party from "../features/parties/components/Party";
import RoomPage from "../features/chat/RoomPage";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  axios.defaults.baseURL = "https://pinter.fun";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/about" element={<About />} />
          <Route path="/parties" element={<Party />} />
          <Route path="/parties/:roomId" element={<RoomPage />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/auth/authorization" element={<Authorization />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
