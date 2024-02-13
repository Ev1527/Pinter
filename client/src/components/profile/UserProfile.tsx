import React, { useState } from 'react';
import UserCard from './UserCard';
import styles from './styles/User.module.scss';
import UpdProfileModal from './UpdProfileModal';

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
                    <UserCard />
                    <h1>Мои мероприятия</h1>
                    <hr />
                    {/* <UpdProfileModal hide={hide} /> */}
                </div>
            )}            
        </>
    )
}
