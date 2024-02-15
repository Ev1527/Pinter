import React from 'react';
import styles from './styles/Message.module.scss';
import userLogo from './styles/user_message_logo.png';

export default function Message(): JSX.Element {

    return (
        <div className={styles.message__container}>
            <div><img src={userLogo} alt="" /></div>
            <div className={styles.message}>
                <h4>Bobr Curva</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis numquam autem ab ipsum quisquam rerum dignissimos alias nihil nostrum, nesciunt perspiciatis quis ipsa molestias consectetur suscipit possimus eligendi, mollitia laboriosam.</p>
            </div>
        </div>
    )
}
