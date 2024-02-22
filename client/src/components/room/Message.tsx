import React from 'react';
import styles from './styles/Message.module.scss';
import userLogo from './styles/user_logo_chat.jpeg';
import { IMessage } from '../chat/ChatPage';


export default function Message({ message, isCurrentUser }: { message: IMessage, isCurrentUser: boolean }): JSX.Element {
    // Преобразование строки time_stamp в объект Date
    const date = new Date(message.time_stamp);
    // Форматирование даты и времени
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const userAvatar = message.user?.image || userLogo;
    const userName = message.user?.name || 'Bobr Curva';

    console.log(isCurrentUser, 'isCurrentUser');
    

    return (
        <div className={styles.message__container}>
            <div><img src={userAvatar} alt="" /></div>
            <div className={styles.message}>
                <div className={styles.message__header}>
                    <h4>{userName}</h4>
                    <h6>{formattedDate}</h6>
                </div>
                <p>{message.text}</p>
            </div>
        </div>
    )
}
