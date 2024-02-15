import React from 'react';
import camera from './styles/camera_icon.svg';
import micro from './styles/micro_icon.svg';
import ring from './styles/ring_icon.svg';
import styles from './styles/RoomPage.module.scss';
import { Popover } from 'antd';
import RoomChat from './RoomChat';

export default function RoomPage(): JSX.Element {
    const content1 = (
        <div className={styles.content}>
            <p className={styles.content}>Включить камеру</p>
        </div>
    )
    const content2 = (
        <div className={styles.content}>
            <p className={styles.content}>Выключить микрофон</p>
        </div>
    )
    const content3 = (
        <div className={styles.content}>
            <p className={styles.content}>Завершить звонок</p>
        </div>
    )

    return (
        <div className={styles.room_dialogue__container}>
            <div className={styles.room__container}>
                <div className={styles.room__container__header}>
                    <div className={styles.room__info}>
                        <h3>Комната #1</h3>
                        <h3>Участников: 6</h3>
                    </div>
                    <h1>Бизнес-ланч от Setters X Surf Coffee</h1>
                    <div className={styles.room__info}>
                        <p>Дата и время: 16 марта | 18:00</p>
                        <p>Адрес: ул Какая-то, д 1, стр 2</p>
                    </div>
                </div>

                <h1>Поздравляем, вы в эфире!</h1>

                <div className={styles.room__container__user}>
                    <div className={styles.user__display}>
                        <p>Иван Говнов</p>
                    </div>
                    <div className={styles.user__display}>
                        <p>Бобр Курва</p>
                    </div>
                    <div className={styles.user__display}>
                        <p>Вася Пупкин</p>
                    </div>
                    <div className={styles.user__display}>
                        <p>Великий</p>
                    </div>
                    <div className={styles.user__display}>
                        <p>Райан Гослинг</p>
                    </div>
                    <div className={styles.user__display}>
                        <p>Мимо Проходил</p>
                    </div>
                </div>
                
                <div className={styles.icons}>
                    <Popover className={styles.popover} content={content1}>
                        <img src={camera} alt="camera icon" />
                    </Popover>
                    <Popover className={styles.popover} content={content2}>
                        <img src={micro} alt="micro icon" />
                    </Popover>
                    <Popover className={styles.popover} content={content3}>
                        <img src={ring} alt="ring icon" />
                    </Popover>
                </div>
            </div>
            <RoomChat />
        </div>
    )
}
