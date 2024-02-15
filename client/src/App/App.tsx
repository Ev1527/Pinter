import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Error from "../components/404/Error";
import Registration from "../components/auth/Registration";
import Authorization from "../components/auth/Authorization";
import { useAppDispatch } from "../redux/store";
import { checkAuth } from "../components/auth/authSlice";
import MainPage from "../components/main/MainPage";
import PartiesList from "../components/party/PartiesList";
import Map from "../components/map/Map";
import UserProfile from "../components/profile/UserProfile";
import PartyPage from "../components/party/PartyPage";
import RoomPage from "../components/room/RoomPage";
import ThreeSteps from "../components/steps/ThreeSteps";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="/auth/registration" element={<Registration />} />
            <Route path="/auth/authorization" element={<Authorization />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/parties" element={<PartiesList />} />
            <Route path="/steps" element={<ThreeSteps />} />
            <Route path="/contacts" element={<Map />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/party" element={<PartyPage />} />
          </Route>
          <Route path="/room" element={<RoomPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
  );
}

export default App;
