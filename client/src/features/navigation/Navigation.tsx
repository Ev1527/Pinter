import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style/NavigationStyle.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logOut } from "../auth/authSlice";

export default function Navigation(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const onHandleLogout = (): void => {
    void dispatch(logOut());
  };
  return (
    <>
      <div className="nav__container">
        <ul className="nav__menu">
          {!user ? (
            <>
              <li className="nav__item">
                <NavLink className="nav__button" to="/auth/registration">
                  Registration
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className="nav__button" to="/auth/authorization">
                  Authorization
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>hello {user.name}</li>
              <li className="nav__item">
                <button
                  type="button"
                  onClick={onHandleLogout}
                  className="nav__button"
                >
                  LogOut
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
