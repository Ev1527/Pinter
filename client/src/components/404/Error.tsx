import React from 'react';
import styles from './styles/Error.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Error(): JSX.Element {
  const nav = useNavigate();

  return (
    <div className={styles.error}>
      <div>
        <h1>404</h1>
        <p>Такой страницы не существует</p>
      </div>
      <button type='button' onClick={() => nav(-1)}>Хочу назад</button>
    </div>
  )
}
