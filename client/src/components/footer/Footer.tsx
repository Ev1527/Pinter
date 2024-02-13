import React from 'react';
import styles from './styles/Footer.module.scss';
import email from './styles/email_icon.png';
import vk from './styles/vk_icon.png';
import telegram from './styles/telegram_icon.png';
import { useNavigate } from 'react-router-dom';

export default function Footer(): JSX.Element {
    const nav = useNavigate();

    return (
        <div className={styles.footer__container}>
            <div className={styles.left}>
                <h2 onClick={() => nav('/main')}>PINTER</h2>
                <p>Планируйте свой досуг, не потратив времени и сил на поиск той самой компании!</p>
                <p className={styles.copyright}>© 2024 Pinter. All rights reserved.</p>
            </div>
            <div className={styles.right}>
                <p>Остались вопросы?</p>
                <a href="#"><img src={email} alt="mail to" /></a>
                <div className={styles.socials}>
                    <a href="#"><img src={vk} alt="vk logo" /></a>
                    <a href="https://t.me/+62Ffy8-aGpZmZDVi"><img src={telegram} alt="vk logo" /></a>
                </div>
            </div>
        </div>
    )
}
