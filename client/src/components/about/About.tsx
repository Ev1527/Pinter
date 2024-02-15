import React from 'react';
import styles from './styles/About.module.scss';
// import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function About(): JSX.Element {
    // const nav = useNavigate();

    return (
        <div className={styles.container}>
            <p>Приложение, которое объединяет</p>
            <div className={styles.about}>
                <div className={styles.item}><span>Планируйте свой досуг</span>, не потратив времени и сил на поиск той самой компании</div>
                <div className={styles.item_center}><span>С нами вы сможете найти</span> свою любовь, завести новых друзей по интересам или даже презентовать себя своим будущим коллегам</div>
                <div className={styles.item}><span>Изучайте новые мероприятия </span>с единомышленниками, создайте тест, чтобы определить "своих" людей и общаться с ними</div>
            </div>
            <HashLink smooth to="#three_steps">
                {/* <button type="button" onClick={() => nav('/steps')}>КАК ЭТО РАБОТАЕТ?</button> */}
                <button type="button">КАК ЭТО РАБОТАЕТ?</button>
            </HashLink>
        </div>
    )
}
