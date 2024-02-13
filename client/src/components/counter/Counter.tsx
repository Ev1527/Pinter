import React from 'react';
import styles from './styles/Counter.module.scss';
import usersCounter from './styles/2.365.png';

export default function Counter(): JSX.Element {

    return (
        <div className={styles.counter}>
            <img src={usersCounter} alt="users counter" />
            <p>пользователей уже в Pinter</p>
        </div>
    )
}
