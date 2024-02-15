import React from 'react';
import styles from './styles/RoomPage.module.scss';
import { useNavigate } from 'react-router-dom';
import Message from './Message';

export default function RoomChat(): JSX.Element {
    const nav = useNavigate()

    return (
        <div className={styles.chat}>
            <div className={styles.chat__header}>
                <h2>Чат встречи</h2>
                <div>
                    <p>Тема: <span>Бизнес-ланч от Setters X Surf Coffee</span></p>
                </div>
                <h3 onClick={() => nav('/main')}>На главную</h3>
            </div>
            <div className={styles.chat__body}>
                <div className={styles.messages}>
                    {/* <p>В данной комнате нет сообщений</p> */}
                    <Message />
                    <Message />
                    <Message />
                </div>
                <div>
                    <input type="text" placeholder='Ваше сообщение' />
                </div>
            </div>
        </div>
    )
}
