import React from 'react';
import styles from './styles/User.module.scss';
import logoSml from './styles/user_logo_sml.png';
// import imgUpload from './styles/img_upload.png';
import imgUpload from './styles/img_upload.svg';

export default function UpdProfileModal({ hide }: { hide: () => void }): JSX.Element {

    return (
        <div className={styles.modal}>
            <div className={styles.upd_profile}>
                <div className={styles.upd_profile__header}>
                    <div className={styles.upd_profile__title}>
                        <img className={styles.upd_profile__img} src={logoSml} alt="user logo img" />
                        <p>Изменение данных профиля</p>
                    </div>
                    <button type="button" onClick={hide}><span>Закрыть</span></button>
                </div>
                <div className={styles.upd_profile__body}>
                    <div>
                        <h4>Загрузить фото профиля</h4>
                        <img src={imgUpload} alt="" />
                    </div>
                    <form>
                        <h4>Изменить персональные данные</h4>
                        <input type="text" placeholder='Имя' />
                        <input type="text" placeholder='Почта' />
                        <input type="text" placeholder='Пароль' />
                        <button>Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
