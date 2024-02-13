import React from 'react';
import styles from './styles/About.module.scss';

export default function About(): JSX.Element {

    return (
        <div className={styles.container}>
            <p>Приложение, которое объединяет</p>
            <div className={styles.about}>
                <div className={styles.item}>Планируйте свой досуг, не потратив времени и сил на поиск той самой компании</div>
                <div className={styles.item_center}>С нами вы сможете найти свою любовь, завести новых друзей по интересам или даже презентовать себя свои будущим коллегам</div>
                <div className={styles.item}>Изучайте новые мероприятия с единомышленниками, создайте тест, чтобы определить "своих" людей и общаться с ними</div>
            </div>
        </div>
    )
}
