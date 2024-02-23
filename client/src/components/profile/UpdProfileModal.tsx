import React, { useState } from 'react';
import styles from './styles/UserProfile.module.scss';
import logoSml from './styles/user_logo_sml.png';
import imgUpload from './styles/img_upload.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updProfile } from '../auth/authSlice';

export default function UpdProfileModal({ hide }: { hide: () => void }): JSX.Element {
    const { user } = useAppSelector((store) => store.auth);
    const userProfileImg = user?.image || logoSml;
    
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email ||"");
    const [password, setPassword] = useState("");
    const [previewImage, setPreviewImage] = useState(user?.image || imgUpload); // Предпросмотр изображения
    const dispatch = useAppDispatch();

    const fileInputRef = React.useRef<HTMLInputElement>(null);


    const changeProfileHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(updProfile({ id: user?.id, name, email, password, image: previewImage }));
        hide();
    }
    // console.log(previewImage);
    
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                // Здесь вы можете также отправить файл на сервер
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.upd_profile}>
                <div className={styles.upd_profile__header}>
                    <div className={styles.upd_profile__title}>
                        <img className={styles.upd_profile__img} src={userProfileImg} alt="user logo img" />
                        <p>Изменение данных профиля</p>
                    </div>
                    <button type="button" onClick={hide}><span>Закрыть</span></button>
                </div>

                <div className={styles.upd_profile__body}>
                    <div style={{ cursor: 'pointer' }}>
                        <h4>Загрузить фото профиля</h4>
                        <img src={previewImage || imgUpload} alt="Upload" onClick={handleImageClick} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none', cursor: 'pointer' }}
                            onChange={handleImageChange}
                        />
                    </div>

                    <form onSubmit={changeProfileHandler}>
                        <h4>Изменить персональные данные</h4>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Имя' />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Почта' />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' />
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
