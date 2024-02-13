import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
//import './style/NavigationStyle.css';
import styles from './style/Navigation.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logOut } from '../auth/authSlice';

export default function Navigation(): JSX.Element {
  const { user } = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();

  const onHandleLogout = (): void => {
    void dispatch(logOut());
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <div className={styles.nav}>
            <li className={styles.item}>
              <NavLink className='nav__button' to='/main'>
                Главная
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink className='nav__button' to='/parties'>
                Мероприятия
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink className='nav__button' to='/chat'>
                Чат
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink className='nav__button' to='/contacts'>
                Контакты
              </NavLink>
            </li>
          </div>

          {!user?.name ? (
            <div className={styles.lk}>
              <li className='nav__item lk'>
                <NavLink className='nav__button' to='/auth/registration'>
                  Регистрация
                </NavLink>
              </li>
              <li className='nav__item lk'>
                <NavLink className='nav__button' to='/auth/authorization'>
                  Авторизация
                </NavLink>
              </li>
            </div>
          ) : (
            <>
              <li>hello {user.name}</li>
              <li className='nav__item lk'>
                <NavLink className='nav__button' to='/profile'>
                  Profile
                </NavLink>
              </li>
              <li className='nav__item'>
                <button
                  type='button'
                  onClick={onHandleLogout}
                  className='nav__button'
                >
                  Выйти
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
