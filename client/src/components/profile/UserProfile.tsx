import React, { useState } from 'react';
import UserCard from './UserCard';
import styles from './styles/User.module.scss';
import UpdProfileModal from './UpdProfileModal';
import bgTitle from './styles/profile_title.svg';

export default function UserProfile(): JSX.Element {
    const [visible, setVisible] = useState(false);

    const hide = (): void => {
        setVisible(true)
    }

    return (
        <>
            {visible ? (
                <UpdProfileModal hide={hide} />
                ) : (
                <div className={styles.user__profile}>
                    <div className={styles.user__profile__header}>
                        <UserCard />
                        <img src={bgTitle} alt="" />
                    </div>
                    <h1>Мои мероприятия</h1>
                    <hr />
                    {/* <UpdProfileModal hide={hide} /> */}
                </div>
            )}            
        </>
    )
}
